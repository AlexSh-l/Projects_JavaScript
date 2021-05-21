import React, {useContext, useState} from "react"
import {useHttp} from "../hooks/httpHook";
import {Context} from "../context/Context";

export const LogInPage = () => {
    const auth = useContext(Context)
    const {loading, request} = useHttp()
    const [form, setForm] = useState({
        login: "", email: "", password: ""
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request("api/register", "POST", {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
            alert("Something went wrong, this user is likely to have already been registered, or your password is less than 8 symbols.")
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request("api/login", "POST", {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
            alert("Something went wrong, please check your login, e-mail or password.")
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