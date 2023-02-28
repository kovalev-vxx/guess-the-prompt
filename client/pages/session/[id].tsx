import React, {useEffect, useMemo, useState} from 'react';
import {useRouter} from "next/router";
import {Box, Button, Container} from '@mui/material';
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {socket} from "@/pages/_app";
import PlayersList from "@/components/PlayersList";
import {setCurrentSession} from "@/store/actions/sessionActions";

const Sessions = () => {
    const router = useRouter()
    const {id} = router.query
    const {currentSession, sessions} = useAppSelector(state => state.session)
    const {game} = useAppSelector(state => state.game)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const foundSession = sessions.find(session => String(session.id) === id)
        if (foundSession) {
            dispatch(setCurrentSession(foundSession))
        }
    }, [sessions, dispatch, id])

    const {user} = useAppSelector(state => state.user)
    const [ready, setReady] = useState<boolean>(false)

    const r: boolean = useMemo(() => {
        return !!game.players.find(user => user.id === user.id)
    }, [game])

    const isOwner = useMemo(() => {
        return user.id === currentSession.owner.id
    }, [user, currentSession])


    const leave = () => {
        socket.emit("leave-session", currentSession)
    }

    const readyButton = () => {
        if (ready) {
            socket.emit("client-not-ready", currentSession)
        } else {
            socket.emit("client-ready", currentSession)
        }
    }

    const startGame = () => {
        socket.emit("start-game", currentSession)
    }


    return (
        <>
            <Container sx={{display: "flex", justifyContent: "space-between"}}>
                <Button onClick={leave}>Выйти</Button>
                <Box sx={{display: "flex", gap: "1rem"}}>
                    <Button variant={r ? "outlined" : "contained"}
                            onClick={readyButton}>{r ? "Не готов" : "Готов"}</Button>
                    {isOwner && <Button onClick={startGame} variant="contained" disabled={!game.canStart}>Начать</Button>}
                </Box>
            </Container>
            <Button onClick={()=>{socket.emit("TEST", "12323")}}>TEST</Button>

            <h1>Лобби</h1>
            <h2>Игроки в лобби</h2>
            <PlayersList/>
        </>
    );
};

export default Sessions;