import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/navbar.module.css";

export default function FileNavbar() {
    const navigate = useNavigate();
    return (
        <div className={styles.nav}>
            {/* logo div */}
            <div
                className={styles.logo_div}
                style={{
                    cursor: "pointer",
                }}
                onClick={() => navigate("/")}
            >
                <div className={styles.logo_bg}>
                    <div className={styles.logo_circle} />
                </div>

                <div>
                    <p className={styles.logo_text}>Chainify</p>
                </div>
            </div>
        </div>
    );
}
