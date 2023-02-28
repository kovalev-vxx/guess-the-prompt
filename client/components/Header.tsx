import React from 'react';
import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Link from "next/link";

const Header = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg" sx={{display: "flex", justifyContent: "center"}}>
                <Link href={"/"} legacyBehavior>
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
                        <ManageSearchIcon fontSize="large" sx={{mr: 1, fontWeight: 700, paddingBottom: 0.3}}/>
                    </Toolbar>
                </Link>
            </Container>
        </AppBar>
    );
};

export default Header;