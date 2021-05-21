import React, {useContext} from "react"
import {AuthContext} from "../context/AuthContext";

export const ImageViewPage = () =>{
    const contxt = useContext(AuthContext)
    let fileName = "/img/" + contxt.img

    const grayButtonHandler = async () => {
        try {
            let image = document.getElementById("cnv");
            image.classList.toggle("imgGrayscale")
        } catch (e) {

        }
    }

    const sepiaButtonHandler = async () => {
        try {
            let image = document.getElementById("cnv");
            image.classList.toggle("imgSepia")
        } catch (e) {

        }
    }

    const blurButtonHandler = async () => {
        try {
            let image = document.getElementById("cnv");
            image.classList.toggle("imgBlur")
        } catch (e) {

        }
    }

    const opacityButtonHandler = async () => {
        try {
            let image = document.getElementById("cnv");
            image.classList.toggle("imgOpacity")
        } catch (e) {

        }
    }

    const saturateButtonHandler = async () => {
        try {
            let image = document.getElementById("cnv");
            image.classList.toggle("imgSaturate")
        } catch (e) {

        }
    }

    return (
        <div className="bodyMain">
            <header>
                <span><br />Your image:</span>
            </header>
            <div className="tools">
                <button id="grayBtn" onClick={grayButtonHandler}>Gray</button>
                <button id="sepiaBtn" onClick={sepiaButtonHandler}>Sepia</button>
                <button id="blurBtn" onClick={blurButtonHandler}>Blur</button>
                <button id="opacityBtn" onClick={opacityButtonHandler}>Opacity</button>
                <button id="saturateBtn" onClick={saturateButtonHandler}>Saturate</button>
            </div>
            <div className="bodyContent">
                <p><img id="cnv" src={fileName} alt="no image found" /></p>
            </div>
            <footer>
                @Copyright 2021. All rights reserved.
            </footer>
        </div>
    )
}