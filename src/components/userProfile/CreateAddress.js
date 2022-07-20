import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../UserContext';

const initialState = {
    name: '',
    number: null,
    country: '',
    city: '',
    street: '',
    zip: null
}

const CreateAddress = ({client}) => {
    const [address, setAddress] = useState(initialState);
    const [fullAddress, setFullAddress] = useContext(UserContext);
    const [userData, setUserData] = useState(UserContext);

    const handleChange = ({target}) => {
       setAddress({
            ...address,
           [target.name]: target.value,
       })
    }

    const createAddress = () => {
        setFullAddress(address);
        client.post('/create-address', fullAddress)
            .then(function (response) { setAddress(initialState) })
            .catch(function (error) { console.log(error) });
        client.get('/get-user-data')
            .then(function (response) { setUserData(response.data) })
            .catch(function (error) { console.log(error) });
    }

    useEffect(() => {
        client.get('/get-user-data')
            .then(function (response) { setUserData(response.data) })
            .catch(function (error) { console.log(error) });
    }, [fullAddress, client]);

    return (
        <div className="create-address row">
            <div className="form-create-address col-md-8 p-3">
                <h3>Create address</h3>

                <input
                    type="text"
                    name="name"
                    className="form-control my-4"
                    placeholder="Name"
                    value={address.name || ''}
                    onChange={handleChange}
                />

                <input
                    type="number"
                     name="number"
                    className="form-control my-4"
                    placeholder="Number"
                    value={address.number || ''}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="country"
                    className="form-control my-4"
                    placeholder="Country"
                    value={address.country || ''}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="city"
                    className="form-control my-4"
                    placeholder="City"
                    value={address.city || ''}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="street"
                    className="form-control my-4"
                    placeholder="Street"
                    value={address.street || ''}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="zip"
                    className="form-control my-4"
                    placeholder="Zip"
                    value={address.zip || ''}
                    onChange={handleChange}
                />

                <button
                    onClick={createAddress}
                    className="btn btn-success"
                >
                    Create
                </button>
            </div>
        </div>
    );
}

export default CreateAddress;
