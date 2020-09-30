import axios from 'axios';
import React, { useContext } from 'react';
import CalendarContext from '../context/CalendarContext';
import UserContext from '../context/UserContext';
import "../css/sidebar.css";

export default function Sidebar() {

    const { userData } = useContext(UserContext);
    const {calendarData, setCalendarData} = useContext(CalendarContext);

    const calendarSelect = async (e) =>
    {
        const urlQuery = 'http://localhost:3000/calendars/' + e.target.getAttribute('calendarId')
        const calendar = await axios.get(urlQuery);
        console.log("next line");
        if(!calendar) console.log("get went wrong");
        setCalendarData(
            {
                calendar: calendar.data
            }
        );
    }
    return (
        <aside>
            <div className="btn-group three">
                <button>My Notes</button>
                <button>Shared Notes</button>
                <button>Other</button>
            </div>
            <ul id="sidebarContent">
                {userData.user.Calendars.map((calendarId, _) => {
                    return (
                        <li key={calendarId} onClick={calendarSelect} calendarId={calendarId}>
                            {calendarId}
                        </li>

                    );
                })}
            </ul>
            <div className="btn-group two">
                <button>Add Calendar</button>
                <button>Delete Calendar</button>
            </div>

        </aside>
    );
}
