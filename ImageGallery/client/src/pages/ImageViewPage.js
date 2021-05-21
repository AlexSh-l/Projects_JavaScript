import React, {useContext} from "react"
import {Context} from "../context/Context";

export const ImageViewPage = () => {
    const contxt = useContext(Context)

    const ImageGenerator = ({imageArray}) => {
        return (
            <div>
                {imageArray.map((item, index) => {
                        return (
                            <div>
                                <div>{index + 1}</div>
                                <div>
                                    <p><img name="cnv" src={"/img/" + item.name.toString()} alt="no image found"/></p>
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
        )
    }

    return (
        <div className="bodyMain">
            <header>
                <span><br/>Your images:</span>
            </header>
            <div className="bodyContent" id="imageBody">
                <ImageGenerator imageArray={contxt.imgArray}/>
            </div>
            <footer>
                @Copyright 2021. All rights reserved.
            </footer>
        </div>
    )
}