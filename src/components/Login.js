// login redux start
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_USER_REQUEST } from '../redux/login/actions';
// login redux end
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const {login, loading} = useSelector((state) => state.login)
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({});

    const handleChange = ({target}) => {
        setLoginInfo({
            ...loginInfo,
            [target.name]: target.value,
        })
    }

    const loginUser = () => {
        dispatch({
            type: LOGIN_USER_REQUEST,
            payload: loginInfo
        })
    }

    useEffect(() => {
        if(loading === true) {
            localStorage.setItem('token', login);
            navigate('/user-profile')
            window.location.reload()
        }
    }, [loading])

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
