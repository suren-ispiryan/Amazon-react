import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({client}) => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({});

    const handleChange = ({target}) => {
        setLoginInfo({
            ...loginInfo,
            [target.name]: target.value,
        })
    }

    const loginUser = () => {
        client.post('/login', { loginInfo })
            .then(function (response) {
                if(response.status === 200) {
                    localStorage.setItem('token', response.data);
                    navigate('/user-profile')
                }
            })
            .catch(function (error) {console.log('error login')});
    }

    return (
        <div className="login container-fluid">
            <div className="row">
                <div className="col-md-12 sign-parent">
                    <div className="sign-form">
                        <h2>Login</h2>

                        <input
                            type="email"
                            name="email"
                            className="form-control my-3"
                            placeholder="Email"
                            onChange={handleChange}
                            value={loginInfo.email || ''}
                        />

                        <input
                            type="password"
                            name="password"
                            className="form-control my-3"
                            placeholder="Password"
                            onChange={handleChange}
                            value={loginInfo.password || ''}
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

export default Login;
