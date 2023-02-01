import { configureStore } from "@reduxjs/toolkit";
import walletConnectReducer from "../features/walletConnectSlice";
import applicationReducer from "../features/applicationSlice";

// main store to hold the applications state

const store = configureStore({
  reducer: {
    walletConnect: walletConnectReducer,
    application: applicationReducer,
  },
  preloadedState: {},
});

export type StoreGetSate = typeof store.getState;
export type RootState = ReturnType<StoreGetSate>;
export type AppDispatch = typeof store.dispatch;

export default store;
