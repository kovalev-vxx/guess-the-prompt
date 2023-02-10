import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
import {useEffect, useRef, useState} from "react";
import {Button} from '@mui/material';
import socketIOClient from "socket.io-client"
import {socket} from "@/pages/_app";

const inter = Inter({subsets: ['latin']})



type Session = {
    id: number
}

export default function Home() {
    const [sessions, setSessions] = useState<Session[]>([])


    useEffect(() => {
        socket.on("room-created", (msg) => {
            console.log(msg)
        })
        socket.on("session-error", (msg) => {
            console.log(msg)
        })
        socket.on("session-list", (msg) => {
            console.log(msg)
        })
    }, [])

    return (
        <>
            <Button variant="text" onClick={() => {
                socket.emit("create-session")
            }}>Hello btn</Button>
            <Head>
                <title>Guess the prompt</title>
                <meta name="description" content="The game Guess the prompt"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>

            </main>
        </>
    )
}
