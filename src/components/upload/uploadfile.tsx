import { ImageList } from "@mui/material";
import { Box } from "@mui/system";
import { set } from "immer/dist/internal";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useUploadAssetsMutation } from "../../helpers/api";
import { useAppSelector } from "../../store/hooks";
import FileUploadModal from "./modal";

interface UploadImageInterface {
    setImageList: Function;
    imageList: ImageListType;
}

const UploadPostImage: React.FC = () => {
    // get address and chain from redux store
    const { address, chain } = useAppSelector((state) => state.walletConnect);

    // state for modal
    const [open, setOpen] = React.useState<boolean>(false);

    // state for image list
    const [imageList, setImageList] = React.useState<ImageListType | []>([]);

    // allow user to only enter one image
    const maxNumber = 1;

    // all file types where we will display an image
    const imageTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {

        // holds the image to this imageList state
        setImageList(imageList);

        // open modal
        setOpen(true);
    };


    // this is the mutation that is used to upload the image to the backend server 
    const [uploadAssets] = useUploadAssetsMutation();

    // this is the function that is called when the user clicks on the upload button
    const handleUpload = async () => {
        const file_name = imageList[0]?.["file"]?.["name"];
        const dotPosition = file_name?.lastIndexOf(".");
        let extension = file_name?.substring(dotPosition ? dotPosition : 0, file_name.length);
        const alternative_file_name = file_name?.substring(0, dotPosition ? dotPosition : 0);
        if (!extension) {
            extension = "";
        }
        // upload the image to the backend server
        uploadAssets(
            JSON.stringify({
                active_user: address,
                file: imageList[0],
                chain: chain,
                file_extension: extension,
                original_file_name: alternative_file_name,
                file_name: `${alternative_file_name}.${extension}`,
            })
        );
    };

    return (
        <div>

            {/* iamge uploading  component see react-images-uploading npm or github docs for more info */}
            <ImageUploading
                value={imageList}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                allowNonImageType={true}
                multiple={false}
            >
                {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                    <Box
                        sx={{
                            height: "92px",
                            width: "100%",

                            /*Vertical*/
                            // backgroundImage: "linear-gradient(black 33%, rgba(255,255,255,0) 0%)",
                            // backgroundPosition: "right",
                            // backgroundSize: "1px 3px",
                            // backgroundRepeat: "repeat-y",
                        }}
                        className="dashed_border"
                    >
                        <Box
                            sx={{
                                height: "100%",
                                width: "100%",
                                rounded: "20px",
                                padding: "2px",
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "12px",
                                }}
                                style={isDragging ? { background: "#1E1E1E" } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                <svg width="51" height="41" viewBox="0 0 51 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M51 18.2197V34.6142C50.9348 36.3646 50.1634 38.019 48.8596 39.2144C47.5558 40.4099 45.8283 41.0503 44.0464 40.9969H6.95356C5.17171 41.0503 3.44418 40.4099 2.14039 39.2144C0.8366 38.019 0.0651896 36.3646 0 34.6142V18.2197C0 17.6113 0.239029 17.0349 0.673626 16.608C1.10822 16.181 1.69493 15.9462 2.31423 15.9462C2.93353 15.9462 3.52024 16.181 3.95484 16.608C4.38943 17.0349 4.62846 17.6113 4.62846 18.2197V34.6142C4.70452 35.1478 4.987 35.6388 5.4216 35.9804C5.8562 36.3219 6.39945 36.482 6.95356 36.4393H44.0356C44.5897 36.482 45.1329 36.3219 45.5675 35.9804C46.0021 35.6388 46.2846 35.1478 46.3607 34.6142V18.2197C46.3607 17.6113 46.5997 17.0349 47.0343 16.608C47.4689 16.181 48.0556 15.9462 48.6749 15.9462C49.2942 15.9462 49.8809 16.181 50.3155 16.608C50.7501 17.0349 51 17.6113 51 18.2197ZM23.8594 28.9359C24.2614 29.3201 24.7829 29.5549 25.3479 29.5976H25.7934C26.2605 29.5442 26.6951 29.3521 27.0428 29.0533L27.1623 28.9359L34.3984 21.8593C34.6157 21.6459 34.7895 21.4004 34.8982 21.1122C35.0177 20.8347 35.072 20.5358 35.072 20.237C35.072 19.9381 35.0068 19.6392 34.8982 19.3617C34.7787 19.0842 34.6048 18.8281 34.3984 18.6146C34.1811 18.4011 33.9312 18.2303 33.6378 18.1236C33.3553 18.0062 33.0511 17.9528 32.7469 17.9528C32.4427 17.9528 32.1385 18.0169 31.856 18.1236C31.5735 18.241 31.3127 18.4118 31.0954 18.6146L27.8251 21.8273V2.27346C27.8251 1.66507 27.5861 1.0887 27.1515 0.661757C26.7169 0.234817 26.1302 0 25.5109 0C24.8916 0 24.3049 0.234817 23.8703 0.661757C23.4357 1.0887 23.1966 1.66507 23.1966 2.27346V21.838L19.9263 18.6039C19.709 18.3904 19.4591 18.2197 19.1766 18.1023C18.8941 17.9848 18.5899 17.9315 18.2857 17.9315C17.9815 17.9315 17.6772 17.9955 17.3948 18.1023C17.1123 18.2197 16.8515 18.3904 16.6451 18.6039C16.4278 18.8174 16.2648 19.0735 16.1453 19.3511C16.0258 19.6286 15.9715 19.9274 15.9715 20.2263C15.9715 20.5251 16.0258 20.824 16.1453 21.1015C16.2648 21.379 16.4278 21.6352 16.6451 21.8487L23.8594 28.9359Z"
                                        fill="white"
                                    />
                                </svg>

                                <p
                                    style={{
                                        color: "#B5B3BC",
                                        fontSize: "22px",
                                        fontFamily: "Lato",
                                        fontWeight: "400",
                                    }}
                                >
                                    Drop your file here or
                                </p>
                                <button
                                    style={{
                                        color: "#0368FF",
                                        fontSize: "22px",
                                        fontFamily: "Lato",
                                        fontWeight: "bold",
                                        background: "none",
                                        border: "none",
                                        outline: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    Browse file
                                </button>
                                <input type="file" hidden accept="image/jpeg" />
                            </Box>

                            {/* &nbsp;
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    {imageTypes.includes(image["file"]?.["type"] || "") ? (
                                        <img src={image["data_url"]} alt="" width="180" className="m-2" />
                                    ) : (
                                        <span>{image["file"]?.["name"]}</span>
                                    )}
                                    <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageUpdate(index)}>Update</button>
                                        <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))} */}
                        </Box>
                    </Box>
                )}
            </ImageUploading>

            <FileUploadModal open={open} setOpen={setOpen} image={imageList[0] || null} setImage={setImageList} handleUpload={handleUpload} />
        </div>
    );
};

export default UploadPostImage;
