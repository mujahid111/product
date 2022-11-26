import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from "react-redux";
import colors from '../utils/colors';

export default function AllProductPrice() {
    const { products } = useSelector(state => state.products);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                All Product Price
            </Text>
            <Text style={styles.price}>
                ₹ {products?.reduce((p, c) => (p + +c.price), 0)?.toFixed(2)}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        backgroundColor: "rgba(52,52,52,0.6)",
        borderColor: "rgba(55,55,55,0.9)",
        borderWidth: 2,
        padding: 25,
        overflow: "hidden",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: colors.textPrimary,
        fontSize: 18
    },
    price: {
        color: colors.secondary,
        fontSize: 20,
        fontWeight: "bold"
    }
})
