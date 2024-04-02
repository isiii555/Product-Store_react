import { useRef, useState } from "react";
import { fetchProducts } from "../app/features/ProductsSlice";
import { useDispatch } from "react-redux";

const apiUrl = process.env.REACT_APP_API_URL;

export default function AddProduct() {
    const dispatch = useDispatch();

    const [prodName, setProdName] = useState("");
    const [prodDescription, setProdDescription] = useState("");
    const [prodPrice, setProdPrice] = useState("");
    const [prodImageUrl, setProdImageUrl] = useState("");
    const [message, setMessage] = useState(false);

    const formRef = useRef();

    const addProduct = (e) => {
        e.preventDefault();
        let obj = {
            product_name: prodName,
            product_description: prodDescription,
            product_img: `${prodImageUrl}`,
            product_price: prodPrice
        }
        fetch(`${apiUrl}/add-admin`, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(obj),
        })
            .then(res => res.text())
            .then(data => console.log(data))
            .then(() => setMessage(prodName))
            .then(() => formRef.current.reset())
            .then(() => dispatch(fetchProducts()));
    }

    return (
        <div className="add-product-container">
            <form ref={formRef}>
                <input onChange={e => setProdName(e.target.value)} required type="text" placeholder="Enter product name" />
                <input onChange={e => setProdDescription(e.target.value)} required type="text" placeholder="Enter product description" />
                <input onChange={e => setProdPrice(+e.target.value)} required type="number" placeholder="Enter product price" />
                <input onChange={e => setProdImageUrl(e.target.value)} required type="text" placeholder="Enter product image url" />
                <button onClick={addProduct}>Add Product</button>
            </form>
            {message && <div className="message">
                {message} is added to products!
            </div>}
        </div>
    )
}
