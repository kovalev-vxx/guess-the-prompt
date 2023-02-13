import Head from 'next/head'
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {ISession, ISessionDefaultValues} from "@/models/ISession";
import {setCurrentSession, setSessions} from '@/store/actions/sessionActions';
import SessionsList from "@/components/SessionsList";
import UsernameForm from "@/components/UsernameForm";
import {useRouter} from "next/router";
import {IUser} from "@/models/IUser";
import {setUser} from "@/store/actions/userActions";
import {socket} from "@/pages/_app";


type Session = {
    id: number
}

function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export default function Home() {
    const dispatch = useAppDispatch()
    const router = useRouter()



    useEffect(() => {
        socket.emit("session-list")
        socket.on("room-created", (msg) => {
            console.log(msg)
        })
        socket.on("session-error", (msg) => {
            console.log(msg, socket.id)
        })
        socket.on("session-list", (sessions: ISession[]) => {
            dispatch(setSessions(sessions))
        })
        socket.on("join-session", (session:ISession) => {
            dispatch(setCurrentSession(session))
            router.push(`/session/${session.id}`)
        })
        socket.on("auth", (user:IUser) => {
            console.log(user)
            dispatch(setUser(user))
        })
        socket.on("leave-session", ()=> {
            dispatch(setCurrentSession(ISessionDefaultValues))
            router.push("/")
        })
    }, [router, dispatch])

    return (
        <>
            <Head>
                <title>Guess the prompt</title>
                <meta name="description" content="The game Guess the prompt"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <UsernameForm/>
                <SessionsList/>
            </main>
        </>
    )
}
