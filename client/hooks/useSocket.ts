import {Socket} from "socket.io-client";
import {useAppDispatch} from "@/hooks/redux";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {ISession, ISessionDefaultValues} from "@/models/ISession";
import {setCurrentSession, setSessions} from "@/store/actions/sessionActions";
import {IUser} from "@/models/IUser";
import {setUser} from "@/store/actions/userActions";
import {IGame} from "@/models/IGame";
import {updateGame} from "@/store/actions/gameActions";

export const useSocket = (socket: Socket) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        socket.emit("session-list")

        socket.on("session-error", (msg) => {
            console.log(msg, socket.id)
        })

        socket.on("session-list", (sessions: ISession[]) => {
            dispatch(setSessions(sessions))
        })

        socket.on("join-session", (session: ISession) => {
            dispatch(setCurrentSession(session))
            router.push(`/session/${session.id}`)
        })

        socket.on("auth", (user: IUser) => {
            console.log(user)
            dispatch(setUser(user))
        })
        socket.on("leave-session", () => {
            dispatch(setCurrentSession(ISessionDefaultValues))
            router.push("/")
        })
        socket.on("game-started", async ({id}: ISession) => {
            await router.push(`/game/${id}`)
        })
        socket.on("game", (game: IGame) => {
            dispatch(updateGame(game))
        })
        socket.on("game-finished", async () => {
            await router.push(`/`)
        })

    }, [router, dispatch, socket])
}