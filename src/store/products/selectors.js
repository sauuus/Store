import { createSelector } from "@reduxjs/toolkit";
import {Action} from './action-types';

export const selectProductState = (rootState) => rootState["products"];

export const selectProducts = createSelector(
  selectProductState,
  (s) => s.products
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (s) => s.loading
);
export const selectedProduct = (product) => {
  return {
    type: Action.SELECTED_PRODUCT,
    payload: product,
  };
};

export const removeSelectedProduct = () => {
 
  return{
    type: Action.REMOVE_SELECTED_PRODUCT,
  };
};

// export const sortProductByPrice = (sort, filteredProduct) => (dispatch) => {
  

//   const sortedProduct = filteredProduct.slice();
//   if (sort === "latest") {
    
//     sortedProduct.sort((a, b) => (a._id > b._id ? 1 : -1));
//   } else {
    
//     sortedProduct.sort((a, b) =>
//       sort === "lowest"
//         ? a.price > b.price
//           ? 1
//           : -1
//         : a.price > b.price
//         ? -1
//         : 1
//     );
//   }
//   dispatch({
//     type: ActionTypes.SORT_PRODUCT_BY_PRICE,
//     payload: { sort: sort, products: sortedProduct },
//   });
// };