import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getFileType } from "../../utils/GetFileType";

const style = {
    position: "absolute" as "absolute",
    top: "0%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    width: 849,
    bgcolor: "#242323",
    boxShadow: 24,
    p: 2,
    borderRadius: "4px",
};

interface FileUploadModalProps {
    open: boolean;
    setOpen: Function;
    image: object | any;
    setImage: Function;
}

export default function FileUploadModal({ open, setOpen, image, setImage }: FileUploadModalProps) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setImage([]);
    };




    const [rename, setRename] = React.useState<string>("");
    const [renameEnable, setRenameEnable] = React.useState<boolean>(false);

    return (
        <>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            fontFamily: "Montserrat",
                            fontWeight: "bold",
                            fontSize: "24px",
                            letterSpacing: "0.01em",
                            color: "#F2F0FF",
                        }}
                    >
                        File upload
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 4,
                            gap: 4,
                        }}
                    >
                        <Box
                            sx={{
                                width: "264px",
                                height: "264px",
                                background: "#F2F0FF",
                            }}
                        >
                            <img
                                src={image?.data_url}
                                alt="img"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                width: "506px",
                            }}
                        >
                            <Box
                                sx={{
                                    background: "#FF9533",
                                    borderRadius: "200px",
                                    width: "100%",
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "20px",
                                        letterSpacing: "0.01em",
                                        color: "#F2F0FF",
                                        padding: "10px",
                                    }}
                                >
                                    {image?.file?.name}
                                </p>
                            </Box>

                            {renameEnable ? (
                                <Box
                                    sx={{
                                        fontFamily: "Lato",
                                        fontWeight: "600",
                                        fontSize: "20px",
                                        letterSpacing: "0.01em",
                                        color: "#F2F0FF",
                                        mt: "10px",
                                    }}
                                >
                                    <input
                                        type="text"
                                        value={rename}
                                        onChange={(e) => setRename(e.target.value)}
                                        style={{
                                            width: "100%",
                                            height: "40px",
                                            background: "#F2F0FF",
                                            border: "none",
                                            outline: "none",
                                            color: "",
                                            fontSize: "20px",
                                            fontFamily: "Lato",
                                            fontWeight: "400",
                                            letterSpacing: "0.01em",
                                            borderRadius: "100px",
                                            paddingLeft: "10px",
                                            
                                        }}
                                        placeholder="Rename file"
                                    />
                                </Box>
                            ) : null}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mt: 1,
                                    alignItems: "center",
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "Lato",
                                        fontWeight: "400",
                                        fontSize: "18px",
                                        letterSpacing: "0.01em",
                                        color: "#B5B3BC",
                                    }}
                                >
                                    Immagine {getFileType(image?.file?.type)} - {(image?.file?.size / 1024 / 1024).toFixed(1)} MB
                                </p>

                                {renameEnable ? (
                                    <button
                                        style={{
                                            fontFamily: "Lato",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                            letterSpacing: "0.01em",
                                            color: "#FF3E95",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setRenameEnable(false)}
                                    >
                                        close
                                    </button>
                                ) : (
                                    <button
                                        style={{
                                            fontFamily: "Lato",
                                            fontWeight: "400",
                                            fontSize: "18px",
                                            letterSpacing: "0.01em",
                                            color: "#FF3E95",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setRenameEnable(true)}
                                    >
                                        Rename file
                                    </button>
                                )}
                            </Box>

                            <Box
                                sx={{
                                    mt: renameEnable ? 1 : 6,
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "Lato",
                                        fontWeight: "400",
                                        fontSize: "18px",
                                        letterSpacing: "0.01em",
                                        color: "#B5B3BC",
                                    }}
                                >
                                    Chain: Algorand
                                </p>
                                <p
                                    style={{
                                        fontFamily: "Lato",
                                        fontWeight: "400",
                                        fontSize: "18px",
                                        letterSpacing: "0.01em",
                                        color: "#B5B3BC",
                                        marginTop: "10px",
                                    }}
                                >
                                    Cost: 0.01$
                                </p>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                        mt: 6,
                                    }}
                                >
                                    <button
                                        style={{
                                            fontFamily: "Montserrat",
                                            fontWeight: "700",
                                            fontSize: "18px",
                                            letterSpacing: "0.04em",
                                            color: "#B5B3BC",
                                            textTransform: "uppercase",
                                            background: "none",
                                            border: "1.5px solid #B5B3BC",
                                            cursor: "pointer",
                                            padding: "6px 32px",
                                            borderRadius: "100px",
                                        }}
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        style={{
                                            fontFamily: "Montserrat",
                                            fontWeight: "700",
                                            fontSize: "18px",
                                            letterSpacing: "0.04em",
                                            color: "#FFF",
                                            textTransform: "uppercase",
                                            background: "#0368FF",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: "6px 32px",
                                            borderRadius: "100px",
                                        }}
                                    >
                                        Upload
                                    </button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
