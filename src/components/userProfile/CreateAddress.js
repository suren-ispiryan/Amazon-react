import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CREATE_ADDRESS_REQUEST } from '../../redux/userProfile/actions';

const initialState = {
    name: '',
    number: null,
    country: '',
    city: '',
    street: '',
    zip: null
}

const CreateAddress = () => {
    const [addressFormErrors, setAddressFormErrors ] = useState({});
    const dispatch = useDispatch();
    const [address, setAddress] = useState(initialState);

    const handleChange = ({target}) => {
       setAddress({
            ...address,
           [target.name]: target.value,
       })
    }

    const createAddress = () => {
        setAddressFormErrors(validate(address));
        dispatch({
            type: CREATE_ADDRESS_REQUEST,
            payload: address
        })
        setAddress(initialState)
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'name is required';
        }
        if (!values.number) {
            errors.number = 'number is required';
        }
        if (!values.country) {
            errors.country = 'country is required';
        }
        if (!values.city) {
            errors.city = 'city is required';
        }
        if (!values.street) {
            errors.street = 'street is required';
        }
        if (!values.zip) {
            errors.zip = 'zip is required';
        }
        return errors;
    }

    return (
        <div className="create-address row">
            <div className="form-create-address col-md-8 p-3">
                <h3>Create address</h3>

                <input
                    type="text"
                    name="name"
                    className="form-control my-1"
                    placeholder="Name"
                    value={address.name || ''}
                    onChange={handleChange}
                />
                <h6 className="errors text-danger">{addressFormErrors.name}</h6>

                <input
                    type="number"
                     name="number"
                    className="form-control my-1"
                    placeholder="Number"
                    value={address.number || ''}
                    onChange={handleChange}
                />
                <h6 className="errors text-danger">{addressFormErrors.number}</h6>

                <input
                    type="text"
                    name="country"
                    className="form-control my-1"
                    placeholder="Country"
                    value={address.country || ''}
                    onChange={handleChange}
                />
                <h6 className="errors text-danger">{addressFormErrors.country}</h6>

                <input
                    type="text"
                    name="city"
                    className="form-control my-1"
                    placeholder="City"
                    value={address.city || ''}
                    onChange={handleChange}
                />
                <h6 className="errors text-danger">{addressFormErrors.city}</h6>

                <input
                    type="text"
                    name="street"
                    className="form-control my-1"
                    placeholder="Street"
                    value={address.street || ''}
                    onChange={handleChange}
                />
                <h6 className="errors text-danger">{addressFormErrors.street}</h6>

                <input
                    type="number"
                    name="zip"
                    className="form-control my-1"
                    placeholder="Zip"
                    value={address.zip || ''}
                    onChange={handleChange}
                />
                <h6 className="errors text-danger">{addressFormErrors.zip}</h6>

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
