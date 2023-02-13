import React, {useEffect, useMemo, useState} from 'react';
import {useRouter} from "next/router";
import {Box, Button, Container} from '@mui/material';
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {socket} from "@/pages/_app";
import PlayersList from "@/components/PlayersList";
import {setCurrentSession} from "@/store/actions/sessionActions";
import {IGame} from "@/models/IGame";
import {updateGame} from "@/store/actions/gameActions";

const Sessions = () => {
    const router = useRouter()
    const {id} = router.query
    const {currentSession, sessions} = useAppSelector(state => state.session)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        const foundSession = sessions.find(session=>String(session.id)===id)
        if(foundSession){
            dispatch(setCurrentSession(foundSession))
        }
    }, [sessions, dispatch, id])


    useEffect(()=>{
        socket.on("game", (game:IGame)=>{
            dispatch(updateGame(game))
        })
    }, [dispatch])

    const {user} = useAppSelector(state => state.user)
    const [ready, setReady] = useState<boolean>(false)
    const isOwner = useMemo(()=>{
        return user.id === currentSession.owner.id
    }, [user, currentSession])
    const startIsActive = useMemo(()=>{
        return currentSession.clients.length >= 2
    }, [currentSession])

    const leave = () => {
        socket.emit("leave-session", currentSession)
    }

    const readyButton = () => {
        if(ready){
            socket.emit("client-not-ready", currentSession)
            setReady(false)
        } else {
            socket.emit("client-ready", currentSession)
            setReady(true)
        }
    }


    return (
        <>
            <Container sx={{display: "flex", justifyContent: "space-between"}}>
                <Button onClick={leave}>Выйти</Button>
                <Box sx={{display: "flex", gap: "1rem"}}>
                    <Button variant={ready ? "outlined" : "contained"} onClick={readyButton}>{ready ? "Не готов" : "Готов"}</Button>
                    {isOwner && <Button variant="contained" disabled={!startIsActive}>Начать</Button>}
                </Box>
            </Container>

            <h1>Лобби</h1>
            <h2>Игроки в лобби</h2>
            <PlayersList/>
        </>
    );
};

export default Sessions;