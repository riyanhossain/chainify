import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Divider, Menu } from "@mui/material";
import GetImageByType from "../../utils/GetImageByType";
import { getSizeByBytes } from "../../utils/GetSizeByBytes";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useDeleteAssetMutation, useGetAssetsQuery } from "../../helpers/api";
import fileDownload from "js-file-download";

function createData(type: string, name: string, size: number, date: string, protein: number, id: number, file: string) {
    return { type, name, size, date, protein, id, file };
}

// const rows = [createData("image/png", "Frozen yoghurt", 64.2, "09.12.2022 - 15:31", 4.0)];

export default function NftTable() {
    const [tableData, setTableData] = React.useState<string[]>([]);

    // get address and chain staet from redux store
    const { chain, address } = useAppSelector((state) => state.walletConnect);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // open and close menu functions
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    // download file from server 
    const downloadFile = (file_name: string, view = false) => {
        fetch(`${process.env.REACT_APP_BASE_API_URL}/nft/download-file/${file_name}/${address}/`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                responseType: "blob",
            },
        })
            .then((response) => response.blob())
            .then((data) => {
                if (view) {
                    // if viewsing file
                    const url = URL.createObjectURL(data);
                    window.open(url, "_blank")?.focus();
                } else {
                    fileDownload(data, file_name);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };


    // copy file link to clipboard
    const [anchorElClipboard, setAnchorElClipboard] = React.useState<null | HTMLElement>(null);
    const openClipboard = Boolean(anchorElClipboard);

    // open and close menu functions
    const handleClickClipboard = (event: React.MouseEvent<HTMLButtonElement>, file: string) => {
        navigator.clipboard.writeText(file);
        setAnchorElClipboard(event.currentTarget);

        // close menu after 2 seconds
        setTimeout(() => {
            handleCloseClipboard();
        }, 2000);
    };
    const handleCloseClipboard = () => {
        setAnchorElClipboard(null);
    };
    // const fetchTableData = async () => {
    //     const response = await fetch(
    //         "data.json",

    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //             },
    //         }
    //     );
    //     const data = await response.json();
    //     console.log(data);
    //     setTableData(data);
    // };

    // React.useEffect(() => {
    //     fetchTableData();
    // }, []);

    // const [getAssetsFromBackend, result] = useGetAssetsFromBackendMutation();

    /// get single assets from backend by address
    const { data } = useGetAssetsQuery(address);
    
    // navigate func for other pages
    const navigate = useNavigate();

    // create table rows from data from backend see mui docs for more info
    const rows = data?.map((file: any) => {
        return createData(file.mimetype, file.file_name, file.size_bytes, file.created, 1, file.assetID, file.file);
    });



    // array holds  delete funnction for deleting assets from backend see redux-toolkit mutation docs for more info
    const [deleteAsset] = useDeleteAssetMutation();


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, background: "#161616" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                width: "100px",
                            }}
                            align="center"
                        >
                            <button
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    border: "none",
                                    background: "none",
                                    color: "#0368FF",
                                    cursor: "pointer",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "Lato",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: "#0368FF",
                                    }}
                                >
                                    Type
                                </p>
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.41 0.294956L-2.62268e-07 1.70496L6 7.70496L12 1.70496L10.59 0.294956L6 4.87496L1.41 0.294956Z"
                                        fill="#0368FF"
                                    />
                                </svg>
                            </button>
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{
                                width: "auto",
                            }}
                        >
                            <button
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    border: "none",
                                    background: "none",
                                    color: "#0368FF",
                                    cursor: "pointer",
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "Lato",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: "#0368FF",
                                    }}
                                >
                                    Name
                                </p>
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.41 0.294956L-2.62268e-07 1.70496L6 7.70496L12 1.70496L10.59 0.294956L6 4.87496L1.41 0.294956Z"
                                        fill="#0368FF"
                                    />
                                </svg>
                            </button>
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{
                                width: "200px",
                            }}
                        >
                            <button
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    border: "none",
                                    background: "none",
                                    color: "#0368FF",
                                    cursor: "pointer",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "Lato",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: "#0368FF",
                                    }}
                                >
                                    Size
                                </p>
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.41 0.294956L-2.62268e-07 1.70496L6 7.70496L12 1.70496L10.59 0.294956L6 4.87496L1.41 0.294956Z"
                                        fill="#0368FF"
                                    />
                                </svg>
                            </button>
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{
                                width: "300px",
                            }}
                        >
                            <button
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    border: "none",
                                    background: "none",
                                    color: "#0368FF",
                                    cursor: "pointer",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "Lato",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: "#0368FF",
                                    }}
                                >
                                    Date
                                </p>
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.41 0.294956L-2.62268e-07 1.70496L6 7.70496L12 1.70496L10.59 0.294956L6 4.87496L1.41 0.294956Z"
                                        fill="#0368FF"
                                    />
                                </svg>
                            </button>
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{
                                width: "400px",
                            }}
                        >
                            &nbsp;
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map(
                        (
                            row: {
                                type: string;
                                name: string;
                                size: number;
                                date: string;
                                id: number;
                                file: string;
                            },
                            index: number
                        ) => (
                            <tr
                                key={index}
                                // sx={{
                                //     "&:last-child td, &:last-child th": { border: 0, py: 1 },
                                // }}

                                style={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    navigate(`/file/${row.id}`);
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    sx={{
                                        color: "#B5B3BC",
                                        fontFamily: "Lato",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                    }}
                                >
                                    <GetImageByType type={row.type} />
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        color: "#B5B3BC",
                                        fontFamily: "Lato",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                    }}
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "#B5B3BC",
                                        fontFamily: "Lato",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        opacity: "0.6",
                                    }}
                                >
                                    {/* get size by bytes in KB, MB, GB */}
                                    {getSizeByBytes(row.size)}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "#B5B3BC",
                                        fontFamily: "Lato",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                    }}
                                >
                                    {row.date}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        color: "#B5B3BC",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <>
                                        {/* menu btn */}
                                        <Button
                                            sx={{
                                                height: "50px",
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClick(e);
                                            }}
                                        >
                                            <svg width="19" height="5" viewBox="0 0 19 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M9.5 0.416626C9.08796 0.416626 8.68517 0.538811 8.34256 0.767731C7.99996 0.996651 7.73293 1.32202 7.57525 1.7027C7.41757 2.08338 7.37631 2.50227 7.4567 2.9064C7.53708 3.31052 7.7355 3.68174 8.02686 3.9731C8.31822 4.26446 8.68944 4.46288 9.09356 4.54326C9.49769 4.62365 9.91658 4.58239 10.2973 4.42471C10.6779 4.26703 11.0033 4 11.2322 3.6574C11.4611 3.31479 11.5833 2.912 11.5833 2.49996C11.5833 1.94742 11.3638 1.41752 10.9731 1.02682C10.5824 0.63612 10.0525 0.416626 9.5 0.416626ZM2.20833 0.416626C1.79629 0.416626 1.3935 0.538811 1.0509 0.767731C0.708294 0.996651 0.441268 1.32202 0.283585 1.7027C0.125903 2.08338 0.0846457 2.50227 0.165032 2.9064C0.245417 3.31052 0.443836 3.68174 0.735195 3.9731C1.02655 4.26446 1.39777 4.46288 1.8019 4.54326C2.20602 4.62365 2.62491 4.58239 3.00559 4.42471C3.38627 4.26703 3.71164 4 3.94056 3.6574C4.16948 3.31479 4.29167 2.912 4.29167 2.49996C4.29167 1.94742 4.07217 1.41752 3.68147 1.02682C3.29077 0.63612 2.76087 0.416626 2.20833 0.416626ZM16.7917 0.416626C16.3796 0.416626 15.9768 0.538811 15.6342 0.767731C15.2916 0.996651 15.0246 1.32202 14.8669 1.7027C14.7092 2.08338 14.668 2.50227 14.7484 2.9064C14.8287 3.31052 15.0272 3.68174 15.3185 3.9731C15.6099 4.26446 15.9811 4.46288 16.3852 4.54326C16.7894 4.62365 17.2082 4.58239 17.5889 4.42471C17.9696 4.26703 18.295 4 18.5239 3.6574C18.7528 3.31479 18.875 2.912 18.875 2.49996C18.875 1.94742 18.6555 1.41752 18.2648 1.02682C17.8741 0.63612 17.3442 0.416626 16.7917 0.416626Z"
                                                    fill="#F2F0FF"
                                                />
                                            </svg>
                                        </Button>

                                        {/* menu */}
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                "aria-labelledby": "basic-button",
                                            }}
                                            sx={{
                                                "& .MuiMenu-paper": {
                                                    width: "200px",
                                                    borderRadius: "8px",
                                                    backgroundColor: "#F2F0FF",
                                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                                    border: "1px solid #F2F0FF",
                                                    boxSizing: "border-box",
                                                    p: 2,
                                                },
                                                "& .MuiList-padding": {
                                                    padding: "0px",
                                                },
                                                "& .MuiListItem-root": {
                                                    padding: "0px",
                                                },
                                                "& .MuiMenu-paper:hover": {
                                                    backgroundColor: "#F2F0FF",
                                                },
                                            }}
                                        >
                                            <Button
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    fontSize: "18px",
                                                    fontWeight: "300",
                                                    color: "#242323",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.04216 12.041L5.62428 15.4589C5.21047 15.8582 4.65782 16.0814 4.08272 16.0814C3.50762 16.0814 2.95496 15.8582 2.54115 15.4589C2.33819 15.2567 2.17716 15.0165 2.06727 14.7519C1.95739 14.4874 1.90083 14.2037 1.90083 13.9173C1.90083 13.6308 1.95739 13.3472 2.06727 13.0827C2.17716 12.8181 2.33819 12.5779 2.54115 12.3757L5.95902 8.95784C6.1249 8.79197 6.21809 8.56699 6.21809 8.33241C6.21809 8.09782 6.1249 7.87285 5.95902 7.70697C5.79315 7.54109 5.56817 7.44791 5.33359 7.44791C5.099 7.44791 4.87403 7.54109 4.70815 7.70697L1.29028 11.1337C0.60173 11.8831 0.229344 12.8696 0.250885 13.8871C0.272426 14.9046 0.68623 15.8745 1.40588 16.5941C2.12553 17.3138 3.09538 17.7276 4.11288 17.7491C5.13039 17.7707 6.11689 17.3983 6.86635 16.7097L10.293 13.2918C10.4589 13.126 10.5521 12.901 10.5521 12.6664C10.5521 12.4318 10.4589 12.2069 10.293 12.041C10.1272 11.8751 9.90218 11.7819 9.66759 11.7819C9.43301 11.7819 9.20803 11.8751 9.04216 12.041ZM16.6002 1.39976C15.8592 0.663333 14.8569 0.25 13.8122 0.25C12.7675 0.25 11.7652 0.663333 11.0242 1.39976L7.59749 4.81763C7.51536 4.89977 7.4502 4.99727 7.40575 5.10458C7.3613 5.2119 7.33843 5.32691 7.33843 5.44307C7.33843 5.55922 7.3613 5.67424 7.40575 5.78155C7.4502 5.88886 7.51536 5.98637 7.59749 6.0685C7.67962 6.15064 7.77713 6.21579 7.88444 6.26024C7.99176 6.30469 8.10677 6.32757 8.22293 6.32757C8.33908 6.32757 8.4541 6.30469 8.56141 6.26024C8.66872 6.21579 8.76623 6.15064 8.84836 6.0685L12.2662 2.65063C12.68 2.25125 13.2327 2.02806 13.8078 2.02806C14.3829 2.02806 14.9356 2.25125 15.3494 2.65063C15.5523 2.85278 15.7134 3.09302 15.8232 3.35756C15.9331 3.6221 15.9897 3.90574 15.9897 4.1922C15.9897 4.47865 15.9331 4.76229 15.8232 5.02683C15.7134 5.29137 15.5523 5.53161 15.3494 5.73376L11.9315 9.15164C11.8489 9.23353 11.7834 9.33096 11.7387 9.4383C11.694 9.54565 11.6709 9.66079 11.6709 9.77707C11.6709 9.89336 11.694 10.0085 11.7387 10.1158C11.7834 10.2232 11.8489 10.3206 11.9315 10.4025C12.0134 10.4851 12.1108 10.5506 12.2182 10.5953C12.3255 10.6401 12.4406 10.6631 12.5569 10.6631C12.6732 10.6631 12.7884 10.6401 12.8957 10.5953C13.0031 10.5506 13.1005 10.4851 13.1824 10.4025L16.6002 6.97583C17.3367 6.2348 17.75 5.23251 17.75 4.18779C17.75 3.14307 17.3367 2.14078 16.6002 1.39976ZM6.15282 11.8472C6.23513 11.9288 6.33275 11.9934 6.44008 12.0373C6.5474 12.0811 6.66232 12.1033 6.77826 12.1026C6.89419 12.1033 7.00911 12.0811 7.11644 12.0373C7.22376 11.9934 7.32138 11.9288 7.40369 11.8472L11.7377 7.51317C11.9036 7.3473 11.9968 7.12232 11.9968 6.88774C11.9968 6.65315 11.9036 6.42818 11.7377 6.2623C11.5718 6.09642 11.3468 6.00324 11.1123 6.00324C10.8777 6.00324 10.6527 6.09642 10.4868 6.2623L6.15282 10.5963C6.07026 10.6782 6.00472 10.7756 5.96 10.883C5.91528 10.9903 5.89225 11.1055 5.89225 11.2217C5.89225 11.338 5.91528 11.4532 5.96 11.5605C6.00472 11.6679 6.07026 11.7653 6.15282 11.8472Z"
                                                        fill="#242323"
                                                    />
                                                </svg>
                                                Copy link
                                            </Button>

                                            <Button
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    fontSize: "18px",
                                                    fontWeight: "300",
                                                    color: "#242323",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M15.6269 0.926672L2.63006 5.25894C2.11792 5.4307 1.67122 5.75622 1.35085 6.19113C1.03049 6.62605 0.852048 7.14918 0.839867 7.68921C0.827686 8.22925 0.982354 8.75989 1.28278 9.20881C1.58321 9.65772 2.01478 10.0031 2.51865 10.1977L7.32748 12.0359C7.44153 12.0825 7.54515 12.1514 7.63228 12.2385C7.71942 12.3257 7.78832 12.4293 7.83497 12.5433L9.67309 17.3522C9.82993 17.7606 10.0864 18.1235 10.4191 18.4076C10.7518 18.6918 11.1502 18.8883 11.5782 18.9793C12.0062 19.0703 12.4502 19.0529 12.8697 18.9287C13.2893 18.8045 13.6711 18.5775 13.9806 18.2681C14.2675 17.9755 14.4853 17.6223 14.6181 17.2346L18.9503 4.23777C19.1031 3.77581 19.1244 3.28051 19.0121 2.80712C18.8997 2.33373 18.658 1.90086 18.314 1.55682C17.97 1.21278 17.5371 0.9711 17.0637 0.858738C16.5903 0.746375 16.095 0.767751 15.6331 0.920485L15.6269 0.926672ZM17.2855 3.68695L12.9532 16.6838C12.8941 16.8522 12.7849 16.9985 12.6402 17.103C12.4956 17.2076 12.3224 17.2655 12.1439 17.2688C11.9655 17.2722 11.7903 17.2209 11.6418 17.1219C11.4933 17.0228 11.3786 16.8808 11.3132 16.7147L9.46885 11.9121C9.44362 11.8485 9.41469 11.7865 9.38221 11.7264L13.6464 7.46221C13.8105 7.29807 13.9028 7.07545 13.9028 6.84332C13.9028 6.61119 13.8105 6.38856 13.6464 6.22442C13.4823 6.06028 13.2596 5.96807 13.0275 5.96807C12.7954 5.96807 12.5728 6.06028 12.4086 6.22442L8.14442 10.4886C8.08427 10.4561 8.02228 10.4272 7.95875 10.402L3.15612 8.55766C2.99006 8.4922 2.84799 8.37754 2.74895 8.22905C2.6499 8.08056 2.59863 7.90533 2.602 7.72687C2.60536 7.54841 2.66321 7.37525 2.76778 7.2306C2.87236 7.08595 3.01866 6.97673 3.18706 6.91758L16.1839 2.58531C16.3372 2.53587 16.5012 2.5297 16.6578 2.56748C16.8144 2.60526 16.9575 2.68552 17.0714 2.79943C17.1853 2.91333 17.2656 3.05646 17.3033 3.21306C17.3411 3.36965 17.3349 3.53364 17.2855 3.68695Z"
                                                        fill="#242323"
                                                    />
                                                </svg>
                                                Share
                                            </Button>

                                            <Button
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    fontSize: "18px",
                                                    fontWeight: "300",
                                                    color: "#242323",
                                                    textTransform: "capitalize",
                                                }}
                                                onClick={() => downloadFile(row.name)}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M16.875 10.75C16.6429 10.75 16.4204 10.8422 16.2563 11.0063C16.0922 11.1704 16 11.3929 16 11.625V15.125C16 15.3571 15.9078 15.5796 15.7437 15.7437C15.5796 15.9078 15.3571 16 15.125 16H2.875C2.64294 16 2.42038 15.9078 2.25628 15.7437C2.09219 15.5796 2 15.3571 2 15.125V11.625C2 11.3929 1.90781 11.1704 1.74372 11.0063C1.57962 10.8422 1.35706 10.75 1.125 10.75C0.892936 10.75 0.670376 10.8422 0.506282 11.0063C0.342187 11.1704 0.25 11.3929 0.25 11.625V15.125C0.25 15.8212 0.526562 16.4889 1.01884 16.9812C1.51113 17.4734 2.17881 17.75 2.875 17.75H15.125C15.8212 17.75 16.4889 17.4734 16.9812 16.9812C17.4734 16.4889 17.75 15.8212 17.75 15.125V11.625C17.75 11.3929 17.6578 11.1704 17.4937 11.0063C17.3296 10.8422 17.1071 10.75 16.875 10.75ZM8.37875 12.2463C8.46197 12.3259 8.56009 12.3884 8.6675 12.43C8.77224 12.4763 8.88549 12.5002 9 12.5002C9.11451 12.5002 9.22776 12.4763 9.3325 12.43C9.43991 12.3884 9.53803 12.3259 9.62125 12.2463L13.1212 8.74625C13.286 8.58148 13.3786 8.35801 13.3786 8.125C13.3786 7.89199 13.286 7.66852 13.1212 7.50375C12.9565 7.33898 12.733 7.24642 12.5 7.24642C12.267 7.24642 12.0435 7.33898 11.8787 7.50375L9.875 9.51625V1.125C9.875 0.892936 9.78281 0.670376 9.61872 0.506282C9.45462 0.342187 9.23206 0.25 9 0.25C8.76794 0.25 8.54538 0.342187 8.38128 0.506282C8.21719 0.670376 8.125 0.892936 8.125 1.125V9.51625L6.12125 7.50375C6.03967 7.42217 5.94281 7.35745 5.83622 7.3133C5.72962 7.26914 5.61538 7.24642 5.5 7.24642C5.38462 7.24642 5.27038 7.26914 5.16378 7.3133C5.05719 7.35745 4.96033 7.42217 4.87875 7.50375C4.79717 7.58533 4.73245 7.68219 4.6883 7.78878C4.64415 7.89538 4.62142 8.00962 4.62142 8.125C4.62142 8.24038 4.64415 8.35462 4.6883 8.46122C4.73245 8.56781 4.79717 8.66467 4.87875 8.74625L8.37875 12.2463Z"
                                                        fill="#242323"
                                                    />
                                                </svg>
                                                Download
                                            </Button>

                                            <Divider />

                                            <Button
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    fontSize: "18px",
                                                    fontWeight: "300",
                                                    color: "#242323",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M15.9962 13.1212L13.8787 11.0037C13.7974 10.9217 13.7006 10.8566 13.594 10.8122C13.4874 10.7678 13.373 10.7449 13.2575 10.7449C13.142 10.7449 13.0276 10.7678 12.921 10.8122C12.8144 10.8566 12.7176 10.9217 12.6362 11.0037L9.50374 14.1362C9.42265 14.218 9.35849 14.315 9.31494 14.4216C9.2714 14.5282 9.24933 14.6423 9.24999 14.7575V16.875C9.24999 17.107 9.34218 17.3296 9.50627 17.4937C9.67037 17.6578 9.89293 17.75 10.125 17.75H12.2425C12.3576 17.7507 12.4718 17.7286 12.5784 17.685C12.685 17.6415 12.782 17.5773 12.8637 17.4962L15.9962 14.3637C16.0782 14.2824 16.1433 14.1856 16.1878 14.079C16.2322 13.9724 16.2551 13.858 16.2551 13.7425C16.2551 13.627 16.2322 13.5126 16.1878 13.406C16.1433 13.2994 16.0782 13.2026 15.9962 13.1212ZM11.875 16H11V15.125L13.2575 12.8675L14.1325 13.7425L11.875 16ZM6.625 16H3.125C2.89293 16 2.67037 15.9078 2.50628 15.7437C2.34219 15.5796 2.25 15.3571 2.25 15.125V2.875C2.25 2.64293 2.34219 2.42037 2.50628 2.25628C2.67037 2.09219 2.89293 2 3.125 2H7.49999V4.625C7.49999 5.32119 7.77656 5.98887 8.26884 6.48115C8.76112 6.97343 9.4288 7.24999 10.125 7.24999H12.75V8.12499C12.75 8.35706 12.8422 8.57962 13.0063 8.74371C13.1704 8.9078 13.3929 8.99999 13.625 8.99999C13.8571 8.99999 14.0796 8.9078 14.2437 8.74371C14.4078 8.57962 14.5 8.35706 14.5 8.12499V6.37499C14.5 6.37499 14.5 6.37499 14.5 6.32249C14.4909 6.24211 14.4733 6.16292 14.4475 6.08625V6.00749C14.4054 5.91753 14.3493 5.83483 14.2812 5.7625L9.03124 0.5125C8.95891 0.444439 8.87621 0.388321 8.78624 0.34625C8.76012 0.34254 8.73361 0.34254 8.70749 0.34625L8.42749 0.25H3.125C2.42881 0.25 1.76113 0.526562 1.26884 1.01884C0.776562 1.51113 0.5 2.1788 0.5 2.875V15.125C0.5 15.8212 0.776562 16.4889 1.26884 16.9811C1.76113 17.4734 2.42881 17.75 3.125 17.75H6.625C6.85706 17.75 7.07962 17.6578 7.24371 17.4937C7.40781 17.3296 7.49999 17.107 7.49999 16.875C7.49999 16.6429 7.40781 16.4204 7.24371 16.2563C7.07962 16.0922 6.85706 16 6.625 16ZM9.24999 3.23375L11.5162 5.5H10.125C9.89293 5.5 9.67037 5.40781 9.50627 5.24371C9.34218 5.07962 9.24999 4.85706 9.24999 4.625V3.23375ZM4.875 10.75H10.125C10.3571 10.75 10.5796 10.6578 10.7437 10.4937C10.9078 10.3296 11 10.1071 11 9.87499C11 9.64293 10.9078 9.42037 10.7437 9.25627C10.5796 9.09218 10.3571 8.99999 10.125 8.99999H4.875C4.64293 8.99999 4.42037 9.09218 4.25628 9.25627C4.09218 9.42037 4 9.64293 4 9.87499C4 10.1071 4.09218 10.3296 4.25628 10.4937C4.42037 10.6578 4.64293 10.75 4.875 10.75ZM4.875 7.24999H5.75C5.98206 7.24999 6.20462 7.15781 6.36871 6.99371C6.53281 6.82962 6.625 6.60706 6.625 6.37499C6.625 6.14293 6.53281 5.92037 6.36871 5.75628C6.20462 5.59218 5.98206 5.5 5.75 5.5H4.875C4.64293 5.5 4.42037 5.59218 4.25628 5.75628C4.09218 5.92037 4 6.14293 4 6.37499C4 6.60706 4.09218 6.82962 4.25628 6.99371C4.42037 7.15781 4.64293 7.24999 4.875 7.24999ZM6.625 12.5H4.875C4.64293 12.5 4.42037 12.5922 4.25628 12.7563C4.09218 12.9204 4 13.1429 4 13.375C4 13.6071 4.09218 13.8296 4.25628 13.9937C4.42037 14.1578 4.64293 14.25 4.875 14.25H6.625C6.85706 14.25 7.07962 14.1578 7.24371 13.9937C7.40781 13.8296 7.49999 13.6071 7.49999 13.375C7.49999 13.1429 7.40781 12.9204 7.24371 12.7563C7.07962 12.5922 6.85706 12.5 6.625 12.5Z"
                                                        fill="#242323"
                                                    />
                                                </svg>
                                                Rename
                                            </Button>

                                            <Button
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    fontSize: "18px",
                                                    fontWeight: "300",
                                                    color: "#242323",
                                                    textTransform: "capitalize",
                                                }}
                                                onClick={() => {
                                                    // delete asset from db by id
                                                    deleteAsset(row.id);
                                                }}
                                            >
                                                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M15.375 3.75H11.875V2.875C11.875 2.17881 11.5984 1.51113 11.1062 1.01884C10.6139 0.526562 9.94619 0.25 9.25 0.25H7.5C6.80381 0.25 6.13613 0.526562 5.64384 1.01884C5.15156 1.51113 4.875 2.17881 4.875 2.875V3.75H1.375C1.14294 3.75 0.920376 3.84219 0.756282 4.00628C0.592187 4.17038 0.5 4.39294 0.5 4.625C0.5 4.85706 0.592187 5.07962 0.756282 5.24372C0.920376 5.40781 1.14294 5.5 1.375 5.5H2.25V15.125C2.25 15.8212 2.52656 16.4889 3.01884 16.9812C3.51113 17.4734 4.17881 17.75 4.875 17.75H11.875C12.5712 17.75 13.2389 17.4734 13.7312 16.9812C14.2234 16.4889 14.5 15.8212 14.5 15.125V5.5H15.375C15.6071 5.5 15.8296 5.40781 15.9937 5.24372C16.1578 5.07962 16.25 4.85706 16.25 4.625C16.25 4.39294 16.1578 4.17038 15.9937 4.00628C15.8296 3.84219 15.6071 3.75 15.375 3.75ZM6.625 2.875C6.625 2.64294 6.71719 2.42038 6.88128 2.25628C7.04538 2.09219 7.26794 2 7.5 2H9.25C9.48206 2 9.70462 2.09219 9.86872 2.25628C10.0328 2.42038 10.125 2.64294 10.125 2.875V3.75H6.625V2.875ZM12.75 15.125C12.75 15.3571 12.6578 15.5796 12.4937 15.7437C12.3296 15.9078 12.1071 16 11.875 16H4.875C4.64294 16 4.42038 15.9078 4.25628 15.7437C4.09219 15.5796 4 15.3571 4 15.125V5.5H12.75V15.125Z"
                                                        fill="#242323"
                                                    />
                                                </svg>
                                                Delete
                                            </Button>
                                        </Menu>
                                    </>

                                    <Button onClick={() => downloadFile(row.name)}>
                                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.6876 12.5417C19.4168 12.5417 19.1572 12.6492 18.9657 12.8407C18.7743 13.0321 18.6667 13.2918 18.6667 13.5625V17.6458C18.6667 17.9166 18.5592 18.1762 18.3678 18.3677C18.1763 18.5591 17.9167 18.6667 17.6459 18.6667H3.35425C3.08351 18.6667 2.82385 18.5591 2.63241 18.3677C2.44097 18.1762 2.33341 17.9166 2.33341 17.6458V13.5625C2.33341 13.2918 2.22586 13.0321 2.03442 12.8407C1.84298 12.6492 1.58332 12.5417 1.31258 12.5417C1.04184 12.5417 0.782187 12.6492 0.590743 12.8407C0.3993 13.0321 0.291748 13.2918 0.291748 13.5625V17.6458C0.291748 18.4581 0.614403 19.237 1.18873 19.8113C1.76306 20.3857 2.54202 20.7083 3.35425 20.7083H17.6459C18.4581 20.7083 19.2371 20.3857 19.8114 19.8113C20.3858 19.237 20.7084 18.4581 20.7084 17.6458V13.5625C20.7084 13.2918 20.6009 13.0321 20.4094 12.8407C20.218 12.6492 19.9583 12.5417 19.6876 12.5417ZM9.77529 14.2873C9.87238 14.3802 9.98686 14.4531 10.1122 14.5017C10.2344 14.5557 10.3665 14.5836 10.5001 14.5836C10.6337 14.5836 10.7658 14.5557 10.888 14.5017C11.0133 14.4531 11.1278 14.3802 11.2249 14.2873L15.3082 10.204C15.5004 10.0117 15.6084 9.75101 15.6084 9.47916C15.6084 9.20731 15.5004 8.9466 15.3082 8.75437C15.116 8.56215 14.8553 8.45415 14.5834 8.45415C14.3116 8.45415 14.0508 8.56215 13.8586 8.75437L11.5209 11.1023V1.3125C11.5209 1.04176 11.4134 0.782103 11.2219 0.590659C11.0305 0.399216 10.7708 0.291664 10.5001 0.291664C10.2293 0.291664 9.96969 0.399216 9.77824 0.590659C9.5868 0.782103 9.47925 1.04176 9.47925 1.3125V11.1023L7.14154 8.75437C7.04636 8.65919 6.93336 8.58369 6.809 8.53218C6.68464 8.48067 6.55135 8.45415 6.41675 8.45415C6.28214 8.45415 6.14885 8.48067 6.02449 8.53218C5.90013 8.58369 5.78714 8.65919 5.69196 8.75437C5.59678 8.84955 5.52127 8.96255 5.46976 9.08691C5.41825 9.21127 5.39174 9.34456 5.39174 9.47916C5.39174 9.61377 5.41825 9.74706 5.46976 9.87142C5.52127 9.99578 5.59678 10.1088 5.69196 10.204L9.77529 14.2873Z"
                                                fill="#F2F0FF"
                                            />
                                        </svg>
                                    </Button>

                                    <Button>
                                        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.898 1.08112L2.73507 6.13544C2.13757 6.33582 1.61642 6.7156 1.24266 7.223C0.8689 7.73039 0.660723 8.34072 0.646512 8.97075C0.6323 9.60079 0.812746 10.2199 1.16325 10.7436C1.51375 11.2673 2.01725 11.6702 2.6051 11.8974L8.21539 14.0418C8.34845 14.0963 8.46934 14.1766 8.571 14.2783C8.67265 14.38 8.75304 14.5008 8.80746 14.6339L10.9519 20.2442C11.1349 20.7208 11.4341 21.144 11.8223 21.4756C12.2104 21.8071 12.6753 22.0364 13.1746 22.1425C13.6739 22.2487 14.1918 22.2284 14.6813 22.0835C15.1708 21.9386 15.6163 21.6737 15.9774 21.3128C16.3121 20.9714 16.5662 20.5594 16.7211 20.107L21.7754 4.94406C21.9536 4.40512 21.9785 3.82727 21.8474 3.27498C21.7163 2.72269 21.4344 2.21768 21.033 1.8163C20.6316 1.41492 20.1266 1.13296 19.5743 1.00187C19.022 0.870775 18.4442 0.895714 17.9052 1.0739L17.898 1.08112ZM19.8331 4.30144L14.7788 19.4644C14.7098 19.6609 14.5823 19.8315 14.4136 19.9535C14.2448 20.0755 14.0428 20.143 13.8346 20.147C13.6264 20.1509 13.422 20.0911 13.2487 19.9755C13.0755 19.86 12.9417 19.6942 12.8654 19.5005L10.7137 13.8974C10.6842 13.8233 10.6505 13.751 10.6126 13.6808L15.5875 8.70592C15.779 8.51442 15.8865 8.25469 15.8865 7.98387C15.8865 7.71306 15.779 7.45333 15.5875 7.26183C15.396 7.07033 15.1362 6.96275 14.8654 6.96275C14.5946 6.96275 14.3349 7.07033 14.1434 7.26183L9.16849 12.2367C9.09832 12.1988 9.02599 12.1651 8.95187 12.1356L3.3488 9.98394C3.15507 9.90757 2.98932 9.7738 2.87377 9.60056C2.75822 9.42732 2.6984 9.22289 2.70233 9.01469C2.70626 8.80649 2.77375 8.60446 2.89575 8.43571C3.01775 8.26695 3.18843 8.13952 3.38491 8.07052L18.5479 3.0162C18.7267 2.95852 18.918 2.95133 19.1007 2.9954C19.2834 3.03948 19.4504 3.13311 19.5833 3.266C19.7162 3.39889 19.8098 3.56588 19.8539 3.74857C19.898 3.93127 19.8908 4.12258 19.8331 4.30144Z"
                                                fill="#F2F0FF"
                                            />
                                        </svg>
                                    </Button>

                                    <>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClickClipboard(e, row.file);
                                            }}
                                        >
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10.5493 14.0478L6.56174 18.0354C6.07896 18.5013 5.4342 18.7617 4.76325 18.7617C4.0923 18.7617 3.44753 18.5013 2.96475 18.0354C2.72797 17.7995 2.5401 17.5192 2.4119 17.2106C2.2837 16.902 2.21771 16.5711 2.21771 16.2369C2.21771 15.9027 2.2837 15.5718 2.4119 15.2631C2.5401 14.9545 2.72797 14.6742 2.96475 14.4384L6.95227 10.4509C7.1458 10.2573 7.25452 9.99486 7.25452 9.72118C7.25452 9.4475 7.1458 9.18503 6.95227 8.99151C6.75875 8.79799 6.49628 8.68926 6.2226 8.68926C5.94892 8.68926 5.68645 8.79799 5.49292 8.99151L1.5054 12.9893C0.7021 13.8637 0.267649 15.0146 0.292781 16.2017C0.317912 17.3888 0.800683 18.5203 1.64027 19.3598C2.47986 20.1994 3.61135 20.6822 4.79845 20.7073C5.98554 20.7325 7.13645 20.298 8.01082 19.4947L12.0086 15.5072C12.2021 15.3137 12.3109 15.0512 12.3109 14.7775C12.3109 14.5038 12.2021 14.2414 12.0086 14.0478C11.8151 13.8543 11.5526 13.7456 11.2789 13.7456C11.0053 13.7456 10.7428 13.8543 10.5493 14.0478ZM19.367 1.63309C18.5025 0.773932 17.3332 0.29171 16.1143 0.29171C14.8955 0.29171 13.7261 0.773932 12.8616 1.63309L8.86382 5.62061C8.768 5.71643 8.69199 5.83019 8.64013 5.95539C8.58827 6.08059 8.56158 6.21477 8.56158 6.35029C8.56158 6.4858 8.58827 6.61999 8.64013 6.74518C8.69199 6.87038 8.768 6.98414 8.86382 7.07996C8.95964 7.17578 9.0734 7.2518 9.1986 7.30365C9.3238 7.35551 9.45798 7.3822 9.5935 7.3822C9.72901 7.3822 9.86319 7.35551 9.98839 7.30365C10.1136 7.2518 10.2273 7.17578 10.3232 7.07996L14.3107 3.09244C14.7935 2.6265 15.4382 2.36611 16.1092 2.36611C16.7801 2.36611 17.4249 2.6265 17.9077 3.09244C18.1445 3.32829 18.3323 3.60857 18.4605 3.9172C18.5887 4.22583 18.6547 4.55674 18.6547 4.89094C18.6547 5.22513 18.5887 5.55604 18.4605 5.86468C18.3323 6.17331 18.1445 6.45359 17.9077 6.68943L13.9202 10.677C13.8238 10.7725 13.7474 10.8862 13.6952 11.0114C13.643 11.1366 13.6162 11.271 13.6162 11.4066C13.6162 11.5423 13.643 11.6766 13.6952 11.8019C13.7474 11.9271 13.8238 12.0408 13.9202 12.1363C14.0157 12.2326 14.1294 12.3091 14.2546 12.3613C14.3798 12.4134 14.5142 12.4403 14.6498 12.4403C14.7855 12.4403 14.9198 12.4134 15.0451 12.3613C15.1703 12.3091 15.284 12.2326 15.3795 12.1363L19.367 8.13851C20.2262 7.27397 20.7084 6.10464 20.7084 4.8858C20.7084 3.66696 20.2262 2.49762 19.367 1.63309ZM7.17837 13.8218C7.2744 13.917 7.38829 13.9924 7.5135 14.0435C7.63872 14.0946 7.77279 14.1206 7.90805 14.1198C8.0433 14.1206 8.17738 14.0946 8.30259 14.0435C8.42781 13.9924 8.54169 13.917 8.63772 13.8218L13.6941 8.76541C13.8876 8.57189 13.9963 8.30942 13.9963 8.03573C13.9963 7.76205 13.8876 7.49958 13.6941 7.30606C13.5005 7.11254 13.2381 7.00382 12.9644 7.00382C12.6907 7.00382 12.4282 7.11254 12.2347 7.30606L7.17837 12.3624C7.08205 12.4579 7.00559 12.5716 6.95341 12.6968C6.90124 12.8221 6.87438 12.9564 6.87438 13.0921C6.87438 13.2277 6.90124 13.3621 6.95341 13.4873C7.00559 13.6125 7.08205 13.7262 7.17837 13.8218Z"
                                                    fill="#F2F0FF"
                                                />
                                            </svg>
                                        </Button>

                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorElClipboard}
                                            keepMounted
                                            open={Boolean(anchorElClipboard)}
                                            onClose={(e) => {
                                                handleCloseClipboard();
                                                navigator.clipboard.writeText(row.file);
                                            }}
                                            sx={{
                                                "& .MuiMenu-paper": {
                                                    width: "auto",
                                                    height: "auto",
                                                    padding: 2,
                                                    paddingX: 5,
                                                    borderRadius: "8px",
                                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                                                    backgroundColor: "#fff",
                                                    border: "1px solid #E5E5E5",
                                                    boxSizing: "border-box",
                                                    fontFamily: "Lato",
                                                    fontStyle: "normal",
                                                    fontWeight: "700",
                                                    fontSize: "18px",
                                                    "& .MuiList-padding": {
                                                        padding: "0",
                                                    },
                                                },
                                            }}
                                        >
                                            Link copied to clipboard.
                                        </Menu>
                                    </>

                                    <>
                                        <Button>
                                            <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M20.6232 8.50563C18.5619 3.71959 14.684 0.75 10.5001 0.75C6.31612 0.75 2.43831 3.71959 0.376942 8.50563C0.320752 8.63438 0.291748 8.77334 0.291748 8.91382C0.291748 9.0543 0.320752 9.19326 0.376942 9.32201C2.43831 14.1081 6.31612 17.0776 10.5001 17.0776C14.684 17.0776 18.5619 14.1081 20.6232 9.32201C20.6794 9.19326 20.7084 9.0543 20.7084 8.91382C20.7084 8.77334 20.6794 8.63438 20.6232 8.50563ZM10.5001 15.0367C7.26517 15.0367 4.20373 12.6998 2.43831 8.91382C4.20373 5.12785 7.26517 2.79096 10.5001 2.79096C13.735 2.79096 16.7964 5.12785 18.5619 8.91382C16.7964 12.6998 13.735 15.0367 10.5001 15.0367ZM10.5001 4.83191C9.69275 4.83191 8.90356 5.07131 8.23229 5.51984C7.56103 5.96836 7.03784 6.60587 6.72889 7.35174C6.41994 8.09761 6.3391 8.91835 6.4966 9.71016C6.6541 10.502 7.04287 11.2293 7.61373 11.8002C8.1846 12.371 8.91193 12.7598 9.70374 12.9173C10.4956 13.0748 11.3163 12.994 12.0622 12.685C12.808 12.3761 13.4455 11.8529 13.8941 11.1816C14.3426 10.5103 14.582 9.72115 14.582 8.91382C14.582 7.83123 14.1519 6.79298 13.3864 6.02747C12.6209 5.26197 11.5827 4.83191 10.5001 4.83191ZM10.5001 10.9548C10.0964 10.9548 9.70182 10.8351 9.36619 10.6108C9.03055 10.3866 8.76896 10.0678 8.61448 9.69486C8.46001 9.32193 8.41959 8.91156 8.49834 8.51565C8.57709 8.11974 8.77147 7.75608 9.05691 7.47065C9.34234 7.18522 9.706 6.99083 10.1019 6.91208C10.4978 6.83333 10.9082 6.87375 11.2811 7.02822C11.6541 7.1827 11.9728 7.44429 12.1971 7.77993C12.4213 8.11556 12.541 8.51016 12.541 8.91382C12.541 9.45512 12.326 9.97424 11.9433 10.357C11.5605 10.7397 11.0414 10.9548 10.5001 10.9548Z"
                                                    fill="#F2F0FF"
                                                />
                                            </svg>
                                        </Button>
                                    </>
                                </TableCell>
                            </tr>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
