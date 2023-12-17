import { useDispatch,useSelector} from "react-redux";
import { fetchProducts, sortProducts } from "../app/features/ProductsSlice";
import { useState,useEffect } from "react";
import { FaSort } from "react-icons/fa";
import  AdminProduct  from "./AdminProduct";

export default function AdminProducts() {
    const dispatch = useDispatch()

    let {products} = useSelector(state => state.ProductsReducer);

    const [flag,setFlag] = useState(false);

    const [showMessage, setShowMessage] = useState(false);

    const sortProductsCmp = () => {
        dispatch(sortProducts());
    }

    useEffect(() => {
        dispatch(fetchProducts());
    },[dispatch,flag])

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
                    return <AdminProduct setShowMessage={setShowMessage} flag = {flag} setFlag = {setFlag} key = {index} product={product}/>
                })}
            </div>
            {showMessage && <div className="message2 basketmsg">
                {showMessage.name} was removed!
            </div>}
        </div>
        </>
    )
}