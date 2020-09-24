import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function CalendarList() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      Calendar List component
    </div>
  );
}