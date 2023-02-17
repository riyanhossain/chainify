import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ${process.env.REACT_APP_BASE_API_URL}/

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:3000/`,
    }),
    tagTypes: ["Assets"],
    endpoints: (builder) => ({}),
});
