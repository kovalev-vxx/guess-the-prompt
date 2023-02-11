import React, {FC} from 'react';
import Header from "@/components/Header";
import {Box, Container} from "@mui/material";

type LayoutProps = {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (

        <div className='content'>
            <Header/>
            <Container sx={{paddingY: "2rem"}} maxWidth="lg">
                {children}
            </Container>
        </div>
    );
};

export default Layout;