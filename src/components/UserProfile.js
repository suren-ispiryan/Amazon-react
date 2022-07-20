import UserInfo from './userProfile/UserInfo';
import ChangePassword from './userProfile/ChangePassword';
import CreateAddress from './userProfile/CreateAddress';

const UserProfile = ({client}) => {
    return (
        <div className="user-profile">
            <div className="container">
                <div className="row pt-5">
                    <div className="col-md-6">
                        <UserInfo client={client} />
                    </div>
                    <div className="col-md-6">
                        <CreateAddress
                            client={client}
                        />
                        <ChangePassword
                            client={client}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
