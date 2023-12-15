import Products from "../Components/Products";
import SubmitForm from "../Components/SubmitForm";
import {useEffect, useLayoutEffect, useState} from "react";
import {fetchMyBag, sortBag, searchMyBag, fetchMyBagSearch} from "../app/features/ProductsSlice";
import {useDispatch, useSelector} from "react-redux";
import {FaSort,FaSearch} from "react-icons/fa";

export default function Basket() {
    const [flag, setFlag] = useState(false);
    const {myBag} = useSelector(state => state.ProductsReducer);
    const [filteredProducts,setFilteredProducts] = useState(myBag);
    const dispatch = useDispatch();
    const [message, setMessage] = useState(false);
    const [search,setSearch] = useState("");

    useEffect(() => {
        if (message) {
            const time = setTimeout(() => setMessage(false), 2000);
            return (() => clearTimeout(time));
        }
    }, [message]);

    useEffect(() => {
        dispatch(fetchMyBag());
        search ? setFilteredProducts(myBag.filter(prod => prod.product_name.toLocaleLowerCase(("AZ")).startsWith(search.toLocaleLowerCase("AZ")))) : setFilteredProducts(myBag);
    },[search,flag]);

    useLayoutEffect(() => {
        dispatch(fetchMyBag());
        setFilteredProducts(myBag);
    }, [dispatch, flag]);

    function sortProductsCmp() {
        dispatch(sortBag());
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
                        <input onChange={e => setSearch(e.target.value)} placeholder='Search...' className='js-search' type="text"/>
                        <FaSearch/>
                    </div>
                    <p>Count</p>
                </div>
                <Products filteredProducts = {filteredProducts} />
            </div>
            <SubmitForm setMessage={setMessage} setFlag={setFlag} flag={flag}/>
            {message &&
                <div className="message">
                    Order is placed, {message}! Thanks for all!
                </div>}
        </div>
)
}