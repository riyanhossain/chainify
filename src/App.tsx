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

    // get address and chain from redux store
    const { address, chain } = useAppSelector((state) => state.walletConnect);
    const navigate = useNavigate();

    // get current pathname
    const { pathname } = useLocation();


    // if user is not logged in, redirect to login page
    useEffect(() => {
        if (address && chain) {
            QRCodeModal.close();
            if (pathname === "/login") navigate("/");
        } else return;
    }, [address, chain, navigate, pathname]);

    return (
        <main className="">
            <Routes>
                {/* login page */}
                <Route path="/login" element={<Login />} />

                {/* home page */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                {/* single file page */}
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
