import React from "react";
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import "./css/styles.css"
import {useAuth} from "./hooks/authHook";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
        const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
        token, login, logout, userId,  isAuthenticated: isAuthenticated
    }}>
      <Router>
          {isAuthenticated}
        <div>
            {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
