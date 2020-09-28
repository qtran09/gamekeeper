import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Sidebar from './sidebar-component';
import NavBar from './navbar-component';
import Footer from './footer-component';
import Calendar from './calendar-view.component';

export default function Home() {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  if (!userData.user) {
    history.push('/login');
    return null;
  }

  return (userData.user ? (
    <div className="page">
      <NavBar />
      <div id="mainDiv">
        <Sidebar />
        <Calendar />
      </div>
      <Footer />
    </div>
  ) :
    <></>
  );
}

