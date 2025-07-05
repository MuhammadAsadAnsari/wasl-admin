import React, {  useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { checkToken } from '../auth/auth'
import { findYourAccount } from '../API/Identity'

const Year = new Date().getFullYear()

const FindYourAccount = () => {

    // const navigate = useNavigate()

    const initialState = { email: "" };

    const [userData, setUserData] = useState(initialState);

    const { email } = userData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        findYourAccount(userData.email);
    };
    // useEffect(() => {

    //     setToken(checkToken());

    //     if (token) navigate("/dashboard");
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [token]);
    return (
        <>
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
                    <div className="text-center">
                        <img className="mb-2" src="/img/logo.png" alt="" width="120" height="120" />
                        <h4 className=" mb-3 ">Find Your Account</h4>
                        <text className="mb-4">Please enter your email address or mobile number to search for your account</text>
                    </div>

                    <div className="form-floating">
                        <input type="email" className="form-control mt-5 mb-3" onChange={handleInputChange} name="email" value={email} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">
                        Search
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
                        margin: auto;
                        background-color: white;
                        border-radius: 1%;
                    }

                    .form-signin .checkbox {
                        font-weight: 400;
                    }

                    .form-signin .form-floating:focus-within {
                        z-index: 2;
                    }

                    .form-signin input[type="email"] {
                        margin-bottom: -1px;
                        border-bottom-right-radius: 0;
                        border-bottom-left-radius: 0;
                    }

                    
                `}
            </style>

        </>
    )
}

export default FindYourAccount