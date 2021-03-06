import React, { useContext, useEffect } from 'react';
import CalendarContext from '../context/CalendarContext';
import UserContext from '../context/UserContext';
import "../css/sidebar.css";

export default function Sidebar() {


    const { userData } = useContext(UserContext);
    const {setCalendarData} = useContext(CalendarContext);

    useEffect(() => 
    {
        console.log(userData.user.Calendars);
    },[userData.user.Calendars])
    return (
        <aside>
            <div className="btn-group three">
                <button>My Notes</button>
                <button>Shared Notes</button>
                <button>Other</button>
            </div>
            <ul id="sidebarContent">
                {userData.user.Calendars? userData.user.Calendars.map((calendar, _) => {
                    return (
                        <li key={calendar.id} onClick={() => setCalendarData({calendar})}>
                            {calendar.calendarName}
                        </li>

                    );
                }) : <></>}
            </ul>
        </aside>
    );
}
