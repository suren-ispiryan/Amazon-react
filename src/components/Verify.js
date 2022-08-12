import { useEffect } from 'react';
import axiosInstance from '../config/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const Verify = () => {
    const navigate = useNavigate();
    let token = useParams();

    useEffect(() => {
        console.log(token)
        axiosInstance.get('verify/'+token.token)
                     .then(function (response) {
                            if(response.status === 200) {
                                navigate('/login')
                            }
                     })
                     .catch(function (error) {console.log(error)});
    }, [token])

    return (
        <div className="user-profile">

        </div>
    );
}

export default Verify;
