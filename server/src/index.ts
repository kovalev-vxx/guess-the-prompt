import express, { Express, Request, Response } from 'express';
import expressWs from "express-ws";
const {app, getWss, applyTo } =expressWs(express())
const port = process.env.PORT ?? 8000;

app.ws("/", (ws,req) => {
    console.log("Connected")
})

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript hello!!!');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});