import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export default function ProtectedRoute({ children } : any) {
    const { address, chain } = useAppSelector((state) => state.walletConnect);

    return !(address && chain) ? <Navigate to="/login" /> : children;
}
