import React from 'react';
import "../css/sidebar.css";

export default function Sidebar() {
    return (
        <aside>
            <div class="btn-group three">
                <button>My Notes</button>
                <button>Shared Notes</button>
                <button>Other</button>
            </div>
            <div id="sidebarContent">
                Sidebar content
            </div>
            <div class="btn-group two">
                <button>Add Calendar</button>
                <button>Delete Calendar</button>
            </div>


        </aside>
    );
}

// class Sidebar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state =
//         {

//         }
//     }
//     render() {
//         return (
//             <aside>
//                 <ul id="sidebarNav">
//                     <li><a>My Notes</a></li>
//                     <li><a>Shared Notes</a></li>
//                     <li><a>Other</a></li>
//                 </ul>
//             </aside>
//         );
//     }
// }