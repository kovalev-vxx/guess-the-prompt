import React, { FC } from 'react';
import {Button, ListItem} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ListItemText from "@mui/material/ListItemText";
import { IUser } from '@/models/IUser';
import PersonIcon from '@mui/icons-material/Person';

type PlayerListItemProps = {
    player: IUser
}


const PlayerListItem:FC<PlayerListItemProps> = ({player}) => {
    return (
        <ListItem key={player.id}
                  secondaryAction={
                      <>

                          {/*{session.owner.id === socket.id && <IconButton edge="end" sx={{mr:1}} aria-label="delete">*/}
                          {/*    <Button onClick={close}>Закрыть</Button>*/}
                          {/*</IconButton>}*/}
                          {/*<Button onClick={join} variant="contained">Войти</Button>*/}
                      </>
                  }
        >
            <ListItemAvatar>
                <Avatar>
                    <PersonIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`${player.username}`}
                // secondary={`owned by ${session.owner.username}`}
            />
        </ListItem>
    );
};

export default PlayerListItem;