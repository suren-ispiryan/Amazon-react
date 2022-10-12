import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../helpers/LoadingSpinner';
import {
    GET_ALL_USERS_REQUEST,
    DELETE_USER_REQUEST,
    UPDATE_USER_REQUEST
} from '../../redux/adminUsers/actions';
import {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import uuid from 'react-uuid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Pagination from "../helpers/Pagination";

const updateInitialValues = {
    name: '',
    surname: '',
    email: '',
    role: ''
}

const AdminUsers = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const { adminUsers, loading, message } = useSelector((state) => state.adminUsers);
    const [show, setShow] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(updateInitialValues);
    const [id, setId] = useState();
    const [formErrors, setFormErrors] = useState({})
// Pagination Posts
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        dispatch({
            type: GET_ALL_USERS_REQUEST
        })
    }, [dispatch])

    useEffect(() => {
        if (!loading) {
            setUsers(adminUsers)
        }
    }, [loading, adminUsers])

    const changeUserData = (target, item, id) => {
        setId(id)
        setUpdatedUser({
            name: item.name,
            surname: item.surname,
            email: item.email,
            role: item.role
        })
        setShow(true)
    }

    const handleChangeUpdateUserData = ({target}) => {
        setUpdatedUser({
            ...updatedUser,
            [target.name]: target.value,
        })
    }

    const update = () => {
        setFormErrors(validate(updatedUser))
        if (Object.keys(validate(updatedUser)).length === 0) {
            let data = {
                id: id,
                name: updatedUser.name,
                surname: updatedUser.surname,
                email: updatedUser.email,
                role: updatedUser.role
            }
            dispatch({
                type: UPDATE_USER_REQUEST,
                payload: data
            })
            setShow(false)
        }
    }
    //validation errors
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}/i;
        if (values.name.length < 2 || values.name.length > 15) {
            errors.name = 'name must be min 2, max 15 symbols';
        }
        if (values.surname.length < 2 || values.name.length > 15) {
            errors.surname = 'surname must be min 2, max 15 symbols';
        }
        if (!regex.test(values.email)) {
            errors.email = 'email in invalid';
        }
        return errors;
    }

    const handleClose = () => {
        setShow(false)
        setUpdatedUser(updateInitialValues)
    }

    const deleteUser = (target, id) => {
        dispatch({
            type: DELETE_USER_REQUEST,
            payload: id
        })
    }
//pagination
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <div className="m-3">
                <h4 className="mt-5 mb-4">Orders</h4>

                {loading
                    ?
                        <LoadingSpinner/>
                    :
                    (<>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Modify</th>
                            </tr>
                            </thead>
                            <tbody>
                                {currentPosts.length ?
                                    (currentPosts.map((item, index) => {
                                        return (
                                            <tr key={uuid()}>
                                                <th className="pt-4">{index + 1}</th>
                                                <th className="pt-4"><h6>{item.name}</h6></th>
                                                <th className="pt-4"><h6>{item.surname}</h6></th>
                                                <th className="pt-4"><h6>{item.email}</h6></th>
                                                <th className="pt-4"><h6>{item.role}</h6></th>
                                                <th className="pt-4 d-flex justify-content-around">
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={event => changeUserData(event, item, item.id)}
                                                    >
                                                        Change
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={event => deleteUser(event, item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </th>
                                            </tr>
                                        )
                                    })
                                    ) : (
                                        <tr>
                                            <td>
                                                <h4 className="text-danger mt-5">
                                                    {message}
                                                </h4>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                        {/*Pagination*/}
                        <Pagination
                            allUsersProducts={users}
                            postsPerPage={postsPerPage}
                            paginate={paginate}
                        />
                    </>)
                }
            </div>

            {/* modal for update */}
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update user data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!updatedUser
                        ?
                        <LoadingSpinner /> :
                        (<>
                                <label htmlFor="name" className="labels">Name</label>
                                <h6 className="errors text-danger labels">{formErrors.name}</h6>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="form-control my-3"
                                    placeholder="Name"
                                    onChange={handleChangeUpdateUserData}
                                    value={updatedUser.name}
                                />
                                <label htmlFor="surname" className="labels">Surname</label>
                                <h6 className="errors text-danger labels">{formErrors.surname}</h6>
                                <input
                                    id="surname"
                                    type="text"
                                    name="surname"
                                    className="form-control my-3"
                                    placeholder="Surname"
                                    onChange={handleChangeUpdateUserData}
                                    value={updatedUser.surname}
                                />
                                <label htmlFor="email" className="labels">Email</label>
                                <h6 className="errors text-danger labels">{formErrors.email}</h6>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="form-control my-3"
                                    placeholder="Email"
                                    onChange={handleChangeUpdateUserData}
                                    value={updatedUser.email}
                                />
                                <label htmlFor="role" className="labels">Role</label>
                                <select
                                    id="role"
                                    onChange={handleChangeUpdateUserData}
                                    className="form-select my-3"
                                    name="role"
                                    aria-label="Default select example"
                                    value={updatedUser.role}
                                >
                                    <option value="superAdmin">superAdmin</option>
                                    <option value="admin">admin</option>
                                    <option value="user">user</option>
                                </select>
                            </>
                        )}

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={update}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminUsers;
