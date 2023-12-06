import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchMyBag} from "../app/features/ProductsSlice";

export default function Products() {

    const dispatch = useDispatch();

    const { myBag } = useSelector((state) => state.ProductsReducer);

    useEffect(() => {
        dispatch(fetchMyBag())
    },[dispatch])

    return (
        <div>
            {myBag.map(product => {
                return <p>{product.product_name}</p>
            })}
        </div>
    )
}