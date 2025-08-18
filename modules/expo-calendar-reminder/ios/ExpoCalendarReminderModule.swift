import ExpoModulesCore
import EventKit

public class ExpoCalendarReminderModule: Module {
    private let eventStore = EKEventStore()
    
    public func definition() -> ModuleDefinition {
        Name("ExpoCalendarReminder")
        
        AsyncFunction("requestCalendarPermissions") { () -> Bool in
            return await requestPermissions()
        }
        
        AsyncFunction("addProductReminder") { (options: ProductReminderOptions) -> CalendarReminderResult in
            return await addProductReminder(options: options)
        }
    }
    
    private func requestPermissions() async -> Bool {
        let status = EKEventStore.authorizationStatus(for: .event)
        
        switch status {
        case .authorized, .fullAccess:
            return true
        case .notDetermined, .restricted, .writeOnly:
            do {
                let granted = try await eventStore.requestFullAccessToEvents()
                return granted
            } catch {
                print("Error requesting calendar permissions: \(error)")
                return false
            }
        case .denied:
            return false
        @unknown default:
            return false
        }
    }
    
    private func addProductReminder(options: ProductReminderOptions) async -> CalendarReminderResult {
        let hasPermission = await requestPermissions()
        if !hasPermission {
            return CalendarReminderResult(
                success: false,
                eventId: nil,
                error: "Calendar permissions not granted"
            )
        }
        
        let event = EKEvent(eventStore: eventStore)
        event.title = "\(options.title) - \(options.productName)"
        event.notes = options.notes ?? "Product purchase reminder"
        
        let dateFormatter = ISO8601DateFormatter()
        guard let reminderDate = dateFormatter.date(from: options.reminderDate) else {
            return CalendarReminderResult(
                success: false,
                eventId: nil,
                error: "Invalid date format"
            )
        }
        
        event.startDate = reminderDate
        event.endDate = reminderDate.addingTimeInterval(3600)
        event.isAllDay = false
        
        if let urlString = options.url, let url = URL(string: urlString) {
            event.url = url
        }
        
        event.calendar = eventStore.defaultCalendarForNewEvents
        
        let alarm = EKAlarm(relativeOffset: -3600)
        event.addAlarm(alarm)
        
        do {
            try eventStore.save(event, span: .thisEvent)
            return CalendarReminderResult(
                success: true,
                eventId: event.eventIdentifier,
                error: nil
            )
        } catch {
            return CalendarReminderResult(
                success: false,
                eventId: nil,
                error: "Failed to save event: \(error.localizedDescription)"
            )
        }
    }
}

struct ProductReminderOptions: Record {
    @Field
    var title: String = ""
    
    @Field
    var productName: String = ""
    
    @Field
    var notes: String? = nil
    
    @Field
    var reminderDate: String = ""
    
    @Field
    var url: String? = nil
}

struct CalendarReminderResult: Record {
    @Field
    var success: Bool = false
    
    @Field
    var eventId: String? = nil
    
    @Field
    var error: String? = nil
}
