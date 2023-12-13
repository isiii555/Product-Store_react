import {useRef, useState} from "react";

export default function AddProduct() {
    const [prodName,setProdName] = useState("");
    const [prodDescription,setProdDescription] = useState("");
    const [prodPrice,setProdPrice] = useState("");
    const [prodImageUrl,setProdImageUrl] = useState("");
    const [message,setMessage] = useState(false);

    const formRef = useRef();

    const addProduct = (e) => {
        e.preventDefault();
        let obj = {
            product_name : prodName,
            product_description : prodDescription,
            product_image : `${prodImageUrl}`,
            product_price : prodPrice
        }
        fetch("http://localhost:5000/add-admin",{
            method : "POST",
            headers : {
                'Content-type' : "application/json"
            },
            body : JSON.stringify(obj),
        })
        .then(res => res.text())
        .then(data => console.log(data))
        .then(() => setMessage(prodName))
        .then(() => formRef.current.reset());
    }

    return(
        <div className = "add-product-container">
            <form ref={formRef}>
                <input onChange={e => setProdName(e.target.value)} required type = "text" placeholder = "Enter product name" /> 
                <input onChange={e => setProdDescription(e.target.value)} required type = "text" placeholder = "Enter product description"/> 
                <input onChange={e => setProdPrice(e.target.value)} required type = "number" placeholder = "Enter product price"/>
                <input onChange={e => setProdImageUrl(+e.target.value)} required type = "text" placeholder = "Enter product image url"/> 
                <button onClick={addProduct}>Add Product</button> 
            </form>
            {message && <div className="message">
                {message} is added to products!
            </div>}
        </div>
    )
}