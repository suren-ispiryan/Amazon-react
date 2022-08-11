import { useEffect } from 'react';
import axiosInstance from '../config/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const Verify = () => {
    const navigate = useNavigate();
    let email = useParams();

    useEffect(() => {
        axiosInstance.get('verify/'+email.email)
                     .then(function (response) {
                            if(response.status === 200) {
                                navigate('/login')
                            }
                     })
                     .catch(function (error) {console.log(error)});
    }, [email])

    return (
        <div className="user-profile">

        </div>
    );
}

export default Verify;
