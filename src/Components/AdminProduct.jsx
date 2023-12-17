import {useDispatch} from "react-redux";
import { FaRegTrashAlt,FaRegEdit } from "react-icons/fa";
import { removeProductAdmin } from "../app/features/ProductsSlice";
import {useNavigate} from "react-router-dom";

export default function AdminProduct({product, setShowMessage, setFlag,flag}) {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const editProduct = () => {
        navigate(`edit-product/${product.id}`);
    }

    const removeProduct = () => {
        dispatch(removeProductAdmin(product.id));
        setFlag(!flag);
        setShowMessage({
            id : product.id,
            name : product.product_name
        })
    };

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
                <FaRegTrashAlt onClick={() => removeProduct()}/>
                <FaRegEdit onClick={editProduct}/>
            </div>
        </div>
    )
}