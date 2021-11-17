import {
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_LOADING,
    GET_PRODUCTS_SUCCESS,
    SET_SEARCH_RESULTS,
} from '../../utils/constants';

export const productsLoading = () => ({ type: GET_PRODUCTS_LOADING });

export const productsSuccess = (data) => ({ type: GET_PRODUCTS_SUCCESS, payload: data });

export const productsError = (msg) => ({ type: GET_PRODUCTS_ERROR, payload: msg });

export const setSearchResults = (data) => ({ type: SET_SEARCH_RESULTS, payload: data });
