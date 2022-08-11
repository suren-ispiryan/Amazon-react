import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from './../config/axiosInstance';

const Register = () => {
    const navigate = useNavigate();
    const [registerInfo, setRegisterInfo] = useState({});

    const handleChange = ({target}) => {
        setRegisterInfo({
            ...registerInfo,
            [target.name]: target.value,
        })
    }

    const registerUser = () => {
        let guestCardProducts;
        guestCardProducts = JSON.parse(localStorage.getItem('addedToCart'))

        axiosInstance.post('/register', { registerInfo, guestCardProducts })
            .then(function (response) {
                if(response.status === 200) {
                    // navigate('/login')
                    localStorage.removeItem('addedToCart');
                }
            })
            .catch(function (error) {console.log(error)});
    }

    return (
        <div className="register">
            <div className="row">
                <div className="col-md-12 sign-parent">
                    <div className="sign-form">
                        <h2>Register</h2>

                        <input
                            type="text"
                            name="name"
                            className="form-control my-3"
                            placeholder="First Name"
                            onChange={handleChange}
                            value={registerInfo.name || ''}
                        />

                        <input
                            type="text"
                            name="surname"
                            className="form-control my-3"
                            placeholder="Last Name"
                            onChange={handleChange}
                            value={registerInfo.surname  || ''}
                        />

                        <input
                            type="email"
                            name="email"
                            className="form-control my-3"
                            placeholder="Email"
                            onChange={handleChange}
                            value={registerInfo.email  || ''}
                        />

                        <input
                            type="password"
                            name="password"
                            className="form-control my-3"
                            placeholder="Password"
                            onChange={handleChange}
                            value={registerInfo.password || ''}
                        />

                        <input
                            type="password"
                            name="confirmation"
                            className="form-control my-3"
                            placeholder="Re-enter password"
                            onChange={handleChange}
                            value={registerInfo.confirmation || ''}
                        />

                        <button
                            onClick={registerUser}
                            className="btn btn-primary my-3"
                        >
                            Register
                        </button>

                        <div>
                            <small>
                                Already registered?
                                <Link to="/login">Login</Link>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
