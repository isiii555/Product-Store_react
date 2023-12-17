import {useDispatch, useSelector} from "react-redux";
import emptyLogo from "../Assets/Images/basket-removebg-preview.png";
import noResultLogo from "../Assets/Images/6134065-removebg-preview.png"
import {useEffect, useState} from "react";
import ProductBasket from "../Components/ProductBasket";
import {fetchMyBag} from "../app/features/ProductsSlice";

export default function Products() {

    const dispatch = useDispatch();

    const {myBag,filteredMyBag} = useSelector((state) => state.ProductsReducer);

    const [flag,setFlag] = useState(false);

    useEffect(() => {
        dispatch(fetchMyBag());
    }, [dispatch,flag]);

    if (myBag.length === 0) {
        return <div className = "empty-image-container">
            <img className="empty-image" src={emptyLogo} alt ="empty" />
        </div>
    }
    else if (filteredMyBag.length === 0) {
        return <div className = "empty-image-container">
            <img className="no-result-image" src={noResultLogo} alt ="noresult" />
        </div>
    }
    return (
        <div>
            {filteredMyBag.map((product, index) => {
                return <ProductBasket key={index} setFlag={setFlag} flag={flag} product={product}/>
            })}
        </div>
    )
}