import React, { useContext, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import { reset } from "../features/walletConnectSlice";
import { ConnectContext } from "../store/connector";
import { useAppDispatch } from "../store/hooks";
import styles from "../styles/home.module.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box, Typography } from "@mui/material";

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

            <Box
                sx={{
                    px: "1rem",
                    height: "calc(100vh - 105px)",
                }}
            >
                <Grid container spacing={2} sx={{}}>
                    <Grid xs={9.5}>
                        <Box
                            sx={{
                                height: "202px",
                                backgroundColor: "#161616",
                                borderRadius: "20px",
                                border: "1px solid #000000",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            }}
                        ></Box>
                    </Grid>
                    <Grid xs={2.5}>
                        <Box
                            sx={{
                                height: "calc(100vh - 105px)",
                                backgroundColor: "#161616",
                                borderRadius: "20px",
                                border: "1px solid #000000",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                p: "1rem",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "Montserrat",
                                    fontStyle: "normal",
                                    fontWeight: "700",
                                    fontSize: "30px",
                                    /* identical to box height, or 100% */

                                    letterSpacing: "0.01em",

                                    /* Text/Text 1 */

                                    color: "#F2F0FF",

                                    textShadow: "2px 4px 12px rgba(0, 0, 0, 0.64)",
                                }}
                            >
                                Assets
                            </p>

                            <Box
                                sx={{
                                    mt: "1.5rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "22px",
                                            lineHeight: "26px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        Asset name - 1
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        1.25 DFG
                                    </p>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "22px",
                                            lineHeight: "26px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        Asset name - 2
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        24.58 AA
                                    </p>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "22px",
                                            lineHeight: "26px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        Asset name - 3
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        25 LBO
                                    </p>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </section>
    );
}
