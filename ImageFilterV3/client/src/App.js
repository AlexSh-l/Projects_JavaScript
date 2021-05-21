import React from "react";
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import "./css/styles.css"
import {useAuth} from "./hooks/authHook";
import {AuthContext} from "./context/AuthContext";
import {SocketIOHook} from "./hooks/socketIOHook";

function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const {socket} = SocketIOHook()
    const isAuthenticated = !!token
        const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
        token, login, logout, userId,  isAuthenticated: isAuthenticated, socket
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
