import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';
import "../css/navbar.css";

export default function Navbar()
{
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const signout = () => {
        setUserData({
          token: undefined,
          user: undefined
        });
        localStorage.setItem('auth-token', "");
        history.push('/login');
    }

    return (
        <div id="navParent">
            <ul id="nav">
                <li id="logout" onClick={signout}>Logout</li>
                <li>Welcome {userData.user.userName}</li>
            </ul>
        </div>
    );
}