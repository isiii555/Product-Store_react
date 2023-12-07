import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ProductBasket from "../Components/ProductBasket";
import {fetchMyBag} from "../app/features/ProductsSlice";

export default function Products() {

    const dispatch = useDispatch();

    const [flag,setFlag] = useState(false);

    const { myBag } = useSelector((state) => state.ProductsReducer);

    useEffect(() => {
        dispatch(fetchMyBag())
    },[dispatch,flag])

    return (
        <div>
            {myBag.map(product => {
                return <ProductBasket setFlag = {setFlag} flag = {flag} product = {product}/>
            })}
        </div>
    )
}