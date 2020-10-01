import React from 'react';

import AddCalendarPopup from './popups/add-calendar.component';
import DeleteCalendarPopup from './popups/delete-calendar.component';
import Event from './popups/event-view.component';

export default function Popup(props) {
    switch (props.type) {
        case "addCalendar":
            return <AddCalendarPopup/>
        case "deleteCalendar":
            return <DeleteCalendarPopup/>
        case "event":
            return <Event date = {props.date}/>
        default:
            break;
    }
}