import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import colors from '../utils/colors'

export default function Input({ label, containerStyle = {}, labelStyle = {}, inputStyle = {}, ...props }) {
    return (
        <View style={[styles.main, containerStyle]}>
            {Boolean(label) && <Text style={[styles.label, labelStyle]}>{label}</Text>}
            <TextInput style={[styles.input, inputStyle]} {...props} placeholderTextColor={colors.textLightGrey} />
        </View>
    )
};

const styles = StyleSheet.create({
    main: {

    },
    label: {
        color: colors.textPrimary
    },
    input: {
        borderColor:"rgba(55,55,55,0.9)",
        borderWidth:2,
        backgroundColor: "rgba(52,52,52,0.6)",
        marginTop: 5,
        borderRadius: 8,
        height: 40,
        padding: 0,
        color:colors.textPrimary,
        paddingHorizontal: 10
    }
});
