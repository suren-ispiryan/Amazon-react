import { useState } from 'react';
import axiosInstance from '../../config/axiosInstance';

const initialState = {
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: ''
}

const ChangePassword = () => {
    const [pass, setPass] = useState(initialState);
    const [passwordUpdateMessage, setPasswordUpdateMessage] = useState('');

    const handleChange = ({target}) => {
        setPass({
            ...pass,
            [target.name]: target.value,
        })
    }

    const setPassword = () => {
        axiosInstance.post('/change-password', pass)
            .then(function (response) {
                setPass(initialState);
                setPasswordUpdateMessage(response.data);
            })
            .catch(function (error) { console.log(error) });
    }

    return (
        <div className="change-password mt-4 row password-change-row">
            <div className="col-md-6 password-change-col">
                <h4>Change password</h4>

                {passwordUpdateMessage === 'Password was successfully changed' ?
                    <p className="text-success">
                        {passwordUpdateMessage}
                    </p>
                :
                    <p className="text-danger"></p>
                }

                {passwordUpdateMessage === 'Something went wrong' ?
                    <p className="text-danger">
                        {passwordUpdateMessage}
                    </p>
                    :
                    <p className="text-danger"></p>
                }

                <input
                    type="password"
                    name="oldPassword"
                    className="form-control my-4"
                    placeholder="Old password"
                    value={pass.oldPassword || ''}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="newPassword"
                    className="form-control my-4"
                    placeholder="New password"
                    value={pass.newPassword || ''}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="repeatNewPassword"
                    className="form-control my-4"
                    placeholder="Repeat new password"
                    value={pass.repeatNewPassword || ''}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="btn btn-success"
                    onClick={setPassword}
                >
                    Change
                </button>
            </div>
        </div>
    );
}

export default ChangePassword;
