import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from "../context/UserContext";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [userName, setUsername] = useState();

    const [loginEmail, setLoginEmail] = useState();
    const [loginPassword, setLoginPassword] = useState();

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const submitRegister = async (e) => {
        e.preventDefault();
        const newUser = { email, password, passwordCheck, userName };
        await axios.post("http://localhost:3000/users/register", newUser);
        const loginRes = await axios.post("http://localhost:3000/users/login", { email, password });
        setUserData(
            {
                token: loginRes.data.token,
                user: loginRes.data.user
            }
        );
        localStorage.setItem('auth-token', loginRes.data.token);
        history.push('/');
    }

    const submitLogin = async (e) => {
        e.preventDefault();
        const user = { email: loginEmail, password: loginPassword };
        const loginRes = await axios.post("http://localhost:3000/users/login", user);
        setUserData(
            {
                token: loginRes.data.token,
                user: loginRes.data.user
            }
        );
        localStorage.setItem('auth-token', loginRes.data.token);
        history.push('/');
    }
    if (userData.user) {
        history.push('/');
        return null;
    }

    return (
        <main className="container">
            <div className="row">
                <section id="smallAbout" className="col">
                    <h2>About This Thing</h2>
                </section>
                <section id="login" className="col">
                    <h2>Login Section</h2>
                    <form onSubmit={submitLogin}>
                        <label htmlFor="login-email">Email</label>
                        <input id="login-email" type="email" onChange={e => setLoginEmail(e.target.value)} />

                        <label htmlFor="login-password">Password</label>
                        <input id="login-password" type="password" onChange={e => setLoginPassword(e.target.value)} />
                        <br />
                        <input type="submit" value="Login" />

                    </form>

                </section>
                <section id="signup" className="col">
                    <h2>Signup Section</h2>
                    <form onSubmit={submitRegister}>

                        <label htmlFor="register-userName">Username</label>
                        <input id="register-userName" type="text" onChange={e => setUsername(e.target.value)} />
                        <label htmlFor="register-email">Email</label>
                        <input id="register-email" type="email" onChange={e => setEmail(e.target.value)} />

                        <label htmlFor="register-password">Password</label>
                        <input id="register-password" type="password" onChange={e => setPassword(e.target.value)} />

                        <label htmlFor="register-checkPassword">Verify Password</label>
                        <input id="register-checkPassword" type="password" onChange={e => setPasswordCheck(e.target.value)} />

                        <br />
                        <input type="submit" value="Register" />
                    </form>
                </section>
            </div>
        </main>
    );
}