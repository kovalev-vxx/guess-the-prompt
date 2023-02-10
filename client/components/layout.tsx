import React, {FC} from 'react';
import Header from "@/components/Header";

type LayoutProps = {
    children: React.ReactNode
}

const Layout:FC<LayoutProps> = ({children}) => {
    return (

        <div className='content'>
            <Header/>
            {children}
        </div>
    );
};

export default Layout;