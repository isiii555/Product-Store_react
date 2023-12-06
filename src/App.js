import './App.css';
import Header from "./Components/Header";
import Content from "./Components/Content";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchProducts} from "./app/features/ProductsSlice";
import Admin from "./pages/Admin"
import Basket from "./pages/Basket";
import {Route, Routes} from "react-router-dom";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <>
            <Routes>
                <Route path = "/" element={<Header/>}>
                    <Route index={true} path="/" element={<Content/>}/>
                    <Route path="admin" element={<Admin/>}/>
                    <Route path="basket" element={<Basket/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
