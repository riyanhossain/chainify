export const getFileType = (type: string) => {
    switch (type) {
        case "image/png":
            return "PNG";
        case "image/jpg":
            return "JPG";
        case "image/jpeg":
            return "JPEG";
        // case "image/webp":
        //     return "WEBP";
        case "application/pdf":
            return "PDF";
        // case "application/msword":
        //     return "DOC";
        // case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        //     return "DOCX";
        // case "application/vnd.ms-excel":
        //     return "XLS";
        // case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        //     return "XLSX";
        // case "application/vnd.ms-powerpoint":
        //     return "PPT";
        // case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        //     return "PPTX";
        case "application/zip":
            return "ZIP";
        case "application/x-zip-compressed":
            return "ZIP";
        // case "application/x-rar-compressed":
        //     return "RAR";
        // case "application/x-7z-compressed":
        //     return "7Z";
        // case "application/x-tar":
        //     return "TAR";
        // case "application/x-gzip":
        //     return "GZ";
        // case "application/x-bzip2":
        //     return "BZ2";
        // case "application/x-xz":
        //     return "XZ";
        // case "application/x-lzma":
        //     return "LZMA";
        // case "application/x-lzip":
        //     return "LZIP";
        // case "application/x-lzop":
        //     return "LZOP";
        // case "application/x-lz4":
        //     return "LZ4";
        // case "application/x-rpm":
        //     return "RPM";
        // case "application/x-deb":
        //     return "DEB";
        // case "application/x-cab":
        //     return "CAB";
        // case "application/x-msi":
        //     return "MSI";
        // case "application/x-ms-dos-executable":
        //     return "EXE";
        // case "application/x-msdownload":
        //     return "DLL";
        // case "application/x-ms-shortcut":
        //     return "LNK";
        // case "application/x-java-archive":
        //     return "JAR";
        // case "application/x-java-jnlp-file":
        //     return "JNLP";
        // case "application/x-java-pack200":
        //     return "PACK";
        // case "application/x-java-serialized-object":
        //     return "SER";
        // case "application/x-java-vm":
        //     return "CLASS";
        // case "application/x-javascript":
        //     return "JS";

        default:
            return "FILE";
    }
};
