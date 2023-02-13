import React, {FC} from 'react';
import Header from "@/components/Header";
import {Box, Container} from "@mui/material";

type LayoutProps = {
    children: React.ReactNode,
    className?: string
}

const Layout: FC<LayoutProps> = ({children, className}) => {
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