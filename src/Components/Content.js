import {useDispatch, useSelector} from "react-redux";
import {FaSearch, FaSort} from "react-icons/fa";
import {sortProducts} from "../app/features/ProductsSlice";
import Product from "./Product";
import {useEffect, useState} from "react";

export default function Content() {

    const dispatch = useDispatch()

    let {products} = useSelector(state => state.ProductsReducer);

    const [showMessage, setShowMessage] = useState(false);
    const [searchText,setSearchText] = useState(false);
    const [filteredProducts,setFilteredProducts] = useState([...products]);
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

    useEffect(() => {
        searchText ? setFilteredProducts(products.filter(prod => prod.product_name.toLocaleLowerCase("AZ").startsWith(searchText.toLocaleLowerCase("AZ")))) : setFilteredProducts([...products]);
        console.log(filteredProducts);
    }, [searchText,products]);

    return (
        <>
        <div className="content-container">
            <div className="content-header">
                <button onClick={sortProductsCmp} className="sort-button">
                    Sort products
                    <FaSort/>
                </button>
                <div className="search-container">
                    <input onChange={e => setSearchText(e.target.value)} placeholder='Search...' className='js-search'
                           type="text"/>
                    <FaSearch/>
                </div>
            </div>
            <div className="content">
                {filteredProducts.map((product,index) => {
                    return <Product setShowMessage = {setShowMessage} showMessage = {showMessage} key = {index} product={product}/>
                })}
            </div>
        </div>
        </>
    )
}