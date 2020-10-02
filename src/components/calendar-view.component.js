import React, { useContext, useState, useEffect } from 'react';
import CalendarContext from '../context/CalendarContext';
import "../css/calendar-view.css";
import doublearrow from '../assets/doublearrow.png';
import singlearrow from '../assets/singlearrow.png';

import Modal from 'react-modal'
import Popup from './popup-component';
import '../css/popup.css';


export default function Calendar() {

    Modal.setAppElement("#root");
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const today = new Date();
    const [date, setDate] = useState(today);
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

    const { calendarData } = useContext(CalendarContext);

    useEffect(() => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));
    }, [date]);

    function getStartDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 1;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    function roundUp(numToRound, multiple) {
        return (Math.floor((numToRound + multiple - 1) / multiple)) * multiple;
    }

    const [addOpen, setAddOpen] = useState(false);

    function openAddModal() {
        setAddOpen(true);
    }
    function closeAddModal() {
        setAddOpen(false);
    }
    const [deleteOpen, setDeleteOpen] = useState(false);

    function openDeleteModal() {
        setDeleteOpen(true);
    }
    function closeDeleteModal() {
        setDeleteOpen(false);
    }

    const [eventOpen, setEventOpen] = useState(false);
    function openEventModal() {
        setEventOpen(true);
    }
    function closeEventModal() {
        setEventOpen(false);
    }
    const small_calendar_styles = {
        content: {
            width: '20%',
            height: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            justifySelf: 'center',
            alignSelf: 'center',
            margin: 'auto'
        }
    }

    const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;
    const totalBoxes = roundUp(days[month] + (startDay - 1), 7);

    return (
        <div className="page calendarContent">
            <div id="calendarNameBar">
                <label>{(calendarData && calendarData.calendar) ? calendarData.calendar.calendarName : "Placeholder Calendar Name"}</label>
                <label>Owned by: {(calendarData && calendarData.calendar) ? calendarData.calendar.ownerName : "Placeholder Owner Name"}</label>
            </div>
            <div className="calendarCentered">
                <button onClick={() => setDate(new Date(year - 1, month, day))}><img src={doublearrow} alt="Back 1 year" /></button>
                <button onClick={() => setDate(new Date(year, month - 1, day))}><img src={singlearrow} alt="Back 1 month" /></button>
                <label>{MONTHS[month]} {year}</label>
                <button onClick={() => setDate(new Date(year, month + 1, day))}><img src={singlearrow} alt="Forward 1 month" /></button>
                <button onClick={() => setDate(new Date(year + 1, month, day))}><img src={doublearrow} alt="Forward 1 year" /></button>
            </div>
            <div>
                <ul className="daysOfTheWeek">
                    <li>Sunday</li>
                    <li>Monday</li>
                    <li>Tuesday</li>
                    <li>Wednesday</li>
                    <li>Thursday</li>
                    <li>Friday</li>
                    <li>Saturday</li>
                </ul>
            </div>
            <Modal isOpen={eventOpen} onRequestClose={closeEventModal}>
                <Popup type="event" date={date.toDateString()}></Popup>
            </Modal>
            <div id="calendar">
                {((calendarData && calendarData.calendar)? Array(totalBoxes)
                    .fill(null)
                    .map((_, index) => {
                        const d = index - (startDay - 2);
                        return (
                            <div key={index}
                                onClick={() => {
                                    setDate(new Date(year, month, d));
                                    openEventModal();
                                }}
                            >
                                {d > 0 && d <= days[month] ? d : ''}
                            </div>
                        );
                    }) : 
                    <h3>Get started by adding or selecting a calendar</h3>)}
            </div>
            <Modal isOpen={addOpen} onRequestClose={closeAddModal} contentLabel="Example Modal" style={small_calendar_styles}>
                <Popup type="addCalendar" onClose={closeAddModal}></Popup>
            </Modal>
            <Modal isOpen={deleteOpen} onRequestClose={closeDeleteModal} contentLabel="Example Modal" style={small_calendar_styles}>
                <Popup type="deleteCalendar" onClose={closeDeleteModal}></Popup>
            </Modal>
            <div id="calendarEventButtonGroup">
                <button onClick={openAddModal}>Add Calendar</button>
                <button onClick={openDeleteModal}>Delete Calendar</button>
                <button>Calendar Permissions</button>
            </div>
        </div>
    );
}