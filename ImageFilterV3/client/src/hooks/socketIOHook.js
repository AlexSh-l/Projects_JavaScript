import {useState, useEffect} from 'react'
import {io} from "socket.io-client"

export const SocketIOHook = () => {
    const [socket] = useState(io("http://127.0.0.1:80/"))
    useEffect(() => {
        if (socket.disconnected) {
            socket.connect();
        }
        return () => {
            socket.emit("break", {message: "disconnected"})
            socket.disconnect()
        };
    }, []);
    return { socket }
}