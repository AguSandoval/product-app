import { Product } from "@/api/products/mapper";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface QuantityBottomSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet | null>;
    product: Product;
    quantity: number;
    setQuantity: (quantity: number) => void;
    handleConfirm: () => void;
}

const QuantityBottomSheet: React.FC<QuantityBottomSheetProps> = ({
    bottomSheetRef,
    product,
    quantity,
    setQuantity,
    handleConfirm,
}) => {
    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="close"
            />
        ),
        []
    );

    const snapPoints = useMemo(() => ["50%"], []);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            index={-1}
        >
            <BottomSheetView style={styles.sheetContent}>
                {product.stock > 0 ? (
                    <>
                        <Text style={styles.sheetTitle}>Select Quantity</Text>
                        <Picker
                            selectedValue={quantity}
                            onValueChange={(val) => setQuantity(val)}
                            style={styles.picker}
                        >
                            {Array.from(
                                { length: Math.min(product.stock) },
                                (_, i) => (
                                    <Picker.Item
                                        key={i + 1}
                                        label={(i + 1).toString()}
                                        value={i + 1}
                                        color="#131313"
                                    />
                                )
                            )}
                        </Picker>

                        <TouchableOpacity
                            style={styles.sheetButton}
                            onPress={handleConfirm}
                        >
                            <Text style={styles.sheetButtonText}>
                                Confirm ({quantity})
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text style={styles.outOfStock}>Out of stock</Text>
                )}
            </BottomSheetView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    sheetContent: {
        flex: 1,
        padding: 20,
        justifyContent: "flex-start",
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
        textAlign: "center",
    },
    picker: {
        backgroundColor: "#fff",
        borderRadius: 8,
    },
    sheetButton: {
        backgroundColor: "#131313",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    sheetButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    outOfStock: {
        fontSize: 16,
        color: "#b00020",
        textAlign: "center",
        fontWeight: "500",
    },
});

export default QuantityBottomSheet;
