import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [orderIndex, setOrderIndex] = useState(false);

    useEffect(() => {
        fetch(`${apiUrl}/orders`)
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, []);

    return (
        <div className="orders-container">
            <table>
                <thead>
                    <tr style={{ backgroundColor: "steelblue" }} className="table-head">
                        <th>Order Id</th>
                        <th>Name Surname</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Amount</th>
                        <th>Details</th>
                        <th style={{ display: orderIndex !== false ? "table-cell" : "none" }}>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => {
                        let amount = 0;
                        for (const orderElement of order.orders) {
                            amount += orderElement.product_price * orderElement.product_quantity;
                        }
                        return (
                            <tr className="order" key={index}>
                                <td>{order.id}</td>
                                <td>{order.ordererName}</td>
                                <td>{order.ordererAdress}</td>
                                <td>{order.ordererPhone}</td>
                                <td>{amount} AZN</td>
                                <td
                                    className="order-details"
                                    onClick={() => {
                                        if (orderIndex === index) {
                                            if (orderIndex !== false)
                                                setOrderIndex(false);
                                        } else
                                            setOrderIndex(index);
                                    }}
                                >
                                    <FaEye />
                                </td>
                                {index === orderIndex && (
                                    <td>
                                        {order.orders.map((prod, index) => {
                                            return <p style={{ whiteSpace: "nowrap" }}>{index + 1}.{prod.product_name} x {prod.product_quantity}</p>;
                                        })}
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
