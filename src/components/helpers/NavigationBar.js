import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosInstance';

const NavigationBar = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState();

    useEffect(() => {
        axiosInstance.get('/get-auth-user-role')
                     .then(function (response) {
                         setRole(response.data)
                     })
                     .catch(function (error) {});
    }, [])

    const logoutUser = () => {
        axiosInstance.get('/logout')
             .then(function (response) {
                 localStorage.removeItem('token');
                 if (role !== 'superAdmin' && role !== 'admin') {
                     navigate('/login')
                 }  else {
                     navigate('/login-admin')
                 }
            })
            .catch(function (error) {console.log(error)});
    }

    //active nav links
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    return (
        <div className="all-products container-fluid">
            <div className="row">
                <nav className="px-5 navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="col-lg-2 col-sm-12">
                        <a className="navbar-brand" href="/">Amazon</a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                    </div>

                    <div className="col-lg-9 col-sm-12">
                        <div className="mx-5 collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {(role !== 'superAdmin' && role !== 'admin')
                                ?
                                <li className={splitLocation[1] === "" ? "nav-item active" : "nav-item"}>
                                    <Link className="nav-link" to="/">All products</Link>
                                </li>
                                :
                                    ''
                                }
                                {localStorage.getItem('token')
                                ?
                                    (role !== 'superAdmin' && role !== 'admin')
                                    ?
                                        // user
                                        <>
                                            <li className={splitLocation[1] === "user-profile" ? "nav-item active" : "nav-item"}>
                                                <Link className="nav-link" to="user-profile">Profile</Link>
                                            </li>
                                            <li className={splitLocation[1] === "my-store" ? "nav-item active" : "nav-item"}>
                                                <Link className="nav-link" to="my-store">My store</Link>
                                            </li>
                                            <li className={splitLocation[1] === "saved-for-later" ? "nav-item active" : "nav-item"}>
                                                <Link className="nav-link" to="saved-for-later">Saved for later</Link>
                                            </li>
                                            <li className={splitLocation[1] === "my-cart" ? "nav-item active" : "nav-item"}>
                                                <Link className="nav-link" to="my-cart">My cart</Link>
                                            </li>
                                            <li className={splitLocation[1] === "orders" ? "nav-item active" : "nav-item"}>
                                                <Link className="nav-link" to="/orders">My orders</Link>
                                            </li>
                                            <li className={splitLocation[1] === "chat" ? "nav-item active" : "nav-item"}>
                                                <Link className="nav-link" to="/chat">Chat</Link>
                                            </li>
                                        </>
                                    :
                                        // admin
                                        <>
                                            <li className={splitLocation[1] === "admin-dashboard" ? "nav-item active" : "nav-item"}>
                                                <Link className="nav-link" to="/admin-dashboard">Products</Link>
                                            </li>
                                            <li className={splitLocation[1] === "admin-product-ordered" ? "nav-item active" : "nav-item"}>
                                                <Link className="nav-link" to="/admin-product-ordered">Orders</Link>
                                            </li>
                                            <li className={splitLocation[1] === "admin-users" ? "nav-item active" : "nav-item"}>
                                                <Link className="nav-link" to="/admin-users">Users</Link>
                                            </li>
                                            <li className={splitLocation[1] === "admin-product-categories" ? "nav-item active" : "nav-item"}>
                                                <Link className="nav-link" to="/admin-product-categories">Set categories</Link>
                                            </li>
                                        </>
                                :
                                    // guest
                                    <>
                                        <li className={splitLocation[1] === "guest-cart" ? "nav-item active" : "nav-item"}>
                                            <Link className="nav-link" to="guest-cart">Guest-Cart</Link>
                                        </li>
                                        <li className={splitLocation[1] === "guest-saved-for-later" ? "nav-item active" : "nav-item"}>
                                            <Link className="nav-link" to="guest-saved-for-later">Saved-For-Later</Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-1 col-sm-12">
                        {localStorage.getItem('token')
                        ?
                            <button
                                onClick={logoutUser}
                                className="btn btn-danger"
                            >
                                Logout
                            </button>
                        :
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        }
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default NavigationBar;
