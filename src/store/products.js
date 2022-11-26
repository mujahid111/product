import { createActions, createReducer } from "reduxsauce";
import { addProductsData, getProductsData } from "../api";


const getProducts = () => {
    return (dispatch) => {
        dispatch(Creators.isLoadingProducts());
        getProductsData()
            .then((response) => {
                dispatch(Creators.getProductsSuccess(response.data));
            })
            .catch((error) => {
                dispatch(Creators.getProductsError(error.message));
            });
    };
};

const addProduct = (data,callback) => {
    return (dispatch) => {
        dispatch(Creators.isLoadingAddProduct());
        addProductsData(data)
            .then((response) => {
                dispatch(Creators.addProductSuccess(response.data));
                dispatch(Creators.clearFormData());
                callback(response.data);
            })
            .catch((error) => {
                dispatch(Creators.addProductError(error.message));
            });
    };
};

export const { Types, Creators } = createActions({
    getProducts,
    getProductsSuccess: ["products"],
    getProductsError: ["error"],
    isLoadingProducts: [],
    addProduct,
    addProductSuccess: ["product"],
    addProductError: ["error"],
    isLoadingAddProduct: [],
    setFormData: ['key', 'value'],
    clearFormData: []
});

const initialState = {
    products: [],
    form: {
        title: "",
        price: "",
        description: "",
        image: null,
        category: ""
    },
    isError: false,
    isLoading: false,
    isSearching: false,
    isSearchError: null,
    isAddLoading: false,
    isAddError: null
};

const getProductsSuccess = (state = initialState, action) => {
    return {
        ...state,
        isLoading: false,
        products: action.products,
        isError: "",
    };
};

const getProductsError = (state = initialState, action) => {
    return {
        ...state,
        isLoading: false,
        isError: action.error,
    };
};

const isLoadingProducts = (state = initialState, action) => {
    return {
        ...state,
        isLoading: true,
        isError: "",
    };
};

const addProductSuccess = (state = initialState, action) => {
    return {
        ...state,
        isAddLoading: false,
        products: [...state.products, action.product],
        isAddError: "",
    };
};

const addProductError = (state = initialState, action) => {
    return {
        ...state,
        isAddLoading: false,
        isAddError: action.error,
    };
};

const isLoadingAddProduct = (state = initialState, action) => {
    return {
        ...state,
        isAddLoading: true,
        isAddError: "",
    };
};

const setFormData = (state = initialState, action) => {
    return {
        ...state,
        form: {
            ...state.form,
            [action.key]: action.value
        }
    };
};

const clearFormData = (state = initialState, action) => {
    return {
        ...state,
        form: {
            title: "",
            price: "",
            description: "",
            image: "",
            category: ""
        }
    };
};


export default createReducer(initialState, {
    [Types.IS_LOADING_PRODUCTS]: isLoadingProducts,
    [Types.GET_PRODUCTS]: getProducts,
    [Types.GET_PRODUCTS_ERROR]: getProductsError,
    [Types.GET_PRODUCTS_SUCCESS]: getProductsSuccess,
    [Types.IS_LOADING_ADD_PRODUCT]: isLoadingAddProduct,
    [Types.ADD_PRODUCT]: addProduct,
    [Types.ADD_PRODUCT_ERROR]: addProductError,
    [Types.ADD_PRODUCT_SUCCESS]: addProductSuccess,
    [Types.SET_FORM_DATA]: setFormData,
    [Types.CLEAR_FORM_DATA]: clearFormData,
});
