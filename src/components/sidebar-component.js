import React from 'react';
import "../css/sidebar.css";

export default function Sidebar() {
    return (
        <aside>
            <div className="btn-group three">
                <button>My Notes</button>
                <button>Shared Notes</button>
                <button>Other</button>
            </div>
            <div id="sidebarContent">
                Sidebar content
            </div>
            <div className="btn-group two">
                <button>Add Calendar</button>
                <button>Delete Calendar</button>
            </div>
        </aside>
    );
}
