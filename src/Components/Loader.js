import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import colors from '../utils/colors'

export default function Loader({ loading, ...props }) {
    if (loading)
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(52, 52, 52, 0.8)" }}>
                <ActivityIndicator color={colors.textPrimary} size={50} />
            </View>
        );
    return props.children;
}
