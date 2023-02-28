import React from 'react';
import {List} from "@mui/material";
import {useAppSelector} from "@/hooks/redux";
import PlayerListItem from "@/components/PlayerListItem";

const PlayersList = () => {
    const {currentSession} = useAppSelector(state => state.session)
    const clients = currentSession?.clients

    return (
        <>
            {
                clients && (
                    <List>
                        {
                            clients.map(player => <PlayerListItem key={player.id} player={player}/>)
                        }
                    </List>
                )
            }
        </>

    );
};

export default PlayersList;