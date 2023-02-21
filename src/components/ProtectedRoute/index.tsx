import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";


// this is a protected route that checks if the user is logged in
export default function ProtectedRoute({ children } : any) {
    const { address, chain } = useAppSelector((state) => state.walletConnect);

    return !(address && chain) ? <Navigate to="/login" /> : children;
}
