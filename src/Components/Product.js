import { FaShoppingBasket } from "react-icons/fa";
import {useDispatch} from "react-redux";
import {addProductToBasket} from "../app/features/ProductsSlice"
export default function Product({product}) {

    const dispatch = useDispatch();
    const addToBasket = (product) => {
        console.log(product)
        dispatch(addProductToBasket(product));
    }

    return (
        <div className="product-card">
            <img src = {product.product_img} alt={product.product_name}/>
            <div className="product-name">
                {product.product_name}
            </div>
            <div className="product-description">
                {product.product_description}
            </div>
            <div className="product-price">
                {product.product_price} AZN
            </div>
            <FaShoppingBasket onClick={() => addToBasket(product)} className="basket"/>
        </div>
    )
}