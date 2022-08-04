import { Link, useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";

const NavigationBar = ({client}) => {
    const navigate = useNavigate();
    const [role, setRole] = useState();

    useEffect(() => {
        client.get('/get-auth-user-role')
              .then(function (response) {setRole(response.data)})
              .catch(function (error) {console.log(error)});
     }, [])

    const logoutUser = () => {
        client.get('/logout')
             .then(function (response) {
                 localStorage.removeItem('token');
                 navigate('/login-admin')
            })
            .catch(function (error) {console.log(error)});
    }

    return (
        <div className="all-products container-fluid">
            <div className="row">
                <nav className="px-5 navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="col-md-2">
                        <a className="navbar-brand" href="/">Amazon</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>

                    <div className="col-md-9">
                        <div className="mx-5 collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {(role !== 'superAdmin' && role !== 'admin')
                                ?
                                <li className="nav-item active">
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
                                            <li className="nav-item active">
                                                <Link className="nav-link" to="user-profile">Profile</Link>
                                            </li>

                                            <li className="nav-item active">
                                                <Link className="nav-link" to="my-store">My store</Link>
                                            </li>
                                            <li className="nav-item active">
                                                <Link className="nav-link" to="my-cart">My cart</Link>
                                            </li>
                                            <li className="nav-item active">
                                                <Link className="nav-link" to="/orders">My orders</Link>
                                            </li>
                                        </>
                                    :
                                        // admin
                                        <>
                                            <li className="nav-item active">
                                                <Link className="nav-link" to="/admin-dashboard">Dashboard</Link>
                                            </li>
                                        </>
                                :
                                    // guest
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="guest-cart">GuestCart</Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-1">
                        {localStorage.getItem('token')
                        ?
                            <button
                                onClick={logoutUser}
                                className="btn btn-danger"
                            >
                                Logout
                            </button>
                        :
                            <Link className="nav-link" to="/login">Login</Link>
                        }
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default NavigationBar;
