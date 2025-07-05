import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../auth/auth'
import { login } from '../API/Identity'


const Login = () => {

    // const [token,setToken] = useState(''); 

    const navigate = useNavigate()

    const [token, setToken] = useState('');

    const initialState = { email: "", password: "" };

    const [userData, setUserData] = useState(initialState);

    const { email, password } = userData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(userData.email, userData.password, setToken);
    };



    useEffect(() => {

        setToken(checkToken());

        if (token) navigate("/dashboard/default");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);




    return (
        <>
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
                    <div className="text-center">
                        <img className="mb-2" src="/img/logo.png" alt="" width="120" height="120" />
                        <h1 className="h3 mb-5 fw-normal">Choose a new passwrod</h1>

                        <text className=" mt-5 reset-instruction">Create a new password that is at least 6 characters long. A strong password has a combination of letters, digits and punctuation marks.</text>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" onChange={handleInputChange} name="email" value={email} />
                        <label htmlFor="floatingInput">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" onChange={handleInputChange} name="password" value={password} />
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary frm-reset-btn" type="submit">
                        Continue
                    </button>
                    <p className="mt-5 mb-3 text-muted"></p>
                </form>
            </main>

            <style jsx="true">
                {`
                    .form-signin {
                            width: 100%;
                            max-width: 400px;
                            padding: 25px;
                            margin: 150px auto;
                            background-color: white;
                            border-radius: 5%;
                            align-text:right;
                    }

                    .form-signin .checkbox {
                        font-weight: 400;
                    }

                  
                    .frm-reset-btn{
                        background-image: linear-gradient(to right, #0046ad, #0057b9, #0068c4, #0078ce, #0088d6, #0088d6, #0088d6, #0088d6, #0078ce, #0068c4, #0057b9, #0046ad);
                        border-radius: 2.3rem;
                    }

                    .reset-instruction{
                        font-size : 14px;
                        text-align : left;
                    }

                    .form-signin .form-floating:focus-within {
                        z-index: 2;
                    }

                    .form-signin input[type="email"] {
                        margin-bottom: -1px;
                        border-bottom-right-radius: 0;
                        border-bottom-left-radius: 0;
                    }

                    .form-signin input[type="password"] {
                        margin-bottom: 10px;
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                    }
                `}
            </style>

        </>
    )
}

export default Login