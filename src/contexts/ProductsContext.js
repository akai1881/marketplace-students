import React, { useReducer } from "react";
import axios from "axios";
import { JSON_API } from "../helpers/constants";
import { calcSubPrice, calcTotalPrice } from "../helpers/calcPrice";

export const productsContext = React.createContext();

const INIT_STATE = {
  products: [],
  productDetails: null,
  productsCountInCart: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).products.length
    : 0,
  cartData: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_PRODUCT_DETAILS":
      return { ...state, productDetails: action.payload };
    case "FILTER_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_AND_DELETE_PRODUCT_IN_CART":
      return { ...state, productsCountInCart: action.payload };
    case "GET_CART":
      return { ...state, cartData: action.payload };
    default:
      return state;
  }
};

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function getProducts() {
    let { data } = await axios(`${JSON_API}/products${window.location.search}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
  }

  async function getProductsDetails(id) {
    const { data } = await axios(`${JSON_API}/products/${id}`);
    dispatch({
      type: "GET_PRODUCT_DETAILS",
      payload: data,
    });
  }

  async function filterProducts(value) {
    let params = "";
    params = value ? `?category=${value}` : "";
    const { data } = await axios(`${JSON_API}/products${params}`);
    dispatch({
      type: "FILTER_PRODUCTS",
      payload: data,
    });
  }

  //=========>>>> HERE TO START <<<<=========
  function addAndDeleteProductInCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let newProduct = {
      product: product,
      count: 1,
      subPrice: 0,
    };
    newProduct.subPrice = calcSubPrice(newProduct);
    let newCart = cart.products.filter(
      (item) => item.product.id === product.id
    );
    if (newCart.length > 0) {
      cart.products = cart.products.filter(
        (item) => item.product.id !== product.id
      );
    } else {
      cart.products.push(newProduct);
    }
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: "ADD_AND_DELETE_PRODUCT_IN_CART",
      payload: cart.products.length,
    });
  }

  function checkProductInCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let newCart = cart.products.filter((item) => item.product.id === id);
    return newCart.length > 0 ? true : false;
  }

  function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  }

  function changeCountProducts(count, id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      if (item.product.id === id) {
        item.count = count;
        item.subPrice = calcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  function makeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
  }

  return (
    <productsContext.Provider
      value={{
        products: state.products,
        productDetails: state.productDetails,
        productsCountInCart: state.productsCountInCart,
        cartData: state.cartData,
        getProducts,
        getProductsDetails,
        filterProducts,
        addAndDeleteProductInCart,
        checkProductInCart,
        getCart,
        changeCountProducts,
        makeOrder,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
