import React, {useContext, useState} from "react"
import axios from "axios";
import {useHistory} from "react-router-dom"
import {Context} from "../context/Context";
import {useHttp} from "../hooks/httpHook";

export const MainPage = () => {
    const contxt = useContext(Context)
    const history = useHistory()
    const {request} = useHttp()
    const [formData, setFormData] = useState({
        file: null
    })

    const uploadHandler = async () => {
        try {
            const data = await axios.post("/upload", formData.file)
            contxt.img = data.data.name
            contxt.imgName = data.data.originalName
            if (data.data.toString() === "File upload error") {
                contxt.img = ""
                contxt.imgName = ""
            }
            const imageData = await request("api/file", "POST", {
                fName: contxt.img,
                fOriginalName: contxt.imgName,
                usrID: contxt.userId
            })
            contxt.imgArray = imageData[0]
            history.push("/image")
        } catch (e) {
            alert("Something went wrong, please upload an image if you haven't.")
        }
    }

    const changeHandler = files => {
        const file = files[0]
        const formFileData = new FormData()
        formFileData.append("file", file)
        setFormData({...formData, "file": formFileData})
    }

    const logoutHandler = async () => {
        try {
            contxt.logout(contxt.token, contxt.userId)
        } catch (e) {
            alert("Something went wrong while logging out.")
        }
    }

    return (
        <div className="bodyMain">
            <header>
                <span><br/>Welcome to image gallery!!!<br/></span>
                <span>Here you can upload and store your images</span>
            </header>
            <div className="bodyContent">
                Please select your image:
                <input type="file" name="file" accept="image/*" onChange={(e) => changeHandler(e.target.files)}/>
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