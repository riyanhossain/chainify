import { configureStore } from "@reduxjs/toolkit";
import walletConnectReducer from "../features/walletConnectSlice";
import applicationReducer from "../features/applicationSlice";
import { apiSlice } from "../helpers/apiSlice";

// main store to hold the applications state

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        walletConnect: walletConnectReducer,
        application: applicationReducer,
    },
    preloadedState: {},
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});

export type StoreGetSate = typeof store.getState;
export type RootState = ReturnType<StoreGetSate>;
export type AppDispatch = typeof store.dispatch;

export default store;
