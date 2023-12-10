import Products from "../Components/Products";
import SubmitForm from "../Components/SubmitForm";
import {useEffect, useLayoutEffect, useState} from "react";
import {fetchMyBag, sortBag, searchMyBag, fetchMyBagSearch} from "../app/features/ProductsSlice";
import {useDispatch} from "react-redux";
import {FaSort,FaSearch} from "react-icons/fa";

export default function Basket() {
    const [flag, setFlag] = useState(false);
    const dispatch = useDispatch();
    const [message, setMessage] = useState(false);

    useEffect(() => {
        if (message) {
            const time = setTimeout(() => setMessage(false), 2000);
            return (() => clearTimeout(time));
        }
    }, [message]);

    useLayoutEffect(() => {
        dispatch(fetchMyBag());
    }, [dispatch, flag])

    function sortProductsCmp() {
        dispatch(sortBag());
    }

    function searchBag(e) {
        console.log(e.target.value);
        e.target.value ? dispatch(fetchMyBagSearch(e.target.value)) : dispatch(fetchMyBag());
    }

    return (
        <div className="basket-container">

            <div className="products-container">
                <div className="products-header">
                    <p>Product</p>
                    <button onClick={sortProductsCmp} className="basket-sort">
                        Sort products
                        <FaSort/>
                    </button>
                    <div className="search-container">
                        <input onChange={searchBag} placeholder='Search...' className='js-search' type="text"/>
                        <FaSearch/>
                    </div>
                    <p>Count</p>
                </div>
                <Products/>
            </div>
            <SubmitForm setMessage={setMessage} setFlag={setFlag} flag={flag}/>
            {message &&
                <div className="message">
                    Order is placed, {message}! Thanks for all!
                </div>}
        </div>
)
}