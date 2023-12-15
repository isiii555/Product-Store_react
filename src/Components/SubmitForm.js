import {useDispatch, useSelector, useStore} from "react-redux";
import {submitOrder} from "../app/features/ProductsSlice";
import {useEffect, useRef, useState} from "react";

export default function SubmitForm({setFlag, flag, setMessage}) {
    const {myBag} = useSelector((state) => state.ProductsReducer);

    const formRef = useRef();

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [adress, setAdress] = useState("");

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let totalAmount = 0
        for (const myBagElement of myBag) {
            totalAmount += (myBagElement.product_price * myBagElement.product_quantity);
        }
        setTotal(totalAmount);
    },[myBag])

    const submit = (e) => {
        e.preventDefault();
        let newOrder = {
            ordererName: name,
            ordererPhone: number,
            ordererAdress: adress,
            orders : [...myBag]
        }
        dispatch(submitOrder(newOrder));
        fetch("http://localhost:5000/clear-mybag", {
            method: "DELETE"
        })
            .then(res => res.text())
            .then(data => console.log(data))
            .then(() => setMessage(name))
            .then(() => formRef.current.reset())
            .then(() => setFlag(!flag));
    }

    return (
        <div className="submit-form">
            <form ref={formRef}>
                <label className="form-header">Placing an order</label>
                <input onChange={e => setName(e.target.value)} type="text" placeholder="Name Surname"/>
                <input onChange={e => setNumber(e.target.value)} type="text" placeholder="+994 70 726 00 43"/>
                <input onChange={e => setAdress(e.target.value)} type="text" placeholder="Adress"/>
                <label className="total">Total : <span>{total} AZN</span></label>
                <button disabled={!(name && adress && number && myBag.length)} onClick={submit}>Place an order</button>
            </form>
        </div>
    )
}