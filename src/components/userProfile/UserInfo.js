import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import uuid from 'react-uuid';

const UserInfo = ({client}) => {
    const [userData, setUserData] = useState(UserContext);
    const [fullAddress, setFullAddress] = useContext(UserContext);

    useEffect(() => {
        client.get('/get-user-data')
              .then(function (response) { setUserData(response.data) })
              .catch(function (error) { console.log(error) });
    }, [client, fullAddress, setFullAddress]);

    const makeDefaultAddress = (id) => {
        client.get('/make-address-default/' + id)
              .then(function (response) { console.log(response) })
              .catch(function (error) { console.log(error) });
        client.get('/get-user-data')
              .then(function (response) { setUserData(response.data) })
              .catch(function (error) { console.log(error) });
    }

    const deleteAddress = (id) => {
        client.get('/delete-address/' + id)
              .then(function (response) { console.log(response) })
              .catch(function (error) { console.log(error) });
        client.get('/get-user-data')
              .then(function (response) { setUserData(response.data) })
              .catch(function (error) { console.log(error) });
    }

    return (
        <div className="user-info">
            <h2 className="mb-5">Your addresses</h2>
            {
                userData?.[0]?.addresses?.length &&  userData[0].addresses.map((address, index) => {
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
                                            checked
                                            className="make-default-radio-btn"
                                            type="radio"
                                            name="makeDefault"
                                            onChange={() => makeDefaultAddress(address.id)}
                                        />
                                    :
                                        <input
                                            className="make-default-radio-btn"
                                            type="radio"
                                            name="makeDefault"
                                            onChange={() => makeDefaultAddress(address.id)}
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
                })
            }
        </div>
    );
}

export default UserInfo;
