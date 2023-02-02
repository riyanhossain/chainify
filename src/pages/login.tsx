import React, { useContext, useEffect } from "react";
import styles from "../styles/login.module.css";
import pera from "../assets/pera.png";
import walletLogo from "../assets/Logo.svg";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { ConnectContext } from "../store/connector";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAccountAssets, onSessionUpdate, reset, selectAssets } from "../features/walletConnectSlice";
import { setIsModalOpen } from "../features/applicationSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { isModalOpen } = useAppSelector((state: any) => state.application);

    // get address and chain from the context
    const { address, chain } = useAppSelector((state) => state.walletConnect);
    const assets = useAppSelector(selectAssets);
    // get algo balance
    const nativeCurrency = assets.find((asset : any) => asset.id === 0)!;
    const dispatch = useAppDispatch();
    const connector = useContext(ConnectContext);

    const connect = async () => {
        if (connector.connected) return null;
        else {
            QRCodeModal.open(connector.uri, null);
            await connector.createSession();
            
        }
    };

    // close the qr code modal


    const navigate = useNavigate();

    useEffect(() => {
        // Check if connection is already established
        if (connector.connected) {
            console.log("connected");
            QRCodeModal.close();
            navigate("/home");
        }
    }, [connector, navigate]);

    // this is what determines whether user wants to make a normal or NFT transaction

    useEffect(() => {
        // Check if connection is already established
        if (connector.connected) {
            const { accounts } = connector;
            dispatch(onSessionUpdate(accounts));
        }

        // Subscribe to connection events
        connector.on("connect", (error, payload) => {
            if (error) {
                throw error;
            }
            const { accounts } = payload.params[0];
            dispatch(onSessionUpdate(accounts));
            dispatch(setIsModalOpen(false));
        });

        connector.on("session_update", (error, payload) => {
            if (error) {
                throw error;
            }
            const { accounts } = payload.params[0];
            dispatch(onSessionUpdate(accounts));
        });

        connector.on("disconnect", (error, payload) => {
            console.log("disconnect")
            // function to run when wallet is disconnected
            if (error) {
                throw error;
            }
            dispatch(reset());
            navigate("/login");
        });

        return () => {
            connector.off("connect");
            connector.off("session_update");
            connector.off("disconnect");
        };
    }, [dispatch, connector, navigate]);

    // useEffect(() => {
    //     // Retrieve assets info
    //     if (address?.length > 0) {
    //         console.log("chain: ", chain);
    //     }
    //     if (address) {
    //         // dispatch(getAccountAssets({ chain, address }));
    //     }
    // }, [dispatch, address, chain]);

    return (
        <React.Fragment>
            <section className={styles.section}>
                {/* logo div */}
                <div className={styles.logo_div}>
                    <div className={styles.logo_bg}>
                        <div className={styles.logo_circle} />
                    </div>

                    <div>
                        <p className={styles.logo_text}>Chainify</p>
                    </div>
                </div>

                <div className={styles.login_div}>
                    <h1 className={styles.login_text}>Chain File System</h1>

                    <div className={styles.login_button_container}>
                        <button type="button" className={styles.login_btn} onClick={connect}>
                            Connect to wallet
                            <img src={pera} alt="pera" className={styles.pera} />
                        </button>
                        <div className={styles.walletconnect_div}>
                            <img src={walletLogo} alt="logo" className={styles.walletconnect_logo} />
                            <p className={styles.walletconnect_text}>secured by walletconnect</p>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
