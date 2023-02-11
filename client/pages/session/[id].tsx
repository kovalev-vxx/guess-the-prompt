import React from 'react';
import {useRouter} from "next/router";

const Sessions = () => {
    const router = useRouter()
    const {id} = router.query

    return (
        <div>
            <h1>Здарова</h1>
            <h2>{id}</h2>
        </div>
    );
};

export default Sessions;