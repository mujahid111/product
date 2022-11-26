import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import colors from '../../utils/colors';
import { Creators as itemsDispatcher } from '../../store/products';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import ProductCard from '../../Components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import AllProductPrice from '../../Components/AllProductPrice';
import auth from '@react-native-firebase/auth';

export default function Dashboard(props) {
    const dispatch = useDispatch();
    const { products, isLoading } = useSelector(state => state.products);
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(itemsDispatcher.getProducts());
    }, [navigation.isFocused]);


    return (
        <View style={styles.screen}>
            <Loader loading={isLoading}>
                <FlatList
                    ListHeaderComponent={() => <AllProductPrice />}
                    numColumns={2}
                    data={products}
                    renderItem={(p) => <ProductCard
                        {...p}
                    />}
                    keyExtractor={item => item.id}
                />
            </Loader>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.black,
    },
    text: {
        // fontFamily: "Roboto-Light"
    }
});

