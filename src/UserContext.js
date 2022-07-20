import { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
    const [fullAddress, setFullAddress] = useState({});
    const [userData, setUserData] = useState({});

    return(
        <UserContext.Provider value={[fullAddress, setFullAddress, userData, setUserData]}>
            {props.children}
        </UserContext.Provider>
    );
}
