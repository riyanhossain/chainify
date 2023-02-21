import React, { useContext } from "react";
import profile from "../../assets/profile.png";
import styles from "../../styles/menu.module.css";
import Menu from "@mui/material/Menu";
import close from "../../assets/close.svg";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { ConnectContext } from "../../store/connector";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { reset } from "../../features/walletConnectSlice";

interface ProfileMenuProps {
    address: string;
}


// mui menu component for profile menu in navbar see mui docs for more info
export default function ProfileMenu({ address }: ProfileMenuProps) {
    const connector = useContext(ConnectContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // open and close menu functions
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // navigate function

    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    // disconnects wallet and resets redux store and navigates to login page
    const handleDisconnect = async () => {
        try {
            await connector.killSession();
            
            handleClose();
            navigate("/login");
            connector.off("connect");
            connector.off("session_update");
            connector.off("disconnect");
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <>
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className={styles.profile_button}
            >
                <div>
                    <img src={profile} alt="profile" className={styles.profile} />
                </div>
            </Button>
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
                        backgroundColor: "#F2F0FF",
                        borderRadius: "8px",
                    },
                }}
            >
                <div style={{ paddingInline: "1rem", background: "#F2F0FF" }}>
                    <div className={styles.close_div}>
                        <Button onClick={handleClose} sx={{ cursor: "pointer", justifyContent: "end", paddingInline: "0px", minWidth: "0px" }}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.295 2.115C13.6844 1.72564 13.6844 1.09436 13.295 0.705V0.705C12.9056 0.315639 12.2744 0.315639 11.885 0.705L7 5.59L2.115 0.705C1.72564 0.315639 1.09436 0.315639 0.705 0.705V0.705C0.315639 1.09436 0.315639 1.72564 0.705 2.115L5.59 7L0.705 11.885C0.315639 12.2744 0.315639 12.9056 0.705 13.295V13.295C1.09436 13.6844 1.72564 13.6844 2.115 13.295L7 8.41L11.885 13.295C12.2744 13.6844 12.9056 13.6844 13.295 13.295V13.295C13.6844 12.9056 13.6844 12.2744 13.295 11.885L8.41 7L13.295 2.115Z"
                                    fill="#B5B3BC"
                                />
                            </svg>
                        </Button>
                    </div>
                    {/* wallet address */}
                    <div className={styles.wallet_address_div}>
                        <p className={styles.wallet_address_text}>
                            {address.slice(0, 7) + " ... " + address.slice(address.length - 7, address.length)}
                        </p>
                        <p className={styles.wallet_address_label}>Address</p>
                    </div>

                    {/* setting */}

                    <Box
                        className={styles.setting_div}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            paddingY: "1rem",
                            borderBottom: "1px solid #242323",
                            marginTop: "5rem",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "18px",
                                fontWeight: "300",
                                fontFamily: "Lato",
                            }}
                        >
                            Settings
                        </p>

                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.70541 0.705384C1.31584 0.315811 0.684215 0.315811 0.294642 0.705384C-0.0946303 1.09466 -0.0949743 1.72569 0.293874 2.11538L4.17003 6L0.293873 9.88462C-0.0949745 10.2743 -0.0946303 10.9053 0.294642 11.2946C0.684215 11.6842 1.31584 11.6842 1.70541 11.2946L6.35717 6.64286C6.71221 6.28782 6.71221 5.71218 6.35717 5.35714L1.70541 0.705384Z"
                                fill="#242323"
                            />
                        </svg>
                    </Box>

                    {/* logout button */}

                    <Button
                        sx={{
                            background: "#242323",
                            borderRadius: "100px",
                            width: "100%",
                            padding: "6px 32px",
                            fontFamily: "Montserrat",
                            fontWeight: "bold",
                            fontSize: "16px",
                            color: "#F2F0FF",
                            mt: "0.5rem",
                            cursor: "pointer",
                            "&:hover": {
                                color: "#242323",
                            },
                        }}
                        onClick={handleDisconnect}
                    >
                        Logout
                    </Button>
                </div>
            </Menu>
        </>
    );
}
