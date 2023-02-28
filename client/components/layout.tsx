import React, {FC} from 'react';
import Header from "@/components/Header";
import {Box, Container} from "@mui/material";
import {useSocket} from "@/hooks/useSocket";
import {socket} from "@/pages/_app";

type LayoutProps = {
    children: React.ReactNode,
    className?: string
}

const Layout: FC<LayoutProps> = ({children, className}) => {
    useSocket(socket)

    return (
        <div className={`content ${className}`}>
            <Header/>
            <Container sx={{paddingY: "2rem"}} maxWidth="lg">
                {children}
            </Container>
        </div>
    );
};

export default Layout;