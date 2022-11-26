import React, { useRef, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../utils/colors";

const OTPInput = ({ code, setCode, maximumLength, setIsPinReady }) => {
    const boxArray = new Array(maximumLength).fill(0);
    const inputRef = useRef();


    const handleOnPress = () => {
        inputRef.current.focus();
    };

    useEffect(() => {
        // update pin ready status
        setIsPinReady(code.length === maximumLength);
        // clean up function
        return () => {
            setIsPinReady(false);
        };
    }, [code]);

    const boxDigit = (_, index) => {
        const emptyInput = "";
        const digit = code[index] || emptyInput;

        return (
            <View key={index} style={styles.splitboxes}>
                <Text style={styles.otpText}>{digit}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.pressable} onPress={handleOnPress}>
                {boxArray.map(boxDigit)}
            </Pressable>
            <TextInput
                style={styles.textInput}
                autoFocus
                value={code}
                onChangeText={setCode}
                maxLength={maximumLength}
                ref={inputRef}
            />
        </View>
    );
};

export default OTPInput;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        /* width: 300px;
         border-color: #e5e5e5;
         border-width: 1px;
         border-radius: 5px;
         padding: 15px;
         margin-top: 50px;
         color: white; */
        position: "absolute",
        opacity: 0,
    },
    pressable: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    splitboxes: {
        borderColor: colors.textLightGrey,
        borderWidth: 2,
        borderRadius: 5,
        padding: 12,
        minWidth: 50,
    },
    otpText: {
        fontSize: 20,
        textAlign: "center",
        color: colors.textPrimary
    },
    activeOrFocusBox: {
        borderColor: colors.secondary,
        backgroundColor: colors.lightGrey
    }
});