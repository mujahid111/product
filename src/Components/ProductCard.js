import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../utils/colors';
import Button from './Button';
import ProgressiveImage from './Image';
import { useNavigation } from '@react-navigation/native';

export default function ProductCard(props) {
    const navigation = useNavigation();

    return (
        <View style={[styles.card, { margin: 10, maxWidth: '45%' }]}>
            <Button activeOpacity={0.7} onPress={() => {
                navigation.navigate("googleMap", { item: props.item })
            }}>
                <>
                    <ProgressiveImage
                        thumbnailSource={{ uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=50&buster=${Math.random()}` }}
                        source={{ uri: props.item.image }} style={{ height: 195 }} />
                    <View style={{ paddingHorizontal: 5 }}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
                                {props.item.title}
                            </Text>
                        </View>
                        <Text style={styles.subTitle}>
                            ₹ {props.item.price}
                        </Text>
                    </View>
                </>
            </Button>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(52,52,52,0.6)",
        borderColor: "rgba(55,55,55,0.9)",
        borderRadius: 5,
        flex: 1,
    },
    titleContainer: {
        marginTop: 14,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        color: colors.textPrimary
    },
    subTitle: {
        color: colors.textPrimary,
        fontWeight: "bold",
        marginBottom: 10
    }
});
