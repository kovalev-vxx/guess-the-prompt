import express, {Express, Request, Response} from 'express';
import * as http from "http";
import {Server} from "socket.io"
import cors from "cors"
import {SessionManager} from "./models/SessionManager";


const app: Express = express();
const port = process.env.PORT ?? 8000;
const sessionManager = new SessionManager()


app.use(express.json())

app.use(cors({
    origin:"*"
}))

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on("connection", (socket) => {
    console.log("user is connected")
    socket.on("create-session", ()=>{
        const id = Date.now();
        if(sessionManager.createSession(id, socket)){
            socket.emit("session-list", sessionManager.getSessions())
        } else {
            socket.emit("session-error", {message: "You already have a session"})
        }
    })
    socket.on("close-session", ({id})=>{
        sessionManager.closeSession(id, socket)
    })
    socket.on("disconnect", ()=>{
        console.log("user disconnected")
    })
})

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.get('/sessions', (req: Request, res: Response) => {
    res.send(sessionManager.getSessions());
});


server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});