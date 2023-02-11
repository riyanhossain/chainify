import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import { useAppSelector } from "./store/hooks";
import File from "./pages/file";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const { address, chain } = useAppSelector((state) => state.walletConnect);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (address && chain) {
            QRCodeModal.close();
            if (pathname === "/login") navigate("/");
        } else return;
    }, [address, chain, navigate, pathname]);

    return (
        <main className="">
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/file/:id"
                    element={
                        // <ProtectedRoute>
                        <File />
                        // </ProtectedRoute>
                    }
                />
            </Routes>
        </main>
    );
}

export default App;
