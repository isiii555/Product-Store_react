import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { deleteProductFromBasket } from "../app/features/ProductsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";



export default function ProductBasket( {product,setFlag,flag}) {

    const dispatch = useDispatch();

    const removeFromBag = () => {
        dispatch(deleteProductFromBasket(product));
        setFlag(!flag);
    }

    return(
        <div className="product-basket">
            <div className="container">
                <img src = {product.product_img} className="product-image"/>
                <div className="product-info">
                    <div className="product-name">{product.product_name}</div>
                    <div className="product-description">{product.product_description}</div>
                    <div className="product-price">{product.product_price}</div>
                    <div onClick={removeFromBag} className="product-remove">Remove</div>
                </div>
            </div>
            <div className="product-count">
                {product.id}
                <div className="arrows">
                    <div>
                        <IoMdArrowDropup/>
                    </div>
                    <div>
                        <IoMdArrowDropdown/>
                    </div>
                </div>
            </div>
        </div>
    )
}