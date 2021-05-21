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
            //const data = await request("api/auth/register", "POST", {...form})
            //console.log("Data", data.message)
            //auth.login(data.token, data.userId)
        try {
            await registerEvent(form.email, form.login, form.password)
        } catch (e) {
        }
    }

    async function registerEvent(email, login, password) {
        const query = `
                    mutation($qLogin: String!, $qEmail: String!, $qPassword: String!) {
                        sign_up(login: $qLogin email: $qEmail, password: $qPassword) {
                            token
                            error
                        }
                    }
                `;
        const variables = { qLogin:login, qEmail: email, qPassword: password };
        fetch('/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query,
                variables
            }),
        }).then(res=> res.json())
            .then(res=>{
                const data = res.data
                if (JSON.stringify(data)) {
                    let error = data["sign_up"]?.error
                    if (error) {
                        alert(error)
                    } else {
                        let token = data["sign_up"]?.token
                        if (token) {
                            auth.login(token, data.userId)
                        } else {
                            alert("Wrong input for registration")
                        }
                    }
                }
            })

    }

    const loginHandler = async () => {

            //const data = await request("api/auth/login", "POST", {...form})

            //auth.login(data.token, data.userId)

        try {
            await loginEvent(form.login, form.password)
        } catch (e) {
        }
    }

    async function loginEvent(login, password) {
        const query = `
                    query($qLogin: String!, $qPassword: String!) {
                        sign_in(login: $qLogin, password: $qPassword) {
                            token
                            error
                        }
                    }
                `;
        const variables = { qLogin: login, qPassword: password };

        fetch('/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query,
                variables
            }),
        })
            .then(res => res.json())
            .then(res => {
                const data = res.data
                if (JSON.stringify(data)) {
                    let error = data["sign_in"]?.error
                    if (error) {
                        alert(error)
                    } else {
                        let token = data["sign_in"]?.token
                        if (token) {
                            auth.login(token, data.userId)
                        } else {
                            alert("Wrong input for authorization")
                        }
                    }
                }
            });
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