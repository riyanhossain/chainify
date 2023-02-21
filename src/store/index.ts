import { configureStore } from "@reduxjs/toolkit";
import walletConnectReducer from "../features/walletConnectSlice";
import applicationReducer from "../features/applicationSlice";
import { apiSlice } from "../helpers/apiSlice";

// main store to hold the applications state

const store = configureStore({
    reducer: {
        // apiSlice.reducer is a reducer from @reduxjs/toolkit that handles async requests and caching for us automatically based on the request parameters and response data (see https://redux-toolkit.js.org/api/createApi) 
        [apiSlice.reducerPath]: apiSlice.reducer,

        // walletConnectSlice and applicationSlice are reducers that we wrote ourselves to handle the state of the wallet connect and application respectively
        walletConnect: walletConnectReducer,
        application: applicationReducer,
    },
    preloadedState: {},

    // enable redux devtools in development mode only (see https://redux-toolkit.js.org/api/configureStore)
    devTools: process.env.NODE_ENV !== "production",

    // add the apiSlice middleware to the store so that it can handle async requests and caching for us automatically based on the request parameters and response data (see https://redux-toolkit.js.org/api/createApi)
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});

// export the store's types for use in other files

export type StoreGetSate = typeof store.getState;
export type RootState = ReturnType<StoreGetSate>;
export type AppDispatch = typeof store.dispatch;



export default store;
