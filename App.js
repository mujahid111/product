import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Views/Auth/Login';
import colors from './src/utils/colors';
import Dashboard from './src/Views/Dashboard/Dashboard';
import { persistor, store } from './src/store';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Map from './src/Views/Map/Map';
import Button from './src/Components/Button';
import AddProduct from './src/Views/AddProduct/AddProduct';
import { Creators as itemsDispatcher } from './src/store/products';
import { useDispatch } from "react-redux"
import Detail from './src/Views/Detail/Detail';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const AuthScreens = () => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator initialRouteName='dashboard'>
      <Stack.Screen name="dashboard" component={Dashboard} options={{
        title: "Products",
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.textPrimary,
          fontWeight: "bold",
        },
        headerRight: () => {
          const navigator = useNavigation();

          return (
            <Button
              onPress={() => {
                dispatch(itemsDispatcher.clearFormData());
                navigator.navigate("newItem")
              }}
              style={{ backgroundColor: colors.lightGrey, borderWidth: 1, borderColor: colors.textLightGrey, padding: 5, paddingHorizontal: 20, borderRadius: 50 }}>
              <Text style={{ color: colors.textPrimary }}>Add Product</Text>
            </Button>
          )
        }
      }} />
      <Stack.Screen name="newItem" component={AddProduct} options={{
        title: "Add New Product",
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.textPrimary,
          fontWeight: "bold",
        },
        headerTintColor: colors.textPrimary
      }} />
      <Stack.Screen name="detail" component={Detail} options={{
        title: "Product Detail",
        headerTransparent: true,
        headerTitleStyle: {
          color: colors.textPrimary,
          fontWeight: "bold",
        },
        headerTintColor: colors.textPrimary
      }} />
      <Stack.Screen name="googleMap" component={Map} options={{
        title: "",
        headerTransparent: true,
        headerTitleStyle: {
          color: colors.textPrimary,
          fontWeight: "bold",
        },
      }} />
    </Stack.Navigator>
  )
};

const SignInScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

const Routes = ({ user }) => {
  return (
    <>
      {!!user ? <AuthScreens /> : <SignInScreen />}
    </>

  )
};

const App = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(u) {
    setUser(u);
    if (initializing) setInitializing(false);
  };


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
        <NavigationContainer>
          <Routes user={user} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
