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

// class Navbar extends React.Component
// {
    
//     constructor(props)
//     {
//         super(props);
//     }
//     render()
//     {
//         return (
//             <div id="navParent">
//                 <ul id="nav">
//                     <li><a>Logout</a></li>
//                     <li><a>Item 2</a></li>
//                     <li><a>Item 3</a></li>
//                 </ul>
//             </div>

//         );
//     }
// }
