import React from 'react';
import {List} from "@mui/material";
import {useAppSelector} from "@/hooks/redux";
import SessionListItem from "@/components/SessionListItem";

const SessionsList = () => {
    const {sessions} = useAppSelector(state => state.session)
    return (
        <List>
            {
                sessions.map(session => <SessionListItem key={session.id} session={session}/>)
            }
        </List>
    );
};

export default SessionsList;