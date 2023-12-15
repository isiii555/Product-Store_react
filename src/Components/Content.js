import {useDispatch, useSelector} from "react-redux";
import { FaSort } from "react-icons/fa";
import {sortProducts} from "../app/features/ProductsSlice";
import Product from "./Product";
import {useEffect, useState} from "react";

export default function Content() {

    const dispatch = useDispatch()

    let {products} = useSelector(state => state.ProductsReducer);

    const [showMessage, setShowMessage] = useState(false);
    const sortProductsCmp = () => {
        dispatch(sortProducts());
    }

    useEffect(() => {
        if (showMessage) {
            const time = setTimeout( () => {
                setShowMessage(false);
            },2000)
            return (() => clearTimeout(time))
        }
    }, [showMessage])

    return (
        <>
        <div className="content-container">
            <button onClick={sortProductsCmp} className="sort-button">
                Sort products
                <FaSort/>
            </button>
            <div className="content">
                {products.map((product,index) => {
                    return <Product setShowMessage = {setShowMessage} showMessage = {showMessage} key = {index} product={product}/>
                })}
            </div>
        </div>
        </>
    )
}