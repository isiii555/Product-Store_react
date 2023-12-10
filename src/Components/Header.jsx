import {NavLink, Outlet, Route, Routes} from "react-router-dom";
import App from "../App";

export default function Header() {
    return (
        <>
            <div className="header">
                <NavLink to="/" className="logo">Interior.</NavLink>
                <div className="actions">
                    <NavLink to="/admin">Admin</NavLink>
                    <NavLink to="/basket">Basket</NavLink>
                    <NavLink to="/orders">My Orders</NavLink>
                </div>
            </div>
            <Outlet/>
        </>
    )
}