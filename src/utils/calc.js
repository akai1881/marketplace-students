export const calcSubPrice = (item) => {
  return item.count * item.product.price;
};

export const calcTotalPrice = (items) => {
  let total = 0;
  items.forEach((item) => {
    total = total + item.subPrice;
  });
  return total;
};
