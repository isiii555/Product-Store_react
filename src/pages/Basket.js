import Products from "../Components/Products";
import SubmitForm from "../Components/SubmitForm";

export default function Basket() {
    return (
        <div className="basket-container">
            <Products/>
            <SubmitForm/>
        </div>
    )
}