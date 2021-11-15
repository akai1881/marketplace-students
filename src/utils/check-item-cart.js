export const checkItemInCart = (cart, productId) => cart.some(({ product }) => product.id === productId);
