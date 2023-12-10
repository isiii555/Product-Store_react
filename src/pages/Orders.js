import {useEffect, useState} from "react";
import {FaEye} from "react-icons/fa";
export default function Orders() {

    const [orders, setOrders] = useState([]);

    const [orderIndex, setOrderIndex] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/orders")
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);
    return (
        <table>
            <thead>
            <tr style={{backgroundColor: "steelblue"}} className="table-head">
                <th>Order Id</th>
                <th>Name Surname</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Details</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order, index) => {
                let amount = 0;
                for (const orderElement of order.orders) {
                    amount += (orderElement.product_price * orderElement.product_quantity);
                }
                return (
                    <tr className="order" key={index}>
                        <td>{order.id}</td>
                        <td>{order.ordererName}</td>
                        <td>{order.ordererAdress}</td>
                        <td>{order.ordererPhone}</td>
                        <td>{amount} AZN</td>
                        <td className="order-details" onClick={() => setOrderIndex(index)}><FaEye/></td>
                        {index === orderIndex && <div>
                            {order.orders.map(prod => {
                                return <p>{prod.product_name}</p>
                            })}
                        </div>}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}