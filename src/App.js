import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import "./styles.css";
import "./css/navbar.css";
import "./css/sidebar.css";
import Login from './components/login-view-component';
import Home from './components/home-view.component';
import UserContext from './context/UserContext';
import axios from 'axios';

function App() {
  const [userData,setUserData] = useState({token: undefined, user: undefined});
  useEffect(() =>
  {
    const checkLoggedIn = async () => 
    {
      let token = localStorage.getItem('auth-token');
      if(token === null)
      {
        localStorage.setItem('auth-token',"");
        token = "";
      }
      const tokenRes = await axios.post("http://localhost:3000/users/tokenIsValid",null,{headers:{'x-auth-token': token}});
      if(tokenRes.data)
      {
        const userRes = await axios.get("http://localhost:3000/users/",{headers:{'x-auth-token': token}});
        setUserData({token, user: userRes.data});
      }
    };
    checkLoggedIn();
  },[]);
  return (
    <Router>
      <UserContext.Provider value = {{userData, setUserData}}>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' component={Login}/>
      </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
