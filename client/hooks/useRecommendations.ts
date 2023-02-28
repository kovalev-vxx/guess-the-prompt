import {useEffect, useState} from "react";
import axios from "axios";

export const useRecommendations = () => {
    const [message, setMessage] = useState<string>("")
    const [recommendations, setRecommendations] = useState<string>("")

    const getRec = async () => {
        const { data } = await axios.get(`https://d8d9-35-190-175-40.ngrok.io/phrase/${message}`)
        setRecommendations(data.suggestions)
    }

    useEffect(() => {
        getRec()
    }, [getRec, message])

    return {recommendations, setMessage}
}