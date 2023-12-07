import Products from "../Components/Products";
import SubmitForm from "../Components/SubmitForm";

export default function Basket() {
    return (
        <div className="basket-container">
            <div className="products-container">
                <div className="products-header">
                    <p>Product</p>
                    <p>Count</p>
                </div>
                <Products/>
            </div>
            <SubmitForm/>
        </div>
    )
}