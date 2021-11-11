import React, { createContext, useContext, useReducer } from 'react';
import { $api } from '../service/axios-config';
import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
} from '../utils/constants';
import {
  productError,
  productLoading,
  productSuccess,
} from './actions/productDetailsActions';
import {
  productsError,
  productsLoading,
  productsSuccess,
} from './actions/productsActions';

const productsContext = createContext();

export const useProducts = () => useContext(productsContext);

const initialState = {
  loading: false,
  error: null,
  products: [],
  productDetails: {
    loading: false,
    error: null,
    product: null,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS_LOADING:
      return { ...state, loading: true };

    case GET_PRODUCTS_ERROR:
      return { ...state, loading: false, products: [], error: action.payload };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case GET_PRODUCT_LOADING:
      return {
        ...state,
        productDetails: { ...state.productDetails, loading: true },
      };

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          loading: false,
          error: null,
          product: action.payload,
        },
      };

    case GET_PRODUCT_ERROR:
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          loading: false,
          error: action.payload,
          product: null,
        },
      };

    default:
      return state;
  }
};

const ProductsContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async () => {
    dispatch(productsLoading());
    try {
      const { data } = await $api();
      setTimeout(() => {
        dispatch(productsSuccess(data));
      }, 2000);
    } catch (error) {
      console.log(error.message);
      dispatch(productsError(error.message));
    }
  };

  const fetchOneProduct = async (id) => {
    dispatch(productLoading());
    try {
      const { data } = await $api(`/${id}`);
      dispatch(productSuccess(data));
      //   console.log(data);
      //   console.log(state);
    } catch (error) {
      console.log(error.message);
      dispatch(productError(error.message));
    }
  };

  const values = {
    products: state.products,
    loading: state.loading,
    error: state.error,
    productDetailsLoading: state.productDetails.loading,
    productDetails: state.productDetails.product,
    productDetailsError: state.productDetails.error,
    fetchProducts,
    fetchOneProduct,
  };

  return (
    <productsContext.Provider value={values}>
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContext;
