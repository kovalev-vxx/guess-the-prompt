import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect} from "react";
import { Button } from '@mui/material';

const inter = Inter({subsets: ['latin']})


export default function Home() {

    useEffect(()=>{
        const socket = new WebSocket("ws://localhost:8000/")
        socket.onopen = () => {
            console.log("Hello socket")
        }
    }, [])

    return (
        <>
            <Button variant="text">Hello btn</Button>
            <Head>
                <title>Guess the prompt</title>
                <meta name="description" content="The game Guess the prompt"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>

            </main>
        </>
    )
}
