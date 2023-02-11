import {Button, ListItem } from '@mui/material';
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

type SessionListItemProps = {
    session: ISession
}

const SessionListItem:FC<SessionListItemProps> = ({session}) => {

    const join = () => {
        socket.emit("join-session", {id:session.id})
    }

    return (
        <ListItem key={session.id}
                  secondaryAction={
                      <>

                          {session.owner.id === socket.id && <IconButton edge="end" sx={{mr:1}} aria-label="delete">
                              <Button>Закрыть</Button>
                          </IconButton>}
                          <Button onClick={join} variant="contained">Войти</Button>
                      </>
                  }
        >
            <ListItemAvatar>
                <Avatar>
                    <SportsEsportsIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`Открытая сессия с ${session.clients} игроками`}
                secondary={`owned by ${session.owner.username}`}
            />
        </ListItem>
    );
};

export default SessionListItem;