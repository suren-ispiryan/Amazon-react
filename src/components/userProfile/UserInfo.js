import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ADDRESS_REQUEST } from '../../redux/userProfile/actions';
import { DELETE_ADDRESS_REQUEST } from '../../redux/userProfile/actions';
import { DEFAULT_ADDRESS_REQUEST } from '../../redux/userProfile/actions';
import LoadingSpinner from '../LoadingSpinner';

const UserInfo = () => {
    const [userData, setUserData] = useState({});
    const {addresses, loading} = useSelector((state) => state.addresses)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_ADDRESS_REQUEST
        })
    }, []);

    useEffect(() => {
        if (!loading) {
            setUserData(addresses)
        }
    }, [loading])

    const makeDefaultAddress = (event, id) => {
        dispatch({
            type: DEFAULT_ADDRESS_REQUEST,
            payload: id
        })
    }

    const deleteAddress = (id) => {
        dispatch({
            type: DELETE_ADDRESS_REQUEST,
            payload: id
        })
    }

    return (
        <div className="user-info">
            <h2 className="mb-5">Your addresses</h2>
            {
                !userData.length
                ?
                <LoadingSpinner />
                :
                (userData.map((address) => {
                    return(
                        <ul key={uuid()}>
                            <li> <span className="text-danger"> Name: </span> {address.name} </li>
                            <li> <span className="text-danger"> phone: </span> {address.number} </li>
                            <li> <span className="text-danger"> Address: </span> {address.country}/{address.city}/{address.street} </li>
                            <li> <span className="text-danger"> Zip: </span> {address.zip} </li>
                            <li> <span className="text-success"> Make default </span>
                                {
                                    address.default === 1
                                    ?
                                        <input
                                            defaultChecked
                                            className="make-default-radio-btn"
                                            type="radio"
                                            name="makeDefault"
                                        />
                                    :
                                        <input
                                            className="make-default-radio-btn"
                                            type="radio"
                                            name="makeDefault"
                                            onChange={event => makeDefaultAddress(event, address.id)}
                                        />
                                }
                            </li>
                            <li>
                                <button
                                    onClick={() => deleteAddress(address.id)}
                                    className="btn btn-danger mt-3"
                                >
                                    Delete address
                                </button>
                            </li>
                            <hr/>
                        </ul>
                    )
                }))
            }
        </div>
    );
}

export default UserInfo;
