import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import {MainPage} from "./pages/MainPage";
import {ImageViewPage} from "./pages/ImageViewPage";
import {LogInPage} from "./pages/LogInPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return (
            <Switch>
                <Route path="/main" exact>
                    <MainPage />
                </Route>
                <Route path="/image" exact>
                    <ImageViewPage />
                </Route>
                <Redirect to="/main" />
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path="/" exact>
                <LogInPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}