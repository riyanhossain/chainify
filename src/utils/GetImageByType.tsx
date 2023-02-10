import React from "react";
import file from "../assets/file icons/file.svg";
import jpg from "../assets/file icons/jpg.svg";
import png from "../assets/file icons/png.svg";
import pdf from "../assets/file icons/pdf.svg";
import zip from "../assets/file icons/zip.svg";
import { getFileType } from "./GetFileType";

interface GetImageByTypeProps {
    type: string;
}

export default function GetImageByType({ type }: GetImageByTypeProps) {
    const imageType = getFileType(type);
    switch (imageType) {
        case "JPG":
            return (
                <img
                    src={jpg}
                    alt="jpg"
                    style={{
                        height: "45px",
                    }}
                />
            );
        case "JPEG":
            return (
                <img
                    src={jpg}
                    alt="jpg"
                    style={{
                        height: "45px",
                    }}
                />
            );
        case "PNG":
            return (
                <img
                    src={png}
                    alt="png"
                    style={{
                        height: "45px",
                    }}
                />
            );
        case "PDF":
            return (
                <img
                    src={pdf}
                    alt="pdf"
                    style={{
                        height: "45px",
                    }}
                />
            );
        case "ZIP":
            return (
                <img
                    src={zip}
                    alt="pdf"
                    style={{
                        height: "45px",
                    }}
                />
            );
        default:
            return (
                <img
                    src={file}
                    alt="file"
                    style={{
                        height: "45px",
                    }}
                />
            );
    }
}
