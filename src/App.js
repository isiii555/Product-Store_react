import './App.css';
import Header from "./Components/Header";
import Content from "./Components/Content";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchProducts} from "./app/features/ProductsSlice";
import Admin from "./pages/Admin"
import Basket from "./pages/Basket";
import {Route, Routes} from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Orders from "./pages/Orders";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        let go = localStorage.getItem("man") ? "" : localStorage.setItem("man", 0);
        let go2 = localStorage.getItem("woman") ? "" : localStorage.setItem("woman", 0);
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route index={true} path="/" element={<Content/>}/>
                    <Route path="admin" element={<Admin/>}/>
                    <Route path="basket" element={<Basket/>}/>
                    <Route path="orders" element={<Orders/>}/>
                    <Route path="product/:id" element={<ProductPage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
