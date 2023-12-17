import {IoMdArrowDropup} from "react-icons/io";
import {IoMdArrowDropdown} from "react-icons/io";
import {addProductToBasket, deleteProductFromBasket} from "../app/features/ProductsSlice";
import {useDispatch} from "react-redux";

export default function ProductBasket({product, setFlag, flag}) {

    const dispatch = useDispatch();
    const addProduct = () => {
        dispatch(addProductToBasket(product))
        setFlag(!flag);
    }
    const reduceProduct = () => {
        fetch(`http://localhost:5000/delete-mybag-quantity/${product.id}`, {
            method: "DELETE"
        });
        setFlag(!flag);
    }
    const removeFromBag = () => {
        dispatch(deleteProductFromBasket(product));
        setFlag(!flag);
    }

    return (
        <div className="product-basket">
            <div className="container">
                <img src={product.product_img} className="product-image"/>
                <div className="product-info">
                    <div className="product-name">{product.product_name}</div>
                    <div className="product-description">{product.product_description}</div>
                    <div className="product-price">{product.product_price} AZN</div>
                    <div onClick={removeFromBag} className="product-remove">Remove</div>
                </div>
            </div>
            <div className="product-count">
                {product.product_quantity}
                <div className="arrows">
                    <div onClick={addProduct}>
                        <IoMdArrowDropup/>
                    </div>
                    <div onClick={reduceProduct}>
                        <IoMdArrowDropdown/>
                    </div>
                </div>
            </div>
        </div>
    )
}