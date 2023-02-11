import express, {Express, Request, Response} from 'express';
import * as http from "http";
import {Server} from "socket.io"
import cors from "cors"
import {SessionManager} from "./models/SessionManager";
import {Client} from "./models/Client";
import {ClientManager} from "./models/ClientManager";
import {SocketConfig} from "./models/SocketConfig";


const app: Express = express();
const port = process.env.PORT ?? 8000;

app.use(express.json())

app.use(cors({
    origin:"*"
}))

const server = http.createServer(app)
const socketConfig = new SocketConfig(server)
socketConfig.listen()

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// app.get('/sessions', (req: Request, res: Response) => {
//     res.send(sessionManager.getSessions());
// });


server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});