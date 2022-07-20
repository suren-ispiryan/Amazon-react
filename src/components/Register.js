import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({client}) => {
    const navigate = useNavigate();
    const [registerInfo, setRegisterInfo] = useState({});
    const [userData, setUserData] = useState({});

    const handleChange = ({target}) => {
        setRegisterInfo({
            ...registerInfo,
            [target.name]: target.value,
        })
    }

    const registerUser = () => {
        setUserData({...registerInfo});
        client.post('/register', { userData })
            .then(function (response) {
                if(response.status === 200) {
                    navigate('/login')
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
