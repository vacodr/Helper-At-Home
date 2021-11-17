import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { SERVER_BASE_URL } from '../../App';

const Order = ({ order }) => {

    const { user } = useAuth()

    const [status, setStatus] = useState(order.status);

    const handleSelect = (status) => {
        fetch(SERVER_BASE_URL + '/updateOrder/' + order._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({status})
        }) 
            .then(res => res.json())
            .then(data => {
                setStatus(status)
            })
    }

    return (
        <tr>
            {
                user.role == "customer" ? <td>{order.workerName}</td> :
                <td>{order.customerName}</td>
            }
            <td className="pt-3">{order.category}</td>
            {
                user.role == "customer" ? <td>{order.workerMobile}</td> :
                    <td>{order.customerMobile}</td>
            }
            
            {
                user.role == "customer" ? <td>{order.status}</td> :
                    <td>
                        <DropdownButton variant="secondary" id="dropdown-basic-button" onSelect={handleSelect} title={status}>
                            <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
                            <Dropdown.Item eventKey="On going">On going</Dropdown.Item>
                            <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
                        </DropdownButton>
                    </td>
            }

        </tr>
    );
};

export default Order;