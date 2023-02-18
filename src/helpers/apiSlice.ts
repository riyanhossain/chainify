import {  RootState } from "./../store/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ThunkDispatch } from "redux-thunk";

// backend url
// ${process.env.REACT_APP_BASE_API_URL}/

export interface BaseQueryApi {
    signal: AbortSignal;
    dispatch: ThunkDispatch<any, any, any>;
    getState: () => unknown;
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BASE_API_URL}/`,
        prepareHeaders: (headers, { getState }) => {
            const { chain, address } = (getState() as RootState).walletConnect;

            if (chain && address) {
                headers.set("chain", chain);
                headers.set("active_user", address);
            }
        },
    }),
    tagTypes: ["Assets"],
    endpoints: (builder) => ({}),
});
