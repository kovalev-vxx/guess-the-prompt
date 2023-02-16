import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import {socket} from "@/pages/_app";
import GamePlayer from "@/components/game/GamePlayer";
import GameLeader from '@/components/game/GameLeader';

const ai_link: string = "http://6d06-34-142-173-65.ngrok.io/image/"

const Game = () => {
    const router = useRouter()
    const {id} = router.query
    const {currentSession, sessions} = useAppSelector(state => state.session)
    const {user} = useAppSelector(state => state.user)
    const {game} = useAppSelector(state => state.game)
    const dispatch = useAppDispatch()
    const {currentRound, maxRounds, players, leader, prompt} = game


    const isLeader = useMemo(() => {
        return user.id === leader.id
    }, [leader, user])

    const [image, setImage] = useState<string>("")
    
    useEffect(()=>{
        socket.on("image", (image)=>{
            setImage(image)
        })
    }, [])


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
                        <GameLeader gameState={game.state}/>
                        :
                        <GamePlayer gameState={game.state}/>
                }

                {prompt ?
                    <img src={`data:image/jpeg;base64,${image}`} height="512px" width="512px" alt="ai image"/>
                    :
                    <Box width="512px" textAlign="center"
                         sx={{display: "flex", background:"whitesmoke", border:"solid", alignItems: "center", justifyContent: "center"}}
                         height="512px"><Typography variant="h1" component="span">?</Typography></Box>}

            </Container>


        </div>
    );
};

export default Game;