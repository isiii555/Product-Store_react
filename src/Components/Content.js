import {useDispatch, useSelector} from "react-redux";
import { FaSort } from "react-icons/fa";
import {sortProducts} from "../app/features/ProductsSlice";
import Product from "./Product";

export default function Content() {

    const dispatch = useDispatch()

    let {products} = useSelector(state => state.ProductsReducer);
    const sortProductsCmp = () => {
        dispatch(sortProducts());
    }

    return (
        <div className="content-container">
            <button onClick={sortProductsCmp} className="sort-button">
                Sort products
                <FaSort/>
            </button>
            <div className="content">
                {products.map((product,index) => {
                    return <Product key = {index} product={product}/>
                })}
            </div>
        </div>
    )
}