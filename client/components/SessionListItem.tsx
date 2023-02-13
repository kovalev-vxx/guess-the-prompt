import {Box, Button, ListItem } from '@mui/material';
import React, {FC} from 'react';
import {ISession} from "@/models/ISession";
import {socket} from "@/pages/_app";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";

type SessionListItemProps = {
    session: ISession
}

const SessionListItem:FC<SessionListItemProps> = ({session}) => {

    const join = () => {
        socket.emit("join-session", {id:session.id})
    }

    const close = () => {
        socket.emit("close-session", session)
    }

    return (
        <ListItem key={session.id}
                  secondaryAction={
                      <Box sx={{display:"flex", alignItems:"center", gap:"0.5rem"}}>
                          {session.owner.id === socket.id && <IconButton edge="end" aria-label="delete">
                              <Button onClick={close}>Закрыть</Button>
                          </IconButton>}
                          <PersonIcon/>
                          <span>{session.clients_count}</span>
                          <Button onClick={join} variant="contained">Войти</Button>
                      </Box>
                  }
        >
            <ListItemAvatar>
                <Avatar>
                    <SportsEsportsIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`Открытая сессия`}
                secondary={`owned by ${session.owner.username}`}
            />



        </ListItem>
    );
};

export default SessionListItem;