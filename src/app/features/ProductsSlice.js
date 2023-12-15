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

export const fetchMyBagSearch = createAsyncThunk(
    "fetchMyBagSearch",
    async (value) => {
        let res = fetch(`http://localhost:5000/search-goods/${value}`);
        return (await res).json();
    }
)

const initialState = {
    products: [],
    myBag : [],
    sorted: false,
    bagSorted : false,
}

const ProductsSlice = createSlice(
    {
        name: "ProductsSlice",
        reducers: {
            addProductToBasket: (state, action) => {
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
            },
            sortBag : (state) => {
                let newProducts = [...state.myBag];
                state.bagSorted ? newProducts.sort((a, b) => a.product_price - b.product_price) : newProducts.sort((a, b) => b.product_price - a.product_price);
                state.bagSorted = !state.bagSorted;
                state.myBag = newProducts;
            },
            submitOrder: (state,action) => {
                fetch(`http://localhost:5000/add-orders`, {
                    method: "POST",
                    headers : {
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify(action.payload)
                })
                    .then(res => res.text())
                    .then(data => console.log(data));
            },
            removeProductAdmin : (state,action) => {
                fetch(`http://localhost:5000/delete-admin/${action.payload}`,{
                    method: "DELETE"
                })
                .then(res => res.text())
                .then(data => console.log(data));
            }
            
        },
        initialState,
        extraReducers: (builder) => {
            builder.addCase(fetchProducts.fulfilled, (state, action) => {
                let prods = [...action.payload];
                if (localStorage.getItem("man") > localStorage.getItem("woman")) {
                    prods.sort((a,b) => {
                        if(a.product_name.startsWith("Kişi")){
                            return -1;
                        }
                        else if(b.product_name.startsWith("Qadın")) {
                            return 1;
                        }
                        return 0;
                    });
                    state.products = [...prods];
                }
                else if (localStorage.getItem("man") < localStorage.getItem("woman")){
                    prods.sort((a,b) => {
                        if(a.product_name.startsWith("Qadın")){
                            return -1;
                        }
                        else if(b.product_name.startsWith("Kişi")) {
                            return 1;
                        }
                        return 0;
                    });
                    state.products = [...prods];
                }
                else {
                    state.products = [...action.payload];
                }
            })
            builder.addCase(fetchMyBag.fulfilled,(state,action) => {
                state.myBag = action.payload;
            })
            builder.addCase(fetchMyBagSearch.fulfilled,(state,action) => {
                state.myBag = action.payload;
            })
        }
    }
)

export const {removeProductAdmin,searchMyBag,sortBag,submitOrder,sortProducts, addProductToBasket, deleteProductFromBasket} = ProductsSlice.actions
export default ProductsSlice.reducer;