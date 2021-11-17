import React, { useEffect, useState } from 'react';
import { SERVER_BASE_URL } from '../../App';
import useAuth from '../../hooks/useAuth';
import Order from './Order';

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const {user} = useAuth()

    useEffect(() => {
		let role;
		if (user.role == 'worker') {
			role = "Worker"
		} else {
			role = "Customer"
		}
		fetch(SERVER_BASE_URL + "/orderFor" + role + "/" + user.id)
			.then(res => res.json())
			.then(data => setOrders(data.orders))
	}, [])

    return (
        <table className="table">
            <thead className="bg-dark text-white">
                <tr>
                    <td>{user.role == "customer" ? "Worker Name" : "Customer Name"}</td>
                    <td>Category</td>
                    <td>Mobile number</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map(order => <Order key={order._id} order={order} />)
                }
            </tbody>
        </table>
    );
};

export default Orders;