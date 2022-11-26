import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import storage from 'redux-persist/es/storage';
import products from './products';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    version:1
};

const reducer = combineReducers({
    products: products,
});

const presistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(presistedReducer,
    composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);
export { persistor, store };