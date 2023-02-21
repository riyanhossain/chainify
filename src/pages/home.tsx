import React, { useContext, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import { reset } from "../features/walletConnectSlice";
import { ConnectContext } from "../store/connector";
import { useAppDispatch } from "../store/hooks";
import styles from "../styles/home.module.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box, Button } from "@mui/material";
import UploadPostImage from "../components/upload/uploadfile";
import NftTable from "../components/table/table";

export default function Home() {

    // get the connector from the context
    const connector = useContext(ConnectContext);
    
    // get the dispatch function from the redux store
    const dispatch = useAppDispatch();

    // this is the hook that runs when the page loads and when the connector changes
    useEffect(() => {
        connector.on("disconnect", (error, payload) => {
            console.log("disconnect", error, payload);
            // function to run when wallet is disconnected
            console.log("%cOn disconnect", "background: yellow");
            if (error) {
                throw error;
            }

            // reset the redux store
            dispatch(reset());
        });

        // cleanup function
        return () => {

            // unsubscribe from events
            connector.off("connect");
            connector.off("session_update");
            connector.off("disconnect");
        };
    }, [connector, dispatch]);

    return (
        <section className={`${styles.section}`}>

            {/* navbar */}
            <Navbar />

            <Box
                sx={{
                    px: "1rem",
                    height: "calc(100vh - 105px)",
                }}
            >

                {/* main container */}
                <Grid container spacing={2} sx={{}}>
                    <Grid xs={9.5}>

                        {/* upload container */}
                        <Box
                            sx={{
                                height: "202px",
                                backgroundColor: "#161616",
                                borderRadius: "20px",
                                border: "1px solid #000000",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                p: "1.5rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "Montserrat",
                                    fontStyle: "normal",
                                    fontWeight: "700",
                                    fontSize: "30px",
                                    letterSpacing: "0.01em",

                                    /* Text/Text 1 */

                                    color: "#F2F0FF",

                                    textShadow: "2px 4px 12px rgba(0, 0, 0, 0.64)",
                                }}
                            >
                                Upload
                            </p>

                            {/* upload image component */}
                            <UploadPostImage />
                        </Box>


                        {/* files container */}

                        <Box
                            sx={{
                                minHeight: "calc(100vh - 90px - 202px - 2rem)",
                                backgroundColor: "#161616",
                                borderRadius: "20px",
                                border: "1px solid #000000",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                p: "1.5rem",
                                mt: 2,
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
                                        fontFamily: "Montserrat",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "30px",
                                        letterSpacing: "0.01em",

                                        /* Text/Text 1 */

                                        color: "#F2F0FF",

                                        textShadow: "2px 4px 12px rgba(0, 0, 0, 0.64)",
                                    }}
                                >
                                    Files
                                </p>

                                <Box
                                    sx={{
                                        position: "relative",
                                    }}
                                >
                                    <input
                                        type="search"
                                        style={{
                                            width: "317px",
                                            height: "40px",
                                            background: "#242323",
                                            border: "1.5px solid #0368FF",
                                            boxSizing: "border-box",
                                            borderRadius: "50px",
                                            padding: "7px 1rem",
                                            color: "#F2F0FF",
                                            fontFamily: "Montserrat",
                                            fontStyle: "normal",
                                            fontWeight: "normal",
                                            fontSize: "16px",
                                            lineHeight: "20px",
                                            letterSpacing: "0.01em",

                                            paddingLeft: "2.5rem",
                                        }}
                                        placeholder="Search ..."
                                    />

                                    <Box
                                        sx={{
                                            position: "absolute",
                                            left: "1rem",
                                            top: "12px",
                                        }}
                                    >
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M14.3034 13.3197L11.708 10.7433C12.7154 9.4862 13.2033 7.89056 13.0713 6.28449C12.9393 4.67843 12.1974 3.18402 10.9983 2.10855C9.79906 1.03307 8.2337 0.458281 6.62404 0.50236C5.01437 0.54644 3.48276 1.20604 2.34413 2.34553C1.2055 3.48503 0.546404 5.0178 0.502358 6.62869C0.458312 8.23957 1.03267 9.80612 2.10733 11.0062C3.18198 12.2063 4.67526 12.9488 6.2801 13.0809C7.88495 13.213 9.47938 12.7247 10.7355 11.7165L13.31 14.2929C13.3751 14.3585 13.4524 14.4106 13.5377 14.4462C13.6229 14.4817 13.7144 14.5 13.8067 14.5C13.8991 14.5 13.9905 14.4817 14.0758 14.4462C14.161 14.4106 14.2384 14.3585 14.3034 14.2929C14.4295 14.1624 14.5 13.9879 14.5 13.8063C14.5 13.6248 14.4295 13.4503 14.3034 13.3197ZM6.81088 11.7165C5.84233 11.7165 4.89552 11.4291 4.0902 10.8905C3.28488 10.352 2.65721 9.58664 2.28656 8.69113C1.91591 7.79563 1.81893 6.81024 2.00789 5.85957C2.19684 4.90891 2.66324 4.03567 3.34811 3.35028C4.03298 2.66489 4.90556 2.19813 5.8555 2.00903C6.80545 1.81993 7.79009 1.91699 8.68491 2.28792C9.57974 2.65885 10.3446 3.287 10.8827 4.09293C11.4208 4.89886 11.708 5.84638 11.708 6.81567C11.708 8.11545 11.192 9.36199 10.2736 10.2811C9.35526 11.2001 8.10967 11.7165 6.81088 11.7165Z"
                                                fill="#0368FF"
                                            />
                                        </svg>
                                    </Box>
                                </Box>

                                <Button>
                                    <svg width="44" height="10" viewBox="0 0 44 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M22 0.166626C21.0441 0.166626 20.1096 0.450096 19.3147 0.98119C18.5199 1.51228 17.9004 2.26715 17.5346 3.15032C17.1688 4.0335 17.073 5.00532 17.2595 5.9429C17.446 6.88047 17.9064 7.74169 18.5823 8.41764C19.2583 9.0936 20.1195 9.55393 21.0571 9.74042C21.9946 9.92692 22.9665 9.8312 23.8496 9.46538C24.7328 9.09956 25.4877 8.48005 26.0188 7.68522C26.5499 6.89038 26.8333 5.9559 26.8333 4.99996C26.8333 3.71808 26.3241 2.4887 25.4177 1.58228C24.5113 0.675852 23.2819 0.166626 22 0.166626ZM5.08334 0.166626C4.12739 0.166626 3.19292 0.450096 2.39808 0.98119C1.60324 1.51228 0.983741 2.26715 0.617918 3.15032C0.252094 4.0335 0.156378 5.00532 0.342873 5.9429C0.529369 6.88047 0.989699 7.74169 1.66565 8.41764C2.34161 9.0936 3.20282 9.55393 4.1404 9.74042C5.07797 9.92692 6.0498 9.8312 6.93297 9.46538C7.81615 9.09956 8.57101 8.48005 9.10211 7.68522C9.6332 6.89038 9.91667 5.9559 9.91667 4.99996C9.91667 3.71808 9.40744 2.4887 8.50102 1.58228C7.59459 0.675852 6.36522 0.166626 5.08334 0.166626ZM38.9167 0.166626C37.9607 0.166626 37.0262 0.450096 36.2314 0.98119C35.4366 1.51228 34.8171 2.26715 34.4513 3.15032C34.0854 4.0335 33.9897 5.00532 34.1762 5.9429C34.3627 6.88047 34.823 7.74169 35.499 8.41764C36.1749 9.0936 37.0362 9.55393 37.9737 9.74042C38.9113 9.92692 39.8831 9.8312 40.7663 9.46538C41.6495 9.09956 42.4043 8.48005 42.9354 7.68522C43.4665 6.89038 43.75 5.9559 43.75 4.99996C43.75 3.71808 43.2408 2.4887 42.3344 1.58228C41.4279 0.675852 40.1985 0.166626 38.9167 0.166626Z"
                                            fill="#F2F0FF"
                                        />
                                    </svg>
                                </Button>
                            </Box>

                            <Box
                                sx={{
                                    mt: 2,
                                }}
                            >

                                {/* tables of nfts files */}
                                <NftTable />
                            </Box>
                        </Box>
                    </Grid>

                    {/* right side container for nft details */}
                    <Grid xs={2.5}>

                        {/* nft details container */}
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
