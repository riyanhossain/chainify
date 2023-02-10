import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import GetImageByType from "../../utils/GetImageByType";
import { getSizeByBytes } from "../../utils/GetSizeByBytes";
import { useNavigate } from "react-router-dom";

function createData(type: string, name: string, size: number, date: string, protein: number, id: number) {
    return { type, name, size, date, protein, id };
}

// const rows = [createData("image/png", "Frozen yoghurt", 64.2, "09.12.2022 - 15:31", 4.0)];

export default function NftTable() {
    const [tabelData, setTableData] = React.useState<any>([]);
    const fetchTableData = async () => {
        const response = await fetch(
            "data.json",

            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        const data = await response.json();
        console.log(data);
        setTableData(data);
    };

    React.useEffect(() => {
        fetchTableData();
    }, []);

    const navigate = useNavigate();

    const rows = tabelData.map((file: any) => {
        return createData(file.mimetype, file.file_name, file.size_bytes, file.created, 1, file.assetID);
    });

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
                    {rows.map(
                        (
                            row: {
                                type: string;
                                name: string;
                                size: number;
                                date: string;
                                id: number;
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
                                    navigate(`/${row.id}`);
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
                                    <Button
                                        sx={{
                                            height: "50px",
                                        }}
                                    >
                                        <svg width="19" height="5" viewBox="0 0 19 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.5 0.416626C9.08796 0.416626 8.68517 0.538811 8.34256 0.767731C7.99996 0.996651 7.73293 1.32202 7.57525 1.7027C7.41757 2.08338 7.37631 2.50227 7.4567 2.9064C7.53708 3.31052 7.7355 3.68174 8.02686 3.9731C8.31822 4.26446 8.68944 4.46288 9.09356 4.54326C9.49769 4.62365 9.91658 4.58239 10.2973 4.42471C10.6779 4.26703 11.0033 4 11.2322 3.6574C11.4611 3.31479 11.5833 2.912 11.5833 2.49996C11.5833 1.94742 11.3638 1.41752 10.9731 1.02682C10.5824 0.63612 10.0525 0.416626 9.5 0.416626ZM2.20833 0.416626C1.79629 0.416626 1.3935 0.538811 1.0509 0.767731C0.708294 0.996651 0.441268 1.32202 0.283585 1.7027C0.125903 2.08338 0.0846457 2.50227 0.165032 2.9064C0.245417 3.31052 0.443836 3.68174 0.735195 3.9731C1.02655 4.26446 1.39777 4.46288 1.8019 4.54326C2.20602 4.62365 2.62491 4.58239 3.00559 4.42471C3.38627 4.26703 3.71164 4 3.94056 3.6574C4.16948 3.31479 4.29167 2.912 4.29167 2.49996C4.29167 1.94742 4.07217 1.41752 3.68147 1.02682C3.29077 0.63612 2.76087 0.416626 2.20833 0.416626ZM16.7917 0.416626C16.3796 0.416626 15.9768 0.538811 15.6342 0.767731C15.2916 0.996651 15.0246 1.32202 14.8669 1.7027C14.7092 2.08338 14.668 2.50227 14.7484 2.9064C14.8287 3.31052 15.0272 3.68174 15.3185 3.9731C15.6099 4.26446 15.9811 4.46288 16.3852 4.54326C16.7894 4.62365 17.2082 4.58239 17.5889 4.42471C17.9696 4.26703 18.295 4 18.5239 3.6574C18.7528 3.31479 18.875 2.912 18.875 2.49996C18.875 1.94742 18.6555 1.41752 18.2648 1.02682C17.8741 0.63612 17.3442 0.416626 16.7917 0.416626Z"
                                                fill="#F2F0FF"
                                            />
                                        </svg>
                                    </Button>

                                    <Button>
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

                                    <Button>
                                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.5493 14.0478L6.56174 18.0354C6.07896 18.5013 5.4342 18.7617 4.76325 18.7617C4.0923 18.7617 3.44753 18.5013 2.96475 18.0354C2.72797 17.7995 2.5401 17.5192 2.4119 17.2106C2.2837 16.902 2.21771 16.5711 2.21771 16.2369C2.21771 15.9027 2.2837 15.5718 2.4119 15.2631C2.5401 14.9545 2.72797 14.6742 2.96475 14.4384L6.95227 10.4509C7.1458 10.2573 7.25452 9.99486 7.25452 9.72118C7.25452 9.4475 7.1458 9.18503 6.95227 8.99151C6.75875 8.79799 6.49628 8.68926 6.2226 8.68926C5.94892 8.68926 5.68645 8.79799 5.49292 8.99151L1.5054 12.9893C0.7021 13.8637 0.267649 15.0146 0.292781 16.2017C0.317912 17.3888 0.800683 18.5203 1.64027 19.3598C2.47986 20.1994 3.61135 20.6822 4.79845 20.7073C5.98554 20.7325 7.13645 20.298 8.01082 19.4947L12.0086 15.5072C12.2021 15.3137 12.3109 15.0512 12.3109 14.7775C12.3109 14.5038 12.2021 14.2414 12.0086 14.0478C11.8151 13.8543 11.5526 13.7456 11.2789 13.7456C11.0053 13.7456 10.7428 13.8543 10.5493 14.0478ZM19.367 1.63309C18.5025 0.773932 17.3332 0.29171 16.1143 0.29171C14.8955 0.29171 13.7261 0.773932 12.8616 1.63309L8.86382 5.62061C8.768 5.71643 8.69199 5.83019 8.64013 5.95539C8.58827 6.08059 8.56158 6.21477 8.56158 6.35029C8.56158 6.4858 8.58827 6.61999 8.64013 6.74518C8.69199 6.87038 8.768 6.98414 8.86382 7.07996C8.95964 7.17578 9.0734 7.2518 9.1986 7.30365C9.3238 7.35551 9.45798 7.3822 9.5935 7.3822C9.72901 7.3822 9.86319 7.35551 9.98839 7.30365C10.1136 7.2518 10.2273 7.17578 10.3232 7.07996L14.3107 3.09244C14.7935 2.6265 15.4382 2.36611 16.1092 2.36611C16.7801 2.36611 17.4249 2.6265 17.9077 3.09244C18.1445 3.32829 18.3323 3.60857 18.4605 3.9172C18.5887 4.22583 18.6547 4.55674 18.6547 4.89094C18.6547 5.22513 18.5887 5.55604 18.4605 5.86468C18.3323 6.17331 18.1445 6.45359 17.9077 6.68943L13.9202 10.677C13.8238 10.7725 13.7474 10.8862 13.6952 11.0114C13.643 11.1366 13.6162 11.271 13.6162 11.4066C13.6162 11.5423 13.643 11.6766 13.6952 11.8019C13.7474 11.9271 13.8238 12.0408 13.9202 12.1363C14.0157 12.2326 14.1294 12.3091 14.2546 12.3613C14.3798 12.4134 14.5142 12.4403 14.6498 12.4403C14.7855 12.4403 14.9198 12.4134 15.0451 12.3613C15.1703 12.3091 15.284 12.2326 15.3795 12.1363L19.367 8.13851C20.2262 7.27397 20.7084 6.10464 20.7084 4.8858C20.7084 3.66696 20.2262 2.49762 19.367 1.63309ZM7.17837 13.8218C7.2744 13.917 7.38829 13.9924 7.5135 14.0435C7.63872 14.0946 7.77279 14.1206 7.90805 14.1198C8.0433 14.1206 8.17738 14.0946 8.30259 14.0435C8.42781 13.9924 8.54169 13.917 8.63772 13.8218L13.6941 8.76541C13.8876 8.57189 13.9963 8.30942 13.9963 8.03573C13.9963 7.76205 13.8876 7.49958 13.6941 7.30606C13.5005 7.11254 13.2381 7.00382 12.9644 7.00382C12.6907 7.00382 12.4282 7.11254 12.2347 7.30606L7.17837 12.3624C7.08205 12.4579 7.00559 12.5716 6.95341 12.6968C6.90124 12.8221 6.87438 12.9564 6.87438 13.0921C6.87438 13.2277 6.90124 13.3621 6.95341 13.4873C7.00559 13.6125 7.08205 13.7262 7.17837 13.8218Z"
                                                fill="#F2F0FF"
                                            />
                                        </svg>
                                    </Button>

                                    <Button>
                                        <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M20.6232 8.50563C18.5619 3.71959 14.684 0.75 10.5001 0.75C6.31612 0.75 2.43831 3.71959 0.376942 8.50563C0.320752 8.63438 0.291748 8.77334 0.291748 8.91382C0.291748 9.0543 0.320752 9.19326 0.376942 9.32201C2.43831 14.1081 6.31612 17.0776 10.5001 17.0776C14.684 17.0776 18.5619 14.1081 20.6232 9.32201C20.6794 9.19326 20.7084 9.0543 20.7084 8.91382C20.7084 8.77334 20.6794 8.63438 20.6232 8.50563ZM10.5001 15.0367C7.26517 15.0367 4.20373 12.6998 2.43831 8.91382C4.20373 5.12785 7.26517 2.79096 10.5001 2.79096C13.735 2.79096 16.7964 5.12785 18.5619 8.91382C16.7964 12.6998 13.735 15.0367 10.5001 15.0367ZM10.5001 4.83191C9.69275 4.83191 8.90356 5.07131 8.23229 5.51984C7.56103 5.96836 7.03784 6.60587 6.72889 7.35174C6.41994 8.09761 6.3391 8.91835 6.4966 9.71016C6.6541 10.502 7.04287 11.2293 7.61373 11.8002C8.1846 12.371 8.91193 12.7598 9.70374 12.9173C10.4956 13.0748 11.3163 12.994 12.0622 12.685C12.808 12.3761 13.4455 11.8529 13.8941 11.1816C14.3426 10.5103 14.582 9.72115 14.582 8.91382C14.582 7.83123 14.1519 6.79298 13.3864 6.02747C12.6209 5.26197 11.5827 4.83191 10.5001 4.83191ZM10.5001 10.9548C10.0964 10.9548 9.70182 10.8351 9.36619 10.6108C9.03055 10.3866 8.76896 10.0678 8.61448 9.69486C8.46001 9.32193 8.41959 8.91156 8.49834 8.51565C8.57709 8.11974 8.77147 7.75608 9.05691 7.47065C9.34234 7.18522 9.706 6.99083 10.1019 6.91208C10.4978 6.83333 10.9082 6.87375 11.2811 7.02822C11.6541 7.1827 11.9728 7.44429 12.1971 7.77993C12.4213 8.11556 12.541 8.51016 12.541 8.91382C12.541 9.45512 12.326 9.97424 11.9433 10.357C11.5605 10.7397 11.0414 10.9548 10.5001 10.9548Z"
                                                fill="#F2F0FF"
                                            />
                                        </svg>
                                    </Button>
                                </TableCell>
                            </tr>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
