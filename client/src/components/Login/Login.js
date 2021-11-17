import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, signInWithGoogle, isLoading, authError } = useAuth()

    const location = useLocation();
    const history = useHistory();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        e.preventDefault();
        loginUser(loginData.email, loginData.password, location, history);
        
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(false, location, history)
    }

    return (
        <div className="container">
            <div className="col-xl-6 col-md-8 col-sm-8 mx-auto">
                <div className="custom-container text-white p-5 my-5">
                    <h1 className="text-center mb-4">Login</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            className="form-control"
                            type="email"
                            placeholder="Your Email"
                            name="email"
                            onChange={handleOnChange} />

                        <br />

                        <input
                            className="form-control"
                            type="password"
                            placeholder="Your Password"
                            name="password"
                            onChange={handleOnChange} />

                        <br />

                        <button type="submit" className="btn bg-dark text-white form-control mb-2">
                            {isLoading ?
                                <div className="spinner-border" role="status"></div>
                                : <p>Login</p>
                            }
                        </button>
                        
                        <h6>New User? 
                            <Link
                                className="text-white"
                                style={{ textDecoration: 'none' }}
                                to="/register"> Register here 
                            </Link>
                        </h6>
                        {authError && <h6 className="text-danger">{authError}</h6>}
                    </form>

                    {/* <p className="text-center my-4">----- OR -----</p> */}

                    {/* <button className="form-control google-fb" onClick={handleGoogleSignIn}>Sign in with GOOGLE</button> */}
                    <br />
                </div>
            </div>
        </div>
    );
};

export default Login;