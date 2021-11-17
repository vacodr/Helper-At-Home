import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css';

const Register = () => {
    const [loginData, setLoginData] = useState({});
    const { user, registerUser, signInWithGoogle, isLoading, authError, setAuthError, signInWithFacebook } = useAuth()
    const [role, setRole] = useState("Select one");
    const [inputService, setInputService] = useState("Select the service that you will provide")
    const [formMobileNumber, setFormMobileNumber] = useState("")

    console.log(loginData)

    const [isForm, setIsForm] = useState(false)

    const location = useLocation();
    const history = useHistory();

    const handleOnChange = e => {
        const field = e.target.name;
        let value = e.target.value;

        if(field == "mobileNumber") {
            let newValue;
            if(value.length > 10) {
                newValue = value.substring(0, 10)
                value = newValue
            } else if(value == "0") {
                newValue = ""
                value = newValue
            } 
            
            setFormMobileNumber(value)
        }
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleRegisterSubmit = e => {
        e.preventDefault();

        if (loginData.email && loginData.password && loginData.name && role != "Select one") {
            if (loginData.password == loginData.confirmPassword) {
                registerUser(loginData.email, loginData.password, loginData.name, role, loginData.service, loginData.cost, loginData.experience, loginData.mobileNumber, loginData.address, location, history);
            } else {
                setAuthError("Your password and confirm password should be matched")
            }
        } else {
            setAuthError("Fill up all fields")
        }

    }

    const handleGoogleSignIn = () => {
        if (role != "Select one") {
            signInWithGoogle(true, location, history, role)
        } else {
            alert("Select what is your role.")
        }

    }

    const addService = (service) => {
        setInputService(service)
        const newLoginData = { ...loginData };
        newLoginData["service"] = service;
        setLoginData(newLoginData);
    }

    console.log(loginData)

    return (
        <div>
            {
                isForm ?
                    <div className="container">
                        <div className="col-xl-6 col-md-8 col-sm-8 mx-auto">
                            <div className="custom-container text-white p-5 my-5">
                                <h1 className="text-center mb-4">Register</h1>
                                <form onSubmit={handleRegisterSubmit}>

                                    <div className="d-flex justify-content-center">
                                        <h4 className="d-inline mr-2">I am a {role}</h4>
                                    </div>

                                    <br />
                                    <input
                                        className="form-control"
                                        placeholder="Your Name"
                                        name="name"
                                        onChange={handleOnChange} />

                                    <br />

                                    {
                                        role == "worker" &&

                                        <div>
                                            {/* <input
                                                className="form-control"
                                                placeholder="Your Service"
                                                name="service"
                                                onChange={handleOnChange} /> */}

                                            <DropdownButton onSelect={addService} id="dropdown-basic-button" variant="secondary" title={inputService}>
                                                <Dropdown.Item eventKey="Carpenter">Carpenter</Dropdown.Item>
                                                <Dropdown.Item eventKey="Maid">Maid</Dropdown.Item>
                                                <Dropdown.Item eventKey="Cook">Cook</Dropdown.Item>
                                                <Dropdown.Item eventKey="Plumber">Plumber</Dropdown.Item>
                                                <Dropdown.Item eventKey="Maid">Maid</Dropdown.Item>
                                                <Dropdown.Item eventKey="Construction">Construction</Dropdown.Item>
                                                <Dropdown.Item eventKey="Electrician">Electrician</Dropdown.Item>
                                                <Dropdown.Item eventKey="Mechanic">Mechanic</Dropdown.Item>
                                                <Dropdown.Item eventKey="Mason">Mason</Dropdown.Item>
                                            </DropdownButton>

                                            <br />

                                            <input
                                                className="form-control"
                                                type="number"
                                                placeholder="Your hourly rate"
                                                name="cost"
                                                onChange={handleOnChange} />

                                            <br />

                                            <input
                                                className="form-control"
                                                placeholder="Your Experience (year)"
                                                name="experience"
                                                type="number"
                                                onChange={handleOnChange} />

                                            <br />
                                        </div>
                                    }

                                    <input
                                        value={formMobileNumber}
                                        className="form-control"
                                        placeholder="Your Contact no."
                                        type="number"
                                        name="mobileNumber"
                                        onChange={handleOnChange} />

                                    <br />

                                    <textarea
                                        rows="3"
                                        className="form-control"
                                        placeholder="Your address"
                                        name="address"
                                        onChange={handleOnChange} />

                                    <br />

                                    <input
                                        className="form-control"
                                        placeholder="Your Email"
                                        type="email"
                                        name="email"
                                        onChange={handleOnChange} />

                                    <br />

                                    <input
                                        className="form-control"
                                        placeholder="Your Password"
                                        name="password"
                                        type="password"
                                        onChange={handleOnChange} />

                                    <br />

                                    <input
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        onChange={handleOnChange} />

                                    <br />

                                    <button type="submit" className="btn bg-dark text-white form-control mb-2">
                                        {isLoading ?
                                            <div className="spinner-border" role="status"></div>
                                            : <p>Register</p>

                                        }
                                    </button>

                                    <h6>Already registered?
                                        <Link
                                            className="text-white"
                                            style={{ textDecoration: 'none' }}
                                            to="/login"> Login here
                                        </Link>
                                    </h6>
                                    {authError && <h6 className="text-danger">{authError}</h6>}
                                </form>

                                {/* <p className="text-center my-4">----- OR -----</p> */}

                                {/* <button className="form-control google-fb" onClick={handleGoogleSignIn}>Register with GOOGLE</button> */}

                            </div>
                        </div>
                    </div>
                    :
                    <div className="d-flex justify-content-center align-items-center role-box">
                        <div className="text-center">
                            <h1>Registration</h1>
                            <h1 className="mb-4">What is your role?</h1>
                            <button
                                onClick={() => {
                                    setIsForm(true)
                                    setRole("customer")
                                }}
                                className="blank-btn mr-3"
                            >
                                Customer
                            </button>
                            <button
                                onClick={() => {
                                    setIsForm(true)
                                    setRole("worker")
                                }}
                                className="blank-btn"
                            >
                                Worker
                            </button>
                        </div>
                    </div>
            }
        </div>

    );
};

export default Register;