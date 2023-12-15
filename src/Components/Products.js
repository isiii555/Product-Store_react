import {useDispatch, useSelector} from "react-redux";
import emtpyLogo from "../Assets/Images/basket-removebg-preview.png";
import noResultLogo from "../Assets/Images/6134065-removebg-preview.png"
import {useEffect, useLayoutEffect, useState} from "react";
import ProductBasket from "../Components/ProductBasket";
import {fetchMyBag} from "../app/features/ProductsSlice";

export default function Products({filteredProducts}) {

    const dispatch = useDispatch();

    const [flag,setFlag] = useState(false);

    const { myBag } = useSelector((state) => state.ProductsReducer);

    useLayoutEffect(() => {
        dispatch(fetchMyBag())
    },[dispatch,flag])

    if (myBag.length === 0) {
        return <div className = "empty-image-container">
            <img className="empty-image" src={emtpyLogo} alt ="empty" />
        </div>
    }
    else if (filteredProducts.length === 0) {
        return <div className = "empty-image-container">
            <img className="no-result-image" src={noResultLogo} alt ="noresult" />
        </div>
    }
    return (
        <div>
            {filteredProducts.map((product, index) => {
                return <ProductBasket key={index} setFlag={setFlag} flag={flag} product={product}/>
            })}
        </div>
    )
}