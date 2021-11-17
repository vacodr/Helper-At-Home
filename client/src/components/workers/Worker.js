import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { SERVER_BASE_URL } from '../../App';
import useAuth from '../../hooks/useAuth';
import './worker.css';

const Worker = ({ worker }) => {

    const { user } = useAuth();

    const { _id, name, email, photoURL, service, cost, experience, address, mobileNumber } = worker;

    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleDetailsModalClose = () => setShowDetailsModal(false);
    const handleDetailsModalShow = () => setShowDetailsModal(true);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSuccessModalClose = () => setShowSuccessModal(false);
    const handleSuccessModalShow = () => setShowSuccessModal(true);

    const handlePlaceOrder = () => {
        handleDetailsModalClose()
        console.log("mobile", user.mobileNumber, mobileNumber)
        fetch(SERVER_BASE_URL + '/addOrder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                customerId: user.id,
                workerId: _id, 
                customerName: user.displayName, 
                workerName: name, 
                workerMobile: mobileNumber, 
                customerMobile: user.mobileNumber, 
                category: service, 
                status: "Pending"
            })
        })
            .then(res => handleSuccessModalShow())
            .catch(err => console.log(err))
    }

    return (
        <div className="col-12">
            <div className="worker-box">
                <div className="row">
                    <div className="col-md-3">
                        <img src={photoURL || "https://i.ibb.co/xsF142p/Frame.png"} alt="" />
                    </div>
                    <div className="col-md-3">
                        <p>Name: {name}</p>
                        <p>Category: {service}</p>
                        <p>Estimate charge: ${cost}/hr</p>
                    </div>
                    <div className="col-md-3">
                        <p>Experience: {experience} years</p>
                        <p>Address: {address}</p>
                        <p>Mobile number: {mobileNumber}</p>

                    </div>
                    <div className="col-md-3 d-flex align-items-center">
                        <button onClick={handleDetailsModalShow} className="custom-btn">Book Service</button>
                    </div>
                </div>
            </div>
            <Modal show={showDetailsModal} onHide={handleDetailsModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Book a service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Name: {name}</p>
                    <p>Category: {service}</p>
                    <p>Estimate charge: ${cost}/hr</p>
                    <p>Experience: {experience} years</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="blank-btn" onClick={handleDetailsModalClose}>
                        Cancel
                    </button>
                    <button className="custom-btn" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                <Modal.Body>
                    <h3>Your order has been successfully placed.</h3>
                    <h4>You can see the progress of your order in your profile page</h4>
                </Modal.Body>
                <Modal.Footer>
                    <button className="custom-btn" onClick={handleSuccessModalClose}>
                        OK
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Worker;