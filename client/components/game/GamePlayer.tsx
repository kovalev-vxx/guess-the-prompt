import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import {Button, TextField, TextFieldClasses} from "@mui/material";
import {socket} from "@/pages/_app";

interface GamePlayerProps {
    gameState: string
}

const GamePlayer:FC<GamePlayerProps> = ({gameState}) => {
    const [guessInput, setGuessInput] = useState<string>("")
    const guessInputHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setGuessInput(event.target.value)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        const input = inputRef.current
        if(input){
            input.value = ""
        }
    }, [gameState])

    const guessBtn = () => {
        socket.emit("guess", {guess:guessInput})
    }
    return (
        <>
            {<TextField ref={inputRef} onChange={guessInputHandler} fullWidth label="Ввести отгадку"/>}
            <Button onClick={guessBtn} disabled={gameState!=="WAITING_GUESSES"} variant="contained">Отдагать</Button>
        </>
    );
};

export default GamePlayer;