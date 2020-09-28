import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import "../css/calendar-view.css";
import doublearrow from '../assets/doublearrow.png';
import singlearrow from '../assets/singlearrow.png';


export default function Calendar() {
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const today = new Date();
    const [date, setDate] = useState(today);
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

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

    function roundUp(numToRound, multiple)
    {
        return (Math.floor((numToRound + multiple - 1)/multiple))*multiple;
    }

    const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;
    const totalBoxes = roundUp(days[month] + (startDay-1),7);

    const { userData } = useContext(UserContext);
    return (
        <div className="page calendarContent">
            <div id="calendarNameBar">
                <label>Placeholder Calendar Name</label>
                <label>Owned by: {userData.user.userName}</label>
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
            <div id="calendar">
                {Array(totalBoxes)
                    .fill(null)
                    .map((_, index) => {
                        const d = index - (startDay - 2);
                        return (
                            <div key= {index} 
                                onClick={() => {
                                    setDate(new Date(year, month, d));
                                }}
                            >
                                {d > 0 && d <= days[month]? d : ''}
                            </div>
                        );
                })}
            </div>
            <div id="calendarEventButtonGroup">
                <button>Add Event</button>
                <button>Some other button</button>
            </div>
        </div>
    );
}