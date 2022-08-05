import UserInfo from './userProfile/UserInfo';
import ChangePassword from './userProfile/ChangePassword';
import CreateAddress from './userProfile/CreateAddress';

const UserProfile = () => {
    return (
        <div className="user-profile">
            <div className="container">
                <div className="row pt-5">
                    <div className="col-md-6">
                        <UserInfo />
                    </div>
                    <div className="col-md-6">
                        <CreateAddress />
                        <ChangePassword />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
