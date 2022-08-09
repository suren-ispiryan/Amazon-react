import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance';

const LoginAdmin = () => {
    const navigate = useNavigate();
    const [loginAdminInfo, setLoginAdminInfo] = useState({});

    const handleChange = ({target}) => {
        setLoginAdminInfo({
            ...loginAdminInfo,
            [target.name]: target.value,
        })
    }

    const loginUser = () => {
        axiosInstance.post('/login-admin', { loginAdminInfo })
            .then(function (response) {
                if(response.status === 200 && response.data !== 'failure') {
                    localStorage.setItem('token', response.data);
                    navigate('/admin-dashboard')
                    window.location.reload()
                }
            })
            .catch(function (error) {console.log('error login')});
    }

    return (
        <div className="login container-fluid">
            <div className="row">
                <div className="col-md-12 sign-parent">
                    <div className="sign-form">
                        <h2>Admin login</h2>

                        <input
                            type="email"
                            name="email"
                            className="form-control my-3"
                            placeholder="Email"
                            onChange={handleChange}
                            value={loginAdminInfo.email || ''}
                        />

                        <input
                            type="password"
                            name="password"
                            className="form-control my-3"
                            placeholder="Password"
                            onChange={handleChange}
                            value={loginAdminInfo.password || ''}
                        />

                        <button
                            onClick={loginUser}
                            className="btn btn-primary my-3"
                        >
                            Login
                        </button>

                        <div>
                            <small>
                                Not registered yet?
                                <Link to="/register">Register</Link>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginAdmin;
