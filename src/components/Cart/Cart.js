import React, { useEffect } from "react";
import { useProducts } from "../../contexts/ProductsContext";
import { calcTotalPrice } from "../../utils/calc";

const Cart = () => {
  const { cart, getCart } = useProducts();
  useEffect(() => {
    getCart();
  }, []);
  console.log(cart, "here");
  return (
    <div>
      {cart && cart.products ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Count</th>
                <th>Sub Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.products.map((item) => (
                <tr>
                  <td>
                    <img
                      src={item.product.image}
                      alt=""
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>{item.product.title}</td>
                  <td>{item.product.price}</td>
                  <td>
                    <input type="number" value={item.count} />
                  </td>
                  <td>{item.subPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total: {calcTotalPrice(cart.products)}</h4>
          <button>Оплатить</button>
        </>
      ) : (
        <h1>Cart is empty</h1>
      )}
    </div>
  );
};

export default Cart;
