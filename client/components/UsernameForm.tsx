import React, {ChangeEvent, useMemo, useState} from 'react';
import {Button, Container, TextField, Typography} from "@mui/material";
import {socket} from "@/pages/_app";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";

const UsernameForm = () => {
    const [username, setUsername] = useState<string>("")
    const [helperText, setHelperText] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const user = useAppSelector(state => state.user.user)
    // const { username, setUsername } = useUser()

    const createRoom = () => {
        socket.emit("create-session")
    }

    const auth = () => {
        if (!error && username.length) {
            socket.emit("auth", {username: username})
        } else {
            setError(true)
            setHelperText("Username is required")
        }
    }

    const usernameOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setUsername(() => {
            setError(false)
            setHelperText("")
            if (event.target.value.length < 3 && event.target.value.length >= 1) {
                setError(true)
                setHelperText("User name at least 3 characters")
            }
            return event.target.value
        })
    }


    return (
        <Container maxWidth="sm" sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
            <Button fullWidth={false} onClick={createRoom} variant="contained">Создать сессию</Button>
            {/*{user.username ?*/}
            {/*    <>*/}
            {/*        <Typography variant="h5" component="span">Добро пожаловать, {user.username}</Typography>*/}
            {/*        <Button fullWidth={false} onClick={createRoom} variant="contained">Создать сессию</Button>*/}
            {/*    </>*/}
            {/*    :*/}
            {/*    <>*/}
            {/*        <TextField sx={{marginY: "auto"}} error={error} helperText={helperText} fullWidth*/}
            {/*                   onChange={usernameOnChange} id="outlined-basic" label="Your username"*/}
            {/*                   variant="outlined"/>*/}
            {/*        <Button fullWidth={false} onClick={auth} variant="contained">Войти</Button>*/}
            {/*    </>*/}
            {/*}*/}
        </Container>
    );
};

export default UsernameForm;