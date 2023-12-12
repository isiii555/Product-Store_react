import { Outlet,NavLink } from "react-router-dom";
import Products from "../Components/Products";
import SubmitForm from "../Components/SubmitForm";

export default function Basket() {
    return (
        <>
            <div className="admin-container">
                <Outlet/>
                <div className="admin-navbar">
                    <NavLink to="orders">My Orders</NavLink>
                    <NavLink to="add-product">Add Product</NavLink>
                    <NavLink to="/admin">Products</NavLink>
                </div>  
            </div>
        </>
    )
}