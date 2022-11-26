import React from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import colors from '../../utils/colors';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from "react-redux";
import { Creators as itemsDispatcher } from '../../store/products';
import { useNavigation } from '@react-navigation/native';

export default function AddProduct() {
    const dispatch = useDispatch();
    const { form, isAddLoading } = useSelector(state => state.products);
    const isDisabled = !form.title?.trim() || !form.description?.trim() || !form.category?.trim() || !form.price?.trim() || !form.image?.trim();
    const navigate = useNavigation();

    const handleImagePicker = async () => {
        const result = await launchImageLibrary();
        if (result?.assets?.length) {
            dispatch(itemsDispatcher.setFormData("image", result.assets[0]?.uri));
        }
    };

    const handleChange = (name, value) => {
        dispatch(itemsDispatcher.setFormData(name, value));
    }

    const handleChangePrice = (value) => {
        if (/^\d+(,\d{1,2})?$/.test(value)) {
            dispatch(itemsDispatcher.setFormData("price", value));
        }
    }

    const addProduct = async () => {
        dispatch(itemsDispatcher.addProduct(form, callback));
    }

    const callback = (data) => {
        navigate.navigate("detail", data)
    }

    return (
        <View style={styles.main}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Input
                        label={"Name"}
                        value={form.title}
                        onChangeText={(value) => handleChange("title", value)}
                        placeholder="Enter product name"
                    />
                    <Input
                        containerStyle={styles.input}
                        label={"Description"}
                        value={form.description}
                        onChangeText={(value) => handleChange("description", value)}
                        placeholder="Enter product description"
                    />
                    <Input
                        containerStyle={styles.input}
                        label={"Category"}
                        value={form.category}
                        onChangeText={(value) => handleChange("category", value)}
                        placeholder="Enter product category"
                    />
                    <Input
                        containerStyle={styles.input}
                        label={"Price"}
                        value={form.price}
                        onChangeText={handleChangePrice}
                        keyboardType='phone-pad'
                        placeholder="Product price"
                    />
                    <Pressable style={styles.imagepicker} onPress={handleImagePicker}>
                        {form.image ? <Image style={{ height: "100%", width: "100%" }} source={{ uri: form.image }} /> : <Text style={styles.imagetext}>Press here to select image</Text>}
                    </Pressable>
                    <Button
                        onPress={addProduct}
                        disabled={isDisabled || isAddLoading}
                        style={[styles.add, , (isDisabled || isAddLoading) ? { backgroundColor: "#eee" } : {}]}>
                        {isAddLoading ? <ActivityIndicator /> : <Text style={[styles.addlabel, (isDisabled || isAddLoading) ? { color: "#ccc" } : {}]}>Add</Text>}
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.primary,
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10
    },
    input: {
        marginTop: 16,
    },
    add: {
        borderWidth: 2,
        borderColor: "rgba(55,55,55,0.9)",
        backgroundColor: "rgba(52,52,52,0.6)",
        alignSelf: 'flex-end',
        marginTop: 50,
        padding: 8,
        paddingHorizontal: 30,
        borderRadius: 50
    },
    addlabel: {
        color: colors.textPrimary,
        fontWeight: 'bold',
        fontSize: 20
    },
    imagetext: {
        color: colors.textLightGrey
    },
    imagepicker: {
        backgroundColor: "rgba(52,52,52,0.6)",
        borderColor: "rgba(55,55,55,0.9)",
        borderWidth: 2,
        marginTop: 24,
        borderRadius: 5,
        overflow: "hidden",
        height: 200,
        alignItems: "center",
        justifyContent: 'center'
    }
});
