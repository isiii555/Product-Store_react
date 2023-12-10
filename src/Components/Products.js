import {useDispatch, useSelector} from "react-redux";
import emtpyLogo from "../Assets/Images/basket-removebg-preview.png";
import {useEffect, useLayoutEffect, useState} from "react";
import ProductBasket from "../Components/ProductBasket";
import {fetchMyBag} from "../app/features/ProductsSlice";

export default function Products() {

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
    return (
        <div>
            {myBag.map((product, index) => {
                return <ProductBasket key={index} setFlag={setFlag} flag={flag} product={product}/>
            })}
        </div>
    )
}