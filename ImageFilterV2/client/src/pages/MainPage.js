import React, {useContext, useState} from "react"
import axios from "axios";
import {useHistory} from "react-router-dom"
import {AuthContext} from "../context/AuthContext";

export const MainPage = () =>{
    const contxt = useContext(AuthContext)
    const history = useHistory()
    const [formData, setFormData] = useState({
        file: null
    })
    const uploadHandler = async () => {
        try {
            const data = axios.post("/upload", formData.file)
            contxt.img = (await data).data
            history.push("/image")
        } catch (e) {
            console.log("uploadError")
        }
    }
    const changeHandler = files => {
        const file = files[0]
        const formFileData = new FormData()
        formFileData.append("file", file)
        setFormData({...formData, "file":formFileData})
    }
    const logoutHandler = async () => {
        try {
            contxt.logout(contxt.token, contxt.userId)
        } catch (e) {

        }
    }
    return (
        <div className="bodyMain">
            <header>
                <span><br />Welcome to image converter!!!<br /></span>
                <span>Here you can put filters on your images</span>
            </header>
            <div className="bodyContent">
                Please select your image:
                <input type="file" name="file" accept="image/*" onChange={(e) => changeHandler(e.target.files)}></input>
                <div>
                    <button onClick={uploadHandler}>Enter</button>
                    <button onClick={logoutHandler}>Logout</button>
                </div>
            </div>
            <footer>
                @Copyright 2021. All rights reserved.
            </footer>
        </div>
    )
}