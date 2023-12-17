import { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"

export default function EditAdminProduct() {

    const {id} = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {products} = useSelector(state => state.ProductsReducer);

    const priceRef = useRef();

    const [price,setPrice] = useState(false);

    const product = products.find(prod => prod.id === +id);

    useEffect(() => {
        if (!price && product) {
            setPrice(product.product_price);
        }
    },[price,product])

    const editProduct = () => {
        fetch(`http://localhost:5000/change-admin/${id}`,{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({...product,product_price : price}),
        })
        .then(res => res.text())  
        .then(data => console.log(data));
        navigate("/admin");
    }

    return(
        <>
            {product && <div className="product-page">
                <img className="product-page-image" alt="productimage" src={product.product_img}/>
                <div className="product-page-info">
                    <div className="product-name">
                        {product.product_name}
                    </div>
                    <div className="product-description">
                        {product.product_description}
                    </div>
                    <div className="product-price">
                       <input ref={priceRef} type="number" onChange={(e) => {
                        setPrice(e.target.value ? e.target.value : false);
                        console.log(price);
                        }} defaultValue={product.product_price} placeholder="Enter new price"/> AZN
                    </div>
                    <div className="add-to-cart" onClick={editProduct}>
                        Edit Product
                    </div>
                </div>
            </div>}
        </>
    )
}