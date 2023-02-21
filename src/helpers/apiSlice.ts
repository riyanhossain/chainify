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

// createApi is a function from @reduxjs/toolkit that handles async requests and caching for us automatically based on the request parameters and response data (see https://redux-toolkit.js.org/api/createApi)

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // base url for all requests
        baseUrl: `${process.env.REACT_APP_BASE_API_URL}/`,

        // add the chain and active_user headers to all requests
        prepareHeaders: (headers, { getState }) => {
            const { chain, address } = (getState() as RootState).walletConnect;

            if (chain && address) {
                headers.set("chain", chain);
                headers.set("active_user", address);
            }
        },
    }),

    // tagTypes is an array of strings that are used to identify the different types of requests that we make to the backend
    tagTypes: ["Assets"],

    // endpoints is an object that contains the different types of requests that we make to the backend
    endpoints: (builder) => ({}),
});
