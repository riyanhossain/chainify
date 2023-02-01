import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
// import "./App.css";
// import "./index.css"
import Home from "./pages/home";
import Login from "./pages/login";
import { useAppSelector } from "./store/hooks";

function App() {
    const { address, chain } = useAppSelector((state) => state.walletConnect);

    const navigate = useNavigate();

    useEffect(() => {
        if (address && chain) {
            navigate("/");
            QRCodeModal.close();
        } else {
            navigate("/login");
        }
    }, [address, chain, navigate]);

    return (
        <main className=" bg-white">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </main>
    );
}

export default App;
