import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChainType } from "../helpers/api";
import { IAssetData } from "../helpers/types";
import { RootState } from "../store";

interface FileInterface {
    file_name: string;
    file_size: string;
    file_extension: string;
}
interface WalletConnectState {
    chain: ChainType;
    accounts: string[];
    address: string;
    assets: IAssetData[];
    fetching: boolean;
    files: Array<FileInterface>;
}

const initialState = {
    accounts: [],
    address: "",
    files: [],
    assets: [
        {
            id: 0,
            amount: "0",
            creator: "",
            frozen: false,
            decimals: 6,
            name: "Algo",
            unitName: "Algo",
        },
    ],
    chain: ChainType.MainNet,
    fetching: false,
} as WalletConnectState;

// export const getAccountAssets = createAsyncThunk(
//     "walletConnect/getAccountAssets",
//     async ({ chain, address }: { chain: ChainType; address: string }) => {
//         const assets = await getAssetsFromBackend(chain, address);
//         return assets;
//     }
// );


// Slice is a collection of reducers and actions for a single feature of the application for holding the state of the wallet connect
export const walletConnectSlice = createSlice({
    name: "walletConnect",
    initialState,
    reducers: {
        switchChain(state, action: PayloadAction<ChainType>) {
            state.fetching = !state.fetching;
            state.chain = action.payload;
        },
        reset: (state) => ({ ...initialState, chain: state.chain }),
        change: (state) => {
            state.fetching = !state.fetching;
        },
        onSessionUpdate: (state, action: PayloadAction<string[]>) => {
            state.accounts = action.payload;
            state.address = action.payload[0];
        },
    },
    extraReducers(builder) {
        // builder.addCase(getAccountAssets.fulfilled, (state, action: any) => {
        //     state.fetching = false;
        //     state.assets = action.payload["assets"];
        //     state.files = action.payload["files"];
        // });
        // builder.addCase(getAccountAssets.pending, (state) => {
        //     state.fetching = true;
        // });
    },
});


// Selectors are functions that take the state of the application and return a subset of it and are used to access the state of the application from other files (see https://redux-toolkit.js.org/api/createSelector)
export const selectAssets = createSelector(
    (state: RootState) => state.walletConnect.assets,
    (assets) => assets.map((a) => ({ ...a, amount: a.amount }))
);

export const selectFiles = createSelector(
    (state: RootState) => state.walletConnect.files,
    (files) => files
);

export const { switchChain, reset, change, onSessionUpdate } = walletConnectSlice.actions;

export default walletConnectSlice.reducer;
