import React, {ChangeEvent, useMemo, useState} from 'react';
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import {socket} from "@/pages/_app";

const ai_link: string = "http://6d06-34-142-173-65.ngrok.io/image/"

const Game = () => {
    const router = useRouter()
    const {id} = router.query
    const {currentSession, sessions} = useAppSelector(state => state.session)
    const {user} = useAppSelector(state => state.user)
    const {game} = useAppSelector(state => state.game)
    const dispatch = useAppDispatch()
    const {currentRound, maxRounds, players, leader, prompt} = game

    const [promptInput, setPromptInput] = useState<string>("")

    const isLeader = useMemo(() => {
        return user.id === leader.id
    }, [leader, user])

    const promptBtn = () => {
        socket.emit("prompt", {id:currentSession.id, prompt:promptInput})
    }

    const promptInputHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setPromptInput(event.target.value)
    }

    return (
        <div>
            <Container sx={{display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center"}}>
                <Box sx={{display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                    <h1>Игра</h1>
                    <h2>Загадывает: {leader.username}</h2>
                    <h1>Круг {currentRound}/{maxRounds}</h1>
                </Box>

                {
                    isLeader ?
                        <>
                            {<TextField onChange={promptInputHandler} fullWidth label="Введите запрос"/>}
                            <Button onClick={promptBtn} variant="contained">Загадать</Button>
                        </>
                        :
                        <>
                            {<TextField fullWidth label="Ввести отгадку"/>}
                            <Button variant="contained">Отдагать</Button>
                        </>
                }

                {prompt ?
                    <img src={ai_link+prompt} height="512px" width="512px" alt="ai image"/>
                    :
                    <Box width="512px" textAlign="center"
                         sx={{display: "flex", background:"whitesmoke", border:"solid", alignItems: "center", justifyContent: "center"}}
                         height="512px"><Typography variant="h1" component="span">?</Typography></Box>}




            </Container>


        </div>
    );
};

export default Game;