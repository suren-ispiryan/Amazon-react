import {createRef, useState} from 'react';
import {Link} from 'react-router-dom';
import axiosInstance from './../config/axiosInstance';
//Recaptcha
import ReCAPTCHA from 'react-google-recaptcha';

const initialStateRegister = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmation: ''
}

const Register = () => {
    const [registerInfo, setRegisterInfo] = useState(initialStateRegister);
    const [registerMessage, setRegisterMessage] = useState('');
    const [registerErrorMessage, setRegisterErrorMessage] = useState(initialStateRegister);
    // Recaptcha
    const grecaptchaObject = window.grecaptcha;
    const recaptchaRef = createRef();

    //recapture
    window.recaptchaOptions = {
        useRecaptchaNet: true,
    };

    const onChange = (value) => {
        console.log("Captcha value:", value);
    }

    //form
    const handleChange = async ({target}) => {
        setRegisterInfo({
            ...registerInfo,
            [target.name]: target.value,
        })
    }

    const registerUser = async (e) => {
        e.preventDefault()
        //recapture
        registerInfo['g-recaptcha-response'] = await recaptchaRef.current.execute()
        let guestCardProducts;
        guestCardProducts = JSON.parse(localStorage.getItem('addedToCart'))
        axiosInstance.post('register', registerInfo, guestCardProducts)
            .then(function (response) {
                if (response.data === 'Wrong captcha') {
                    setRegisterMessage(response.data)
                } else {
                         if (response.status === 200) {
                            setRegisterMessage('For completing registration process please check your male.')
                            localStorage.removeItem('addedToCart');
                        }
                }
            })
            .catch(function (error) {
                setRegisterErrorMessage({
                    ...initialStateRegister,
                    'name': error.response.data.errors.name ? error.response.data.errors.name : '',
                    'surname': error.response.data.errors.surname ? error.response.data.errors.surname : '',
                    'email': error.response.data.errors.email ? error.response.data.errors.email : '',
                    'password': error.response.data.errors.password ? error.response.data.errors.password : '',
                    'confirmation': error.response.data.errors.confirmation ? error.response.data.errors.confirmation : '',
                })
            });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 sign-parent">
                    <div className="sign-form">
                        <h2>Register</h2>

                        <h6 className="mt-3 text-success"> { registerMessage } </h6>
                        <h6 className="mt-3 text-danger"> { registerErrorMessage.name } </h6>
                        <form onSubmit={registerUser}>
                            <input
                                type="text"
                                name="name"
                                className="form-control my-3"
                                placeholder="First Name"
                                onChange={handleChange}
                                value={registerInfo.name || ''}
                            />
                            <h6 className="mt-3 text-danger"> { registerErrorMessage.surname } </h6>
                            <input
                                type="text"
                                name="surname"
                                className="form-control my-3"
                                placeholder="Last Name"
                                onChange={handleChange}
                                value={registerInfo.surname  || ''}
                            />
                            <h6 className="mt-3 text-danger"> { registerErrorMessage.email } </h6>
                            <input
                                type="email"
                                name="email"
                                className="form-control my-3"
                                placeholder="Email"
                                onChange={handleChange}
                                value={registerInfo.email  || ''}
                            />
                            <h6 className="mt-3 text-danger"> { registerErrorMessage.password } </h6>
                            <input
                                type="password"
                                name="password"
                                className="form-control my-3"
                                placeholder="Password"
                                onChange={handleChange}
                                value={registerInfo.password || ''}
                            />
                            <h6 className="mt-3 text-danger"> { registerErrorMessage.confirmation } </h6>
                            <input
                                type="password"
                                name="confirmation"
                                className="form-control my-3"
                                placeholder="Re-enter password"
                                onChange={handleChange}
                                value={registerInfo.confirmation || ''}
                            />

                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey='6LdnJnYiAAAAAHtXqZf7ZQOkceIB72wuWgPei7yR'
                                onChange={onChange}
                                grecaptcha={grecaptchaObject}
                            />

                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-primary my-3"
                                >
                                    Register
                                </button>
                            </div>

                            <div>
                                <small>
                                    Already registered?
                                    <Link to="/login">Login</Link>
                                </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
