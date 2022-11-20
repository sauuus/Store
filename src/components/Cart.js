import { useContext } from "react";
import { Cartcontext } from "../../context/Context";
import "./Cart.css";

const Cart = () => {
  const Globalstate = useContext(Cartcontext);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;

  const total = state.reduce((total, id) => {
    return total + id.price * id.quantity;
  }, 0);
  return (
    <div className="cart">
      {state.map((id, index) => {
        return (
          <div className="card" key={index}>
            <img src={id.image} alt="" />
            <p>{id.title}</p>
            <p>{id.quantity * id.price}</p>
            <div className="quantity">
              <button
                onClick={() => dispatch({ type: "INCREASE", payload: id })}>
                +
              </button>
              <p>{id.quantity}</p>
              <button
                onClick={() => {
                  if (id.quantity > 1) {
                    dispatch({ type: "DECREASE", payload: id });
                  } else {
                    dispatch({ type: "REMOVE", payload: id });
                  }
                }}>
                -
              </button>
            </div>
            <h2 onClick={() => dispatch({ type: "REMOVE", payload: id })}>
              x
            </h2>
          </div>
        );
      })}
      {state.length > 0 && (
        <div className="total">
          <h2>{total}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;