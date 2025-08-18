import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ReviewSectionProps {
    reviews: {
        reviewerName: string;
        reviewerEmail: string;
        rating: number;
        comment: string;
        date: string;
    }[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
    if (!reviews || reviews.length === 0)
        return (
            <View style={styles.titleContainer}>
                <Text style={styles.title}>No reviews yet.</Text>
            </View>
        );

    return (
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Reviews</Text>
            </View>

            {reviews.map((review) => (
                <View
                    key={review.reviewerName + Math.random()}
                    style={styles.review}
                >
                    <View style={styles.reviewHeader}>
                        <Text style={styles.reviewAuthor}>
                            {review.reviewerName}
                        </Text>
                        <Text style={styles.reviewDate}>
                            {new Date(review.date).toLocaleDateString()}
                        </Text>
                    </View>
                    <Text style={styles.reviewRating}>
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                    </Text>
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#222",
        marginBottom: 16,
    },
    titleContainer: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    review: {
        marginBottom: 16,
        borderBottomWidth: 1,
        paddingBottom: 16,
        borderBottomColor: "#eee",
    },
    reviewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    reviewAuthor: {
        fontSize: 14,
        fontWeight: "600",
        color: "#222",
    },
    reviewDate: {
        fontSize: 12,
        color: "#666",
    },
    reviewRating: {
        fontSize: 12,
        color: "#f5a623",
    },
    reviewComment: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
});

export default ReviewSection;
