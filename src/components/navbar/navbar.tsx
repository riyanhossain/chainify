import React from "react";
import { useAppSelector } from "../../store/hooks";
import styles from "../../styles/navbar.module.css";
import algo from "../../assets/algo.svg";

import ProfileMenu from "./menu";


// navbar component for all pages
export default function Navbar() {

    // redux state for wallet address and assets
    const { address, assets } = useAppSelector((state) => state.walletConnect);
    return (
        <div className={styles.nav}>
            {/* logo div */}
            <div className={styles.logo_div}>
                <div className={styles.logo_bg}>
                    <div className={styles.logo_circle} />
                </div>

                <div>
                    <p className={styles.logo_text}>Chainify</p>
                </div>
            </div>

            {/* assets info */}

            <div className={styles.assets_info_container}>
                {/* wallet address */}
                <div className={styles.wallet_address_div}>
                    <p className={styles.wallet_address_text}>
                        {address.slice(0, 10) + " ... " + address.slice(address.length - 10, address.length)}
                    </p>
                    <p className={styles.wallet_address_label}>Address</p>
                </div>

                {/* wallet balance */}
                <div className={styles.wallet_balance_div}>
                    <div className={styles.balance_info}>
                        <p className={styles.wallet_balance_text}>3.243</p>
                        <img src={algo} alt="algo logo" className={styles.algo} />
                    </div>
                    <p className={styles.wallet_balance_label}>Balance</p>
                </div>

                <div>
                    <ProfileMenu address={address} />
                </div>
            </div>
        </div>
    );
}
