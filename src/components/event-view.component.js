import React from 'react';
import "../css/footer.css";

export default function Event(props) {
    return (
        <div className="event">
            <h3>Versus</h3>
            <p>{props.versus}</p>
            <h3>Result</h3>
            <p>{props.result}</p>
            <h3>Notes</h3>
            <p>{props.notes}</p>
            <hr/>
        </div>
    );
}


