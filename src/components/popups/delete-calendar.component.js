import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import CalendarContext from '../../context/CalendarContext';
import axios from 'axios';

export default function DeleteCalendarPopup() {
    const { userData } = useContext(UserContext);
    const { calendarData, setCalendarData } = useContext(CalendarContext);
    const deleteForm = async (e) => {
        const val = e.target.value;
        if (val === "No") return;
        //Delete from user
        let id = calendarData.calendar.id;
        let index = 0;
        let existingCalendars = userData.user.Calendars;
        for (let cal of existingCalendars) {
            if (cal.id === id) break;
            index++;
        }
        if (index < existingCalendars.length) {
            existingCalendars.splice(index, 1);
        }

        await axios.put("http://localhost:3000/users/updateCalendar/" + userData.user.id, { Calendars: existingCalendars });
        setCalendarData(
            {
                calendar: undefined
            }
        );

        //Delete calendar
        let urlQuery = 'http://localhost:3000/calendars/delete/' + id;
        console.log("Query: " + urlQuery);
        await axios.delete(urlQuery);
    };
    if (!calendarData || !calendarData.calendar) {
        return (
            <div>
                <h5>No calendar selected to delete</h5>
                <button>OK</button>
            </div>
        );
    }
    return (
        <div>
            <form onSubmit={deleteForm}>
                <label>Are you sure you want to delete {calendarData.calendar.calendarName}?</label>
                <input type="submit" value="Yes" />
                <input type="submit" value="No" />
            </form>
        </div>
    );
}
