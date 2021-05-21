import React, {useContext, useState} from "react"
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";

export const LogInPage = () => {
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const [form, setForm] = useState({
        login: "", email: "", password: ""
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request("api/auth/register", "POST", {...form})
            console.log("Data", data.message)
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request("api/auth/login", "POST", {...form})
            console.log("Data", data)
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div className="bodyMain">
            <header>
                <span><br/>Please log in or register to use this website</span>
            </header>
            <div className="bodyContent">
                <input placeholder="Your nickname" id="login" name="login" type="text" onChange={changeHandler}/>
                <input placeholder="Your e-mail" id="email" name="email" type="text" onChange={changeHandler}/>
                <input placeholder="Your password" id="password" name="password" type="password"
                       onChange={changeHandler}/>
                <div>
                    <button onClick={loginHandler} disabled={loading}>Sign in</button>
                    <button onClick={registerHandler} disabled={loading}>Register</button>
                </div>
            </div>
            <footer>
                @Copyright 2021. All rights reserved.
            </footer>
        </div>
    )
}