import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import CalendarContext from '../context/CalendarContext';
import axios from 'axios';

export default function Popup(props) {
    switch (props.type) {
        case "addCalendar":
            return AddCalendarPopup();
        case "deleteCalendar":
            return DeleteCalendarPopup();
        case "addEvent":
            break;
        default:
            break;
    }
}

function AddCalendarPopup() {
    const [addCalendarName, setAddCalendarName] = useState();
    const { userData } = useContext(UserContext);
    const {setCalendarData} = useContext(CalendarContext);
    const submitPost = async (e) => {
        e.preventDefault();
        const newCalendar = { calendarName: addCalendarName, ownerId: userData.user.id };
        const addCalendarRes = await axios.post("http://localhost:3000/calendars/add", newCalendar);

        let existingCalendars = userData.user.Calendars;
        if(!existingCalendars) existingCalendars = [];
        existingCalendars.push(addCalendarRes.data.id);

        await axios.put("http://localhost:3000/users/updateCalendar/" + userData.user.id, {Calendars : existingCalendars});

        setCalendarData(
            {
                calendar: addCalendarRes.data
            }
        );
    }
    return (
        <div>
            <form id="calendarForm" onSubmit={submitPost}>
                <label htmlFor="add-calendar">Add Calendar Name</label>
                <input id="add-calendar" type="text" onChange={e => setAddCalendarName(e.target.value)}></input>
                <br />
            </form>
            <button form="calendarForm" key="submit">Submit</button>
        </div>
    );
}

function DeleteCalendarPopup() {
    return (
        <div>
            <h3>Are you sure?</h3>
            <button>Yes</button>
        </div>
    );
}

