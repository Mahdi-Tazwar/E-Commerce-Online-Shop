import axios from "axios";
import { useEffect, useState } from "react";
import handleAxiosError from "../../../utils/ErrorHandler";

const Order = () => {
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        axios.get('/api/product/get-orders')
        .then(response => setOrders(response.data.orders))
        .catch(handleAxiosError)
    },[])
    return (
        <>
        <table className="table">
            <thead>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Total Price</th>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>{order.orderStatus}</td>
                        <td>{order.totalPrice}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default Order;