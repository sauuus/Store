import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const productState = {
  loading: false,
  error: "",
  products: []
};


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: productState,
  reducers: {
 
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const tempProducts = [...state.products].filter(
        (pd) => pd.id !== productId
      );
      state.products = tempProducts;
    },
 
    searchProduct: (state, action) => {
      const searchTerm = action.payload;
      if (!searchTerm) {
        return;
      }
      const searchedProduct = [...state.products].filter((pd) =>
        pd.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      state.products = searchedProduct;
    },
    sortProduct: (state, action) => {
      const type = action.payload;
      if (type) {
        const sortProduct = [...state.products].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        state.products = sortProduct;
      } else {
        const sortProduct = [...state.products].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        state.products = sortProduct;
      }
    },
    cartRedu: (state, action) => {
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
    }
  
  },

  handleSortlth: (state, action) => {
    const type = action.payload;
      if (type) {
        
        const sortlth =[...state.products].sort((a, b) => (a.price-b.price));
        state.products= sortlth
      } else  {
        // sortProductByPrice.sort((a, b) => (b.price-a.price));
        return 0;

      }
    },
  
  
  //maintin redux state for asyc apis
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload;
      });
  }
});

//export actions
export const { deleteProduct, searchProduct, sortProduct, handleSortlth, cartRedu} = productsSlice.actions;

export default productsSlice.reducer;
