import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Detail(props) {
    const item = props?.route?.params;

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <>
                    <Image source={{ uri: item?.image }} style={styles.backImage} />
                    <LinearGradient colors={['#rgba(0, 0, 0, 0.3)', '#rgba(0, 0, 0, 0.7)', "rgba(0, 0, 0, 1)"]} style={styles.linearGradient} />
                    <View style={styles.intro}>
                        <View style={styles.image}>
                            <Image source={{ uri: item?.image }} style={{ width: 156, height: 195 }} />
                        </View>
                        <Text style={styles.name}>{item.title}</Text>
                        <Text style={styles.title1}>₹ {item.price}</Text>
                    </View>
                    <View style={{ padding: 24 }}>
                        <View style={styles.priceContainer}>
                            <View>
                                <Text style={styles.title1}>Category</Text>
                                <Text style={styles.value}>{item.category}</Text>
                            </View>
                        </View>
                        <View style={styles.priceContainer}>
                            <View>
                                <Text style={styles.title1}>Description</Text>
                                <Text style={styles.value}>{item.description}</Text>
                            </View>
                        </View>
                    </View>
                </>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.black,
    },
    backImage: {
        position: "absolute",
        width: windowWidth,
        height: windowHeight - 200,
        resizeMode: "cover"
    },
    linearGradient: {
        flex: 1,
        position: "absolute",
        width: windowWidth,
        height: windowHeight - 200,
    },
    intro: {
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 100
    },
    image: {
        height: 195,
        width: 156,
        borderRadius: 5,
        overflow: 'hidden'
    },
    name: {
        marginTop: 26,
        fontSize: 31,
        color: colors.textPrimary
    },
    otherTitle: {
        marginTop: 60,
        fontSize: 23,
        color: colors.textPrimary
    },
    description: {
        fontSize: 14,
        color: colors.textPrimary
    },
    category: {
        fontSize: 14,
        color: colors.danger
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: 15,
    },
    title1: {
        color: colors.secondary,
        fontSize: 14,
        marginVertical: 3
    },
    value: {
        color: colors.textPrimary,
        fontSize: 14
    },

});
