import {configureStore} from "@reduxjs/toolkit";
import ProductsReducer from "../features/ProductsSlice";

export const store = configureStore(
    {
        reducer : {
            ProductsReducer
        }
    }
)