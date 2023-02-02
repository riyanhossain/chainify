import React, { useContext, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import { reset } from "../features/walletConnectSlice";
import { ConnectContext } from "../store/connector";
import { useAppDispatch } from "../store/hooks";
import styles from "../styles/home.module.css";

export default function Home() {
    const connector = useContext(ConnectContext);

    const dispatch = useAppDispatch();

    // check  disconnect wallet
    useEffect(() => {
        connector.on("disconnect", (error, payload) => {
            console.log("disconnect", error, payload);
            // function to run when wallet is disconnected
            console.log("%cOn disconnect", "background: yellow");
            if (error) {
                throw error;
            }
            dispatch(reset());
        });

        return () => {
            connector.off("connect");
            connector.off("session_update");
            connector.off("disconnect");
        };
    }, [connector, dispatch]);

    return (
        <section className={styles.section}>
            <Navbar />
        </section>
    );
}
