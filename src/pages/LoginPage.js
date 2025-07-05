import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../auth/auth'
import { login } from '../Services/Identity'
import { NavLink } from 'react-router-dom'
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input, Modal, Form, TreeSelect, Space, Spin, message, Select } from 'antd';
import { messaging } from '../firebase';

const Year = new Date().getFullYear()

const Login = () => {

    // const [token,setToken] = useState(''); 

    const navigate = useNavigate()

    const [token, setToken] = useState('');

    const initialState = { user_name: "", password: "" };

    const [userData, setUserData] = useState(initialState);

    const { user_name, password } = userData;

    const [messageApi, contextHolder] = message.useMessage();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const clientToken = localStorage.getItem("wasl_client_token");
        let login_response = await login(userData.user_name, userData.password, clientToken)
        if(login_response.token){
         
            // const token = await messaging.getToken();
            // console.log("Firebase token:", token);

            localStorage.setItem('wasl_token', login_response.token.access_token);
            localStorage.setItem('wasl_admin',login_response._id);
            setToken(login_response.token.access_token);
            navigate("/");
        }else{
            toast.error("something went wrong.");
        }
      
    };


    // useEffect(() => {

    //     setToken(checkToken());
    //     if (token) navigate("/");
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [token]);

    return (
        <>
            <main className="form-signin">
            <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div className="text-center logo_area">
                    {/* wasl_logo.png */}
                        <img className="mb-2" src="/img/" alt="Company logo" width="350" height="140" />
                    </div>

                    <div className="form-floating">
                        <input type="text" className="form-control mb-3" onChange={handleInputChange} name="user_name" value={user_name} />
                        <label htmlFor="floatingInput">User Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" onChange={handleInputChange} name="password" value={password} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        {/* <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label> */}
                    </div>
                    <button className="w-100 btn btn-lg btn-primary frm-login-btn" type="submit">
                        Sign in
                    </button>
                </form>

            </main>


            <style jsx="true">
                {`
                    
                    .form-signin {
                        width: 100%;
                        max-width: 450px;
                        padding: 25px;
                        margin: 150px auto;
                        background-color: white;
                        border-radius: 5%;
                        align-text:right;
                      
                    }

                    .forget-pass{
                        font-size : 12px;
                        text-align : center;
                    }

                    .form-signin .checkbox {
                        font-weight: 400;
                    }

                    .form-signin .form-floating:focus-within {
                        z-index: 2;
                    }

                    .forgot-link {
                    
                        align-item:center;
                        margin-bottom: 1.5rem;
                        transition: 0.3s;
                        color:rgb(30,144,255)
                      }
                      
                      .forgot-link:hover {
                        color: rgb(30,144,255)
                      }
                      .form-signin input{
                        border-radius:10px;
                      }
                `}
            </style>

        </>
    )
}

export default Login