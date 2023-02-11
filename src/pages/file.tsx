import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileNavbar from "../components/navbar/filenavbar";
import GetImageByType from "../utils/GetImageByType";

export default function File() {
    const { id } = useParams<string>();

    const [data, setData] = React.useState<any>({});
    const fetchSingleFile = useCallback(async () => {
        const response = await fetch(
            "../../data.json",

            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        const data = await response.json();

        const filteredData = data.filter((file: any) => file.assetID === Number(id));

        setData(filteredData[0]);
    }, [id]);

    React.useEffect(() => {
        fetchSingleFile();
    }, [fetchSingleFile]);

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
            }}
        >
            <FileNavbar />
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
                                height: "90px",
                                backgroundColor: "#161616",
                                borderRadius: "20px",
                                border: "1px solid #000000",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                p: "0.5rem 1rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2rem",
                                }}
                            >
                                <GetImageByType type={data.mimetype} />

                                <p
                                    style={{
                                        fontFamily: "Montserrat",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "30px",
                                        lineHeight: "36px",
                                        /* identical to box height, or 100% */

                                        letterSpacing: "0.01em",

                                        /* Text/Text 1 */

                                        color: "#F2F0FF",

                                        textShadow: "2px 4px 12px rgba(0, 0, 0, 0.64)",

                                        margin: 0,

                                        padding: 0,

                                        border: 0,
                                    }}
                                >
                                    {data.file_name}
                                </p>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        fontFamily: "Lato",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        fontSize: "10px",
                                        lineHeight: "16px",
                                        border: "none",
                                        letterSpacing: "0.04em",
                                        color: "#F2F0FF",
                                        cursor: "pointer",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "0.3rem",
                                        background: "none",
                                        boxShadow: "none",
                                        "&:hover": {
                                            background: "none",
                                            boxShadow: "none",
                                        },
                                    }}
                                >
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13.059 17.2574L8.27401 22.0424C7.69468 22.6015 6.92096 22.914 6.11582 22.914C5.31068 22.914 4.53696 22.6015 3.95762 22.0424C3.67349 21.7594 3.44803 21.423 3.2942 21.0527C3.14036 20.6823 3.06117 20.2852 3.06117 19.8842C3.06117 19.4832 3.14036 19.0861 3.2942 18.7157C3.44803 18.3454 3.67349 18.009 3.95762 17.726L8.74265 12.941C8.97487 12.7088 9.10534 12.3938 9.10534 12.0654C9.10534 11.7369 8.97487 11.422 8.74265 11.1898C8.51042 10.9575 8.19546 10.8271 7.86704 10.8271C7.53862 10.8271 7.22365 10.9575 6.99143 11.1898L2.2064 15.9871C1.24244 17.0364 0.721096 18.4174 0.751254 19.842C0.781412 21.2665 1.36074 22.6243 2.36825 23.6318C3.37575 24.6393 4.73354 25.2186 6.15805 25.2488C7.58257 25.2789 8.96366 24.7576 10.0129 23.7936L14.8103 19.0086C15.0425 18.7764 15.1729 18.4614 15.1729 18.133C15.1729 17.8046 15.0425 17.4896 14.8103 17.2574C14.578 17.0251 14.2631 16.8947 13.9346 16.8947C13.6062 16.8947 13.2913 17.0251 13.059 17.2574ZM23.6404 2.35966C22.6029 1.32867 21.1997 0.75 19.7371 0.75C18.2745 0.75 16.8713 1.32867 15.8339 2.35966L11.0365 7.14468C10.9215 7.25967 10.8303 7.39618 10.7681 7.54642C10.7058 7.69665 10.6738 7.85768 10.6738 8.02029C10.6738 8.18291 10.7058 8.34393 10.7681 8.49417C10.8303 8.64441 10.9215 8.78092 11.0365 8.8959C11.1515 9.01089 11.288 9.1021 11.4382 9.16433C11.5885 9.22656 11.7495 9.25859 11.9121 9.25859C12.0747 9.25859 12.2358 9.22656 12.386 9.16433C12.5362 9.1021 12.6727 9.01089 12.7877 8.8959L17.5728 4.11088C18.1521 3.55175 18.9258 3.23928 19.7309 3.23928C20.5361 3.23928 21.3098 3.55175 21.8891 4.11088C22.1733 4.39389 22.3987 4.73023 22.5526 5.10059C22.7064 5.47095 22.7856 5.86804 22.7856 6.26907C22.7856 6.67011 22.7064 7.0672 22.5526 7.43756C22.3987 7.80792 22.1733 8.14425 21.8891 8.42727L17.1041 13.2123C16.9885 13.3269 16.8968 13.4633 16.8342 13.6136C16.7716 13.7639 16.7393 13.9251 16.7393 14.0879C16.7393 14.2507 16.7716 14.4119 16.8342 14.5622C16.8968 14.7125 16.9885 14.8489 17.1041 14.9635C17.2188 15.0791 17.3552 15.1709 17.5054 15.2335C17.6557 15.2961 17.8169 15.3283 17.9797 15.3283C18.1425 15.3283 18.3037 15.2961 18.454 15.2335C18.6043 15.1709 18.7407 15.0791 18.8553 14.9635L23.6404 10.1662C24.6714 9.12872 25.25 7.72551 25.25 6.26291C25.25 4.8003 24.6714 3.39709 23.6404 2.35966ZM9.01396 16.986C9.1292 17.1003 9.26586 17.1908 9.41612 17.2521C9.56638 17.3135 9.72727 17.3446 9.88958 17.3437C10.0519 17.3446 10.2128 17.3135 10.363 17.2521C10.5133 17.1908 10.65 17.1003 10.7652 16.986L16.8328 10.9184C17.065 10.6862 17.1955 10.3712 17.1955 10.0428C17.1955 9.71441 17.065 9.39945 16.8328 9.16722C16.6006 8.93499 16.2856 8.80453 15.9572 8.80453C15.6288 8.80453 15.3138 8.93499 15.0816 9.16722L9.01396 15.2348C8.89837 15.3495 8.80663 15.4859 8.74402 15.6362C8.68141 15.7864 8.64917 15.9476 8.64917 16.1104C8.64917 16.2732 8.68141 16.4344 8.74402 16.5847C8.80663 16.735 8.89837 16.8714 9.01396 16.986Z"
                                            fill="#F2F0FF"
                                        />
                                    </svg>
                                    Copy link
                                </Button>

                                <Button
                                    variant="contained"
                                    sx={{
                                        fontFamily: "Lato",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        fontSize: "10px",
                                        lineHeight: "16px",
                                        border: "none",
                                        letterSpacing: "0.04em",
                                        color: "#F2F0FF",
                                        cursor: "pointer",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "0.3rem",
                                        background: "none",
                                        boxShadow: "none",
                                        "&:hover": {
                                            background: "none",
                                            boxShadow: "none",
                                        },
                                    }}
                                >
                                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M21.4776 0.697342L3.28208 6.76252C2.56509 7.00298 1.9397 7.45871 1.49119 8.06759C1.04268 8.67647 0.792868 9.40885 0.775814 10.1649C0.758761 10.9209 0.975296 11.6639 1.3959 12.2923C1.8165 12.9208 2.4207 13.4043 3.12612 13.6768L9.85847 16.2502C10.0181 16.3155 10.1632 16.412 10.2852 16.534C10.4072 16.6559 10.5036 16.801 10.569 16.9607L13.1423 23.693C13.3619 24.2649 13.7209 24.7728 14.1867 25.1707C14.6525 25.5685 15.2103 25.8436 15.8095 25.9711C16.4087 26.0985 17.0302 26.0741 17.6176 25.9002C18.205 25.7263 18.7396 25.4084 19.1728 24.9754C19.5745 24.5656 19.8794 24.0712 20.0653 23.5284L26.1305 5.33287C26.3443 4.68614 26.3742 3.99272 26.2169 3.32997C26.0596 2.66722 25.7213 2.06121 25.2396 1.57955C24.7579 1.0979 24.1519 0.759541 23.4892 0.602233C22.8264 0.444925 22.133 0.474852 21.4863 0.688677L21.4776 0.697342ZM23.7997 4.56173L17.7345 22.7573C17.6517 22.993 17.4988 23.1979 17.2963 23.3443C17.0938 23.4907 16.8514 23.5716 16.6015 23.5764C16.3517 23.5811 16.1064 23.5093 15.8985 23.3706C15.6906 23.232 15.5301 23.0331 15.4384 22.8006L12.8564 16.0769C12.8211 15.988 12.7806 15.9012 12.7351 15.817L18.705 9.8471C18.9348 9.6173 19.0639 9.30563 19.0639 8.98064C19.0639 8.65566 18.9348 8.34399 18.705 8.11419C18.4752 7.88439 18.1635 7.75529 17.8385 7.75529C17.5135 7.75529 17.2019 7.88439 16.9721 8.11419L11.0022 14.0841C10.918 14.0386 10.8312 13.9981 10.7422 13.9628L4.01856 11.3807C3.78609 11.2891 3.58718 11.1286 3.44852 10.9207C3.30987 10.7128 3.23808 10.4675 3.24279 10.2176C3.24751 9.96778 3.3285 9.72535 3.4749 9.52284C3.6213 9.32033 3.82612 9.16742 4.06189 9.08462L22.2574 3.01944C22.4721 2.95022 22.7016 2.94159 22.9209 2.99448C23.1401 3.04736 23.3405 3.15973 23.5 3.3192C23.6594 3.47867 23.7718 3.67905 23.8247 3.89828C23.8776 4.11751 23.8689 4.34709 23.7997 4.56173V4.56173Z"
                                            fill="#F2F0FF"
                                        />
                                    </svg>
                                    Share
                                </Button>

                                <Button
                                    variant="contained"
                                    sx={{
                                        fontFamily: "Lato",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        fontSize: "10px",
                                        lineHeight: "16px",
                                        border: "none",
                                        letterSpacing: "0.04em",
                                        color: "#F2F0FF",
                                        cursor: "pointer",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "0.3rem",
                                        background: "none",
                                        boxShadow: "none",
                                        "&:hover": {
                                            background: "none",
                                            boxShadow: "none",
                                        },
                                    }}
                                >
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M24.025 15.45C23.7001 15.45 23.3885 15.5791 23.1588 15.8088C22.9291 16.0385 22.8 16.3501 22.8 16.675V21.575C22.8 21.8999 22.6709 22.2115 22.4412 22.4412C22.2115 22.6709 21.8999 22.8 21.575 22.8H4.425C4.10011 22.8 3.78853 22.6709 3.55879 22.4412C3.32906 22.2115 3.2 21.8999 3.2 21.575V16.675C3.2 16.3501 3.07094 16.0385 2.84121 15.8088C2.61147 15.5791 2.29989 15.45 1.975 15.45C1.65011 15.45 1.33853 15.5791 1.10879 15.8088C0.879062 16.0385 0.75 16.3501 0.75 16.675V21.575C0.75 22.5497 1.13719 23.4844 1.82638 24.1736C2.51558 24.8628 3.45033 25.25 4.425 25.25H21.575C22.5497 25.25 23.4844 24.8628 24.1736 24.1736C24.8628 23.4844 25.25 22.5497 25.25 21.575V16.675C25.25 16.3501 25.1209 16.0385 24.8912 15.8088C24.6615 15.5791 24.3499 15.45 24.025 15.45ZM12.1302 17.5448C12.2468 17.6563 12.3841 17.7437 12.5345 17.802C12.6811 17.8668 12.8397 17.9003 13 17.9003C13.1603 17.9003 13.3189 17.8668 13.4655 17.802C13.6159 17.7437 13.7532 17.6563 13.8698 17.5448L18.7697 12.6448C19.0004 12.4141 19.13 12.1012 19.13 11.775C19.13 11.4488 19.0004 11.1359 18.7697 10.9053C18.5391 10.6746 18.2262 10.545 17.9 10.545C17.5738 10.545 17.2609 10.6746 17.0303 10.9053L14.225 13.7228V1.975C14.225 1.65011 14.0959 1.33853 13.8662 1.10879C13.6365 0.879062 13.3249 0.75 13 0.75C12.6751 0.75 12.3635 0.879062 12.1338 1.10879C11.9041 1.33853 11.775 1.65011 11.775 1.975V13.7228L8.96975 10.9053C8.85553 10.791 8.71994 10.7004 8.57071 10.6386C8.42147 10.5768 8.26153 10.545 8.1 10.545C7.93847 10.545 7.77853 10.5768 7.62929 10.6386C7.48006 10.7004 7.34447 10.791 7.23025 10.9053C7.11603 11.0195 7.02543 11.1551 6.96362 11.3043C6.9018 11.4535 6.86999 11.6135 6.86999 11.775C6.86999 11.9365 6.9018 12.0965 6.96362 12.2457C7.02543 12.3949 7.11603 12.5305 7.23025 12.6448L12.1302 17.5448Z"
                                            fill="#F2F0FF"
                                        />
                                    </svg>
                                    Download
                                </Button>
                                <button
                                    style={{
                                        fontFamily: "Montserrat",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        background: "#0368FF",
                                        borderRadius: "100px",
                                        border: "none",
                                        letterSpacing: "0.04em",
                                        color: "#F2F0FF",
                                        padding: "0.3rem 1rem",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => navigate("/")}
                                >
                                    Home
                                </button>
                            </Box>
                        </Box>

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
                                    mt: 2,
                                }}
                            ></Box>
                        </Box>
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
                                        /* identical to box height, or 100% */

                                        letterSpacing: "0.01em",

                                        /* Text/Text 1 */

                                        color: "#F2F0FF",

                                        textShadow: "2px 4px 12px rgba(0, 0, 0, 0.64)",
                                    }}
                                >
                                    Info
                                </p>
                            </Box>

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
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        Owner
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
                                        0000
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
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        ID
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
                                        0000
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
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        Chain
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        Algorand
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
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        Cost
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        0.01
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
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        Asset creation
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        Explorer link
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
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        Header transaction
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: "Lato",
                                            fontStyle: "normal",
                                            fontWeight: "700",
                                            fontSize: "18px",
                                            lineHeight: "22px",

                                            /* Text/Text 2 */

                                            color: "#B5B3BC",
                                        }}
                                    >
                                        Explorer link
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
        </Box>
    );
}
