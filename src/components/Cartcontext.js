
import { createContext, useReducer } from "react";

export const Cartcontext = createContext();
export const Context = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        const tempstate = state.filter((id) => action.payload.id === id.id);
        if (tempstate.length > 0) {
          return state;
        } else {
          return [...state, action.payload];
        }
      case "INCREASE":
        const tempstate1 = state.map((id) => {
          if (id.id === action.payload.id) {
            return { ...id, quantity: id.quantity + 1 };
          } else {
            return id;
          }
        });
        return tempstate1;
      case "DECREASE":
        const tempstate2 = state.map((id) => {
          if (id.id === action.payload.id) {
            return { ...id, quantity: id.quantity - 1 };
          } else {
            return id;
          }
        });
        return tempstate2;
      case "REMOVE":
        const tempstate3 = state.filter(
          (id) => id.id !== action.payload.id
        );

        return tempstate3;

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, []);
  const info = { state, dispatch };
  return (
    <Cartcontext.Provider value={info}>{props.children}</Cartcontext.Provider>
  );
};