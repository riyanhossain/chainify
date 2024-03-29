import { Box, Button, Hidden } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileNavbar from "../components/navbar/filenavbar";
import GetImageByType from "../utils/GetImageByType";
import algo from "../assets/algo.svg";
import { useGetSingleAssetQuery } from "../helpers/api";
import { getFileType } from "../utils/GetFileType";
import { getSizeByBytes } from "../utils/GetSizeByBytes";

export default function File() {
    // getting the assets id from the url for retrive the corresponding assets data
    const { id } = useParams<string>();

    // comment this section of code if you use the python api

    // start of the section of code that you need to comment if you use the python api

    // this state holds the data of the asset
    const [data, setData] = React.useState<any>({});

    // this function fetches the data of the asset from the api
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

        // filtering the data to get the data of the asset, which id is equal to the id in the url
        // if you use
        const filteredData = data.filter((file: any) => file.assetID === Number(id));

        setData(filteredData[0]);
    }, [id]);

    React.useEffect(() => {
        fetchSingleFile();
    }, [fetchSingleFile]);

    // end of the section of code that you need to comment if you use the python api


    // uncomment this below of code if you use the python api

    // const { data } = useGetSingleAssetQuery(id);


    // this is hooks for navigation

    const navigate = useNavigate();


    // this state holds the value of the hideDetails state for the details section of asset details
    const [hideDetails, setHideDetails] = React.useState<boolean>(false);

    return (
        <Box
            sx={{
                maxHeight: "100vh",
                overflowY: hideDetails ? "scroll" : "hidden",
            }}
        >
            <FileNavbar />
            <Box
                sx={{
                    px: "1rem",
                    maxHeight: "calc(100vh - 105px)",
                }}
            >
                <Grid container spacing={2} sx={{}}>
                    {/* if details section is hidden then the grid will be 11.3 else 9.5 */}
                    <Grid xs={hideDetails ? 11.3 : 9.5}>
                        <Box
                            sx={{
                                height: "82px",
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
                                {/* this commponent return the file icon based on the file type */}
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
                                height: hideDetails ? "100%" : "calc(100vh - 202px)",
                                backgroundColor: "#161616",
                                border: "1px solid #000000",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                mt: 2,
                            }}
                        >
                            <img
                                src={data.file}
                                alt="img"
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid xs={hideDetails ? 0.7 : 2.5}>

                        {/* if hideDetails is true, it will hide the details of the asset */}
                        {hideDetails ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                <Button
                                    sx={{
                                        background: "#161616",
                                        borderRadius: "20px",
                                        width: "75px",
                                        height: "82px",
                                    }}
                                    onClick={() => setHideDetails(!hideDetails)}
                                >
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M23.4067 16.7975C23.1159 16.6531 22.7797 16.63 22.4719 16.7334C22.1641 16.8368 21.9099 17.0581 21.7652 17.3487C20.9899 18.9145 19.81 20.2446 18.3478 21.2011C16.8856 22.1576 15.1943 22.7058 13.449 22.7889C11.7038 22.872 9.96801 22.487 8.42156 21.6737C6.87511 20.8605 5.57421 19.6485 4.6536 18.1635C3.733 16.6784 3.22617 14.9742 3.18561 13.2275C3.14506 11.4807 3.57225 9.75482 4.42294 8.22864C5.27363 6.70246 6.51689 5.43147 8.02393 4.54732C9.53097 3.66316 11.247 3.198 12.9942 3.20001C14.8209 3.1921 16.6127 3.69936 18.1641 4.66358C19.7155 5.62779 20.9636 7.00989 21.7652 8.65125C21.9114 8.94365 22.1678 9.166 22.4779 9.26938C22.7881 9.37276 23.1266 9.3487 23.419 9.2025C23.7114 9.0563 23.9337 8.79993 24.0371 8.4898C24.1405 8.17966 24.1164 7.84116 23.9702 7.54875C22.7411 5.07517 20.712 3.08959 18.2124 1.91429C15.7128 0.738984 12.8893 0.442953 10.2003 1.07424C7.51123 1.70553 5.11446 3.22707 3.39898 5.39192C1.6835 7.55678 0.75 10.2379 0.75 13C0.75 15.7621 1.6835 18.4432 3.39898 20.6081C5.11446 22.7729 7.51123 24.2945 10.2003 24.9258C12.8893 25.557 15.7128 25.261 18.2124 24.0857C20.712 22.9104 22.7411 20.9248 23.9702 18.4512C24.0432 18.3059 24.0866 18.1475 24.0977 17.9853C24.1088 17.823 24.0876 17.6602 24.0351 17.5063C23.9827 17.3523 23.9001 17.2104 23.7922 17.0887C23.6843 16.967 23.5533 16.868 23.4067 16.7975ZM24.0192 11.775H12.2715L15.089 8.96975C15.2032 8.85554 15.2938 8.71994 15.3556 8.57071C15.4174 8.42148 15.4492 8.26153 15.4492 8.1C15.4492 7.93848 15.4174 7.77853 15.3556 7.6293C15.2938 7.48007 15.2032 7.34447 15.089 7.23026C14.9748 7.11604 14.8392 7.02544 14.6899 6.96362C14.5407 6.90181 14.3808 6.86999 14.2192 6.86999C14.0577 6.86999 13.8978 6.90181 13.7485 6.96362C13.5993 7.02544 13.4637 7.11604 13.3495 7.23026L8.44949 12.1303C8.33797 12.2468 8.25055 12.3841 8.19224 12.5345C8.06972 12.8327 8.06972 13.1673 8.19224 13.4655C8.25055 13.6159 8.33797 13.7532 8.44949 13.8697L13.3495 18.7697C13.4634 18.8846 13.5989 18.9757 13.7481 19.0379C13.8974 19.1001 14.0575 19.1321 14.2192 19.1321C14.381 19.1321 14.5411 19.1001 14.6903 19.0379C14.8396 18.9757 14.9751 18.8846 15.089 18.7697C15.2038 18.6559 15.2949 18.5204 15.3571 18.3711C15.4193 18.2218 15.4513 18.0617 15.4513 17.9C15.4513 17.7383 15.4193 17.5782 15.3571 17.4289C15.2949 17.2796 15.2038 17.1441 15.089 17.0302L12.2715 14.225H24.0192C24.3441 14.225 24.6557 14.0959 24.8854 13.8662C25.1152 13.6365 25.2442 13.3249 25.2442 13C25.2442 12.6751 25.1152 12.3635 24.8854 12.1338C24.6557 11.9041 24.3441 11.775 24.0192 11.775Z"
                                            fill="#F2F0FF"
                                        />
                                    </svg>
                                </Button>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    height: "calc(100vh - 95px)",
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

                                    <Button
                                        sx={{
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setHideDetails(!hideDetails)}
                                    >
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.7227 14.2251L10.9052 17.0303C10.7904 17.1442 10.6993 17.2797 10.6371 17.4289C10.5749 17.5782 10.5428 17.7383 10.5428 17.9C10.5428 18.0618 10.5749 18.2219 10.6371 18.3711C10.6993 18.5204 10.7904 18.6559 10.9052 18.7698C11.0191 18.8846 11.1546 18.9757 11.3038 19.0379C11.4531 19.1001 11.6132 19.1321 11.7749 19.1321C11.9367 19.1321 12.0968 19.1001 12.246 19.0379C12.3953 18.9757 12.5308 18.8846 12.6447 18.7698L17.5447 13.8698C17.6562 13.7533 17.7436 13.6159 17.8019 13.4656C17.9244 13.1673 17.9244 12.8328 17.8019 12.5346C17.7436 12.3842 17.6562 12.2468 17.5447 12.1303L12.6447 7.23034C12.5305 7.11612 12.3949 7.02552 12.2456 6.96371C12.0964 6.90189 11.9365 6.87008 11.7749 6.87008C11.6134 6.87008 11.4535 6.90189 11.3042 6.96371C11.155 7.02552 11.0194 7.11612 10.9052 7.23034C10.791 7.34456 10.7004 7.48015 10.6386 7.62938C10.5768 7.77861 10.5449 7.93856 10.5449 8.10009C10.5449 8.26161 10.5768 8.42156 10.6386 8.57079C10.7004 8.72002 10.791 8.85561 10.9052 8.96983L13.7227 11.7751H1.97499C1.65011 11.7751 1.33852 11.9041 1.10879 12.1339C0.879061 12.3636 0.75 12.6752 0.75 13.0001C0.75 13.3249 0.879061 13.6365 1.10879 13.8663C1.33852 14.096 1.65011 14.2251 1.97499 14.2251H13.7227ZM12.9999 0.750122C10.7105 0.739901 8.46409 1.37145 6.51539 2.57315C4.5667 3.77484 2.99376 5.49858 1.97499 7.54884C1.82879 7.84124 1.80474 8.17974 1.90812 8.48988C2.0115 8.80001 2.23384 9.05638 2.52624 9.20258C2.81864 9.34878 3.15714 9.37284 3.46728 9.26946C3.77742 9.16608 4.03378 8.94373 4.17998 8.65133C4.95441 7.08741 6.13242 5.75866 7.59226 4.80239C9.05211 3.84612 10.7408 3.29703 12.4839 3.21186C14.227 3.12669 15.9612 3.50853 17.5073 4.31793C19.0534 5.12732 20.3554 6.33491 21.2786 7.81588C22.2018 9.29686 22.7128 10.9975 22.7587 12.7421C22.8047 14.4866 22.384 16.2118 21.54 17.7393C20.6961 19.2669 19.4595 20.5413 17.9581 21.431C16.4568 22.3207 14.7451 22.7933 12.9999 22.8C11.1733 22.8079 9.38149 22.3007 7.83009 21.3364C6.27868 20.3722 5.03056 18.9901 4.22898 17.3488C4.08278 17.0564 3.82642 16.834 3.51628 16.7307C3.20614 16.6273 2.86764 16.6513 2.57524 16.7975C2.28284 16.9437 2.0605 17.2001 1.95712 17.5102C1.85374 17.8204 1.87779 18.1589 2.02399 18.4513C2.9952 20.4058 4.47094 22.0653 6.29857 23.2582C8.1262 24.4511 10.2394 25.1341 12.4194 25.2365C14.5995 25.3389 16.7674 24.857 18.6988 23.8407C20.6302 22.8243 22.255 21.3104 23.4051 19.4556C24.5553 17.6007 25.189 15.4723 25.2407 13.2904C25.2924 11.1085 24.7603 8.95243 23.6993 7.04516C22.6384 5.13789 21.0872 3.5487 19.2061 2.44197C17.325 1.33523 15.1824 0.751147 12.9999 0.750122Z"
                                                fill="#F2F0FF"
                                            />
                                        </svg>
                                    </Button>
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
                                            {data?.owner?.slice(0, 5) + " ... " + data?.owner?.slice(data?.owner.length - 5, data?.owner?.length)}
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
                                            {data.assetID}
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
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.3rem",
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
                                                {data?.cost_algo}
                                            </p>
                                            <img
                                                src={algo}
                                                alt="algo"
                                                style={{
                                                    width: "15px",
                                                    height: "15px",
                                                }}
                                            />
                                        </Box>
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

                                    {/* divider line */}
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "1.5px",
                                            backgroundColor: "#B5B3BC",
                                            margin: "1.5rem 0",
                                        }}
                                    ></Box>

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
                                        Property
                                    </p>

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
                                            Type
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
                                            Image {getFileType(data?.mimetype)}
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
                                            Size
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
                                            {getSizeByBytes(data.size_bytes)}
                                        </p>
                                    </Box>

                                    {/* divider line */}
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "1.5px",
                                            backgroundColor: "#B5B3BC",
                                            margin: "1.5rem 0",
                                        }}
                                    ></Box>

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
                                        Activities
                                    </p>

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
                                            Renamed
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
                                            {data.created}
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
                                            Created
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
                                            {data.created}
                                        </p>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
