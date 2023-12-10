import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProductToBasket} from "../app/features/ProductsSlice";
import {useEffect, useState} from "react";

export default function ProductPage() {
    const {id} = useParams();

    const dispatch = useDispatch();

    const {products} = useSelector(state => state.ProductsReducer);

    const product = products.find(prod => prod.id === +id);

    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (showMessage) {
            const time = setTimeout( () => {
                setShowMessage(false);
            },2000)
            return (() => clearTimeout(time))
        }
    }, [showMessage])

    const addProduct = () => {
        dispatch(addProductToBasket(product));
        setShowMessage(product.product_name);
    }

    return (
        <>
            {product && <div className="product-page">
                <img className="product-page-image" src={product.product_img}/>
                <div className="product-page-info">
                    <div className="product-name">
                        {product.product_name}
                    </div>
                    <div className="product-description">
                        {product.product_description}
                    </div>
                    <div className="product-price">
                       {product.product_price} AZN
                    </div>
                    <div onClick={addProduct} className="add-to-cart">
                        Add to cart
                    </div>
                </div>
            </div>}
            {showMessage && <div className="message">
                {showMessage} was added to basket!
            </div>}
        </>
    )
}