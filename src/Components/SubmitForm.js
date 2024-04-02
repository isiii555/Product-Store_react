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
    const [numberTrue,setNumberTrue] = useState(false);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const phoneNumberRegex = /^(?:\+994|994|0)(50|51|55|60|70|77|99)[1-9]\d{6}$/;
        if (phoneNumberRegex.test(number.replace(/\s/g, ''))) {
            console.log(true);
            setNumberTrue(true);
        }
        else
            setNumberTrue(false);
    },[number])

    useEffect(() => {
        let totalAmount = 0;
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
        fetch("https://product-store-server-weld.vercel.app/clear-mybag", {
            method: "DELETE"
        })
            .then(res => res.text())
            .then(data => console.log(data))
            .then(() => setMessage(name))
            .then(() => formRef.current.reset())
            .then(() => {
                setNumberTrue(false);
                setName("");
                setAdress("");
                setFlag(!flag)});
    }

    return (
        <div className="submit-form">
            <form ref={formRef}>
                <label className="form-header">Placing an order</label>
                <input style={name ? {borderBottom : "2px solid green"} : {borderBottom : ""}} onChange={e => setName(e.target.value)} type="text" placeholder="Name Surname"/>
                <input style={numberTrue ? {borderBottom : "2px solid green"} : {borderBottom : ""}} onChange={e => setNumber(e.target.value)} title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters" type="text" pattern="^(?:\+994|994|0)(50|51|55|60|70|77|99)[1-9]\d{6}$" placeholder="+994 70 726 00 43"/>
                <input style={adress ? {borderBottom : "2px solid green"} : {borderBottom : ""}} onChange={e => setAdress(e.target.value)} type="text" placeholder="Adress"/>
                <label className="total">Total : <span>{total} AZN</span></label>
                <button disabled={!(name && adress && numberTrue && myBag.length)} onClick={submit}>Place an order</button>
            </form>
        </div>
    )
}
