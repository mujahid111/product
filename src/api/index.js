import Axios from 'axios';

const BASE_URL="https://fakestoreapi.com";

export const getProductsData = () => Axios.get(`${BASE_URL}/products`);
export const addProductsData = (data) => Axios.post(`${BASE_URL}/products`,data);