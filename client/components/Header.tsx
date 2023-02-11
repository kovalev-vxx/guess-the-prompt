import React from 'react';
import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {useAppSelector} from "@/hooks/redux";

const Header = () => {
    const user = useAppSelector(state => state.user)
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}>
                        Guess the prompt</Typography>
                    <h3>{user.user.username}</h3>
                    <ManageSearchIcon fontSize="large" sx={{mr: 1, fontWeight: 700, paddingBottom:0.3}}/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;