import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {socket} from "@/pages/_app";
import {useRecommendations} from "@/hooks/useRecommendations";

interface GameLeaderProps {
    gameState: string
}

const GameLeader: FC<GameLeaderProps> = ({gameState}) => {
    const [promptInput, setPromptInput] = useState<string>("")

    const inputRef = useRef<HTMLInputElement>(null)
    const {recommendations, setMessage} = useRecommendations()

    useEffect(()=>{
        const input = inputRef.current
        if(input){
            input.value = ""
        }
    }, [gameState])


    const promptBtn = () => {
        socket.emit("prompt", {prompt:promptInput})
    }

    const promptInputHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value)
        setPromptInput(event.target.value)
    }

    return (
        <>
            {<TextField ref={inputRef} onChange={promptInputHandler} fullWidth label="Введите запрос"/>}
            <span>{recommendations}</span>
            <Button onClick={promptBtn} disabled={gameState !== "WAITING_PROMPT"} variant="contained">Загадать</Button>
        </>
    );
};

export default GameLeader;