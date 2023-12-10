import { GrShop } from "react-icons/gr";
import { SlInfo } from "react-icons/sl";


import {useDispatch} from "react-redux";
import {addProductToBasket} from "../app/features/ProductsSlice"
import {useNavigate} from "react-router-dom";
import {Fa9} from "react-icons/fa6";
export default function Product({product, setShowMessage,showMessage}) {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const productInfo = () => {
        navigate(`/product/${product.id}`);
    }
    const addToBasket = (product) => {
        dispatch(addProductToBasket(product));
        product.product_name.startsWith("Kişi") ? localStorage.setItem("man",+localStorage.getItem("man") + 1) : localStorage.setItem("woman",+localStorage.getItem("woman") + 1);
        setShowMessage({
            id : product.id,
            name : product.product_name,
        });
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
            <div className="action-product">
                <GrShop onClick={() => addToBasket(product)}/>
                <SlInfo onClick={productInfo}/>
            </div>
            {showMessage.id === product.id && <div className="message2">
                {showMessage.name} was added to basket!
            </div>}
        </div>
    )
}