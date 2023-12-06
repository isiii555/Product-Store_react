import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "fetchProducts",
    async () => {
        let res = fetch("http://localhost:5000/goods");
        return (await res).json();
    }
)

export const fetchMyBag = createAsyncThunk(
    "fetchMyBag",
    async () => {
        let res = fetch("http://localhost:5000/my-bag");
        return (await res).json();
    }
)

const initialState = {
    products: [],
    myBag : [],
    sorted: false,
}

const ProductsSlice = createSlice(
    {
        name: "ProductsSlice",
        reducers: {

            addProductToBasket: (state, action) => {
                console.log("Hello")
                fetch("http://localhost:5000/add-mybag", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(action.payload)
                })
                    .then(res => res.text())
                    .then(data => console.log(data));
            },
            deleteProductFromBasket: (state, action) => {
                fetch(`http://localhost:5000/delete-mybag/${action.payload.id}`, {
                    method: "DELETE",
                })
                    .then(res => res.text())
                    .then(data => console.log(data));
            },
            sortProducts: (state) => {
                let newProducts = [...state.products];
                state.sorted ? newProducts.sort((a, b) => a.product_price - b.product_price) : newProducts.sort((a, b) => b.product_price - a.product_price);
                state.sorted = !state.sorted;
                state.products = newProducts;
            }
        },
        initialState,
        extraReducers: (builder) => {
            builder.addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = [...action.payload];
            })
            builder.addCase(fetchMyBag.fulfilled,(state,action) => {
                state.myBag = action.payload;
            })
        }
    }
)

export const {sortProducts, addProductToBasket, deleteProductFromBasket} = ProductsSlice.actions
export default ProductsSlice.reducer;