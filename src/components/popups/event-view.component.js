import React, { useContext, useState} from 'react';
import '../../css/event.css';
import CalendarContext from '../../context/CalendarContext';
import axios from 'axios';
import UserContext from '../../context/UserContext';
export default function Event(props) {

    const { calendarData, setCalendarData} = useContext(CalendarContext);
    const { userData } = useContext(UserContext);

    const [versus, setVersus] = useState();
    const [result, setResult] = useState();
    const [notes, setNotes] = useState();

    const eventSubmit = async (e) =>
    {
        e.preventDefault();
        const event = {date: props.date, versus, result, notes}
        console.log("Test: " + new Date());
        console.log("Date: " + JSON.stringify(props));
        console.log("Versus: " + versus);
        console.log("Results: " + result);
        console.log("Notes: " + notes);

        let eventList = calendarData.calendar.events;
        if(!eventList) eventList = [];
        eventList.push(event);
        calendarData.calendar.events = eventList;

        await axios.put("http://localhost:3000/calendars/addEvent/" + calendarData.calendar.id, { events: eventList });

        await axios.put("http://localhost:3000/users/updateCalendar/" + userData.user.id, {Calendars: calendarData.calendar});
        setCalendarData({calendar: calendarData.calendar});
        
    };
    return (
        <div className="event">
            <div className="eventsContent">
                <h1>Events List</h1>
                <hr />
                <div className="eventsList">
                    {calendarData.calendar.events ? calendarData.calendar.events.map((calEvent, index) => {
                        return (
                            <div key={index}>
                                <h5>Versus</h5>
                                <p>{calEvent.versus}</p>
                                <h5>Result</h5>
                                <p>{calEvent.result}</p>
                                <h5>Notes</h5>
                                <p>{calEvent.notes}</p>
                                <hr />
                            </div>
                        );
                    }) : <></>}
                </div>
            </div>
            <div className="eventsForm">
                <h1>Add an Event</h1>
                <form onSubmit={eventSubmit}>
                    <label htmlFor="add-event-versus">Versus</label>
                    <input id="add-event-versus" type="text" onChange={e => setVersus(e.target.value)}></input>

                    <label htmlFor="add-event-result">Result</label>
                    <div>
                        <button onClick={(e) => {e.preventDefault(); setResult("Win")}}>Win</button>
                        <button onClick={(e) => {e.preventDefault(); setResult("Loss")}}>Loss</button>
                    </div>
                    <label htmlFor="add-event-notes">Notes</label>
                    <textarea rows="10" cols="80" style={{resize: "none"}} onChange={e => setNotes(e.target.value)}></textarea>
                    <input type="submit" value="Add Event"></input>
                </form>
            </div>
        </div>
    );
}


