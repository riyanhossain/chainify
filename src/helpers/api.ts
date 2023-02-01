import algosdk from "algosdk";
import { IAssetData } from "./types";

export enum ChainType {
  MainNet = "mainnet",
  TestNet = "testnet",
}

const mainNetClient = new algosdk.Algodv2(
  "",
  "https://mainnet-api.algonode.cloud",
  ""
);
const testNetClient = new algosdk.Algodv2(
  "",
  "https://testnet-api.algonode.cloud",
  ""
);

function clientForChain(chain: ChainType): algosdk.Algodv2 {
  switch (chain) {
    case ChainType.MainNet:
      return mainNetClient;
    case ChainType.TestNet:
      return testNetClient;
    default:
      throw new Error(`Unknown chain type: ${chain}`);
  }
}

export async function getAssetsFromBackend(
  chain: ChainType,
  address: string
): Promise<IAssetData[]> {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_API_URL}/holdings/get-holdings/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chain: chain,
        active_user: address,
      }),
    }
  );
  const assets = await response.json();
  return assets;
}

export async function apiGetTxnParams(
  chain: ChainType
): Promise<algosdk.SuggestedParams> {
  const params = await clientForChain(chain).getTransactionParams().do();
  return params;
}

export async function apiSubmitTransactions(
  chain: ChainType,
  stxns: Uint8Array[]
): Promise<number> {
  const { txId } = await clientForChain(chain).sendRawTransaction(stxns).do();
  return await waitForTransaction(chain, txId);
}

async function waitForTransaction(
  chain: ChainType,
  txId: string
): Promise<number> {
  const client = clientForChain(chain);

  let lastStatus = await client.status().do();
  let lastRound = lastStatus["last-round"];
  while (true) {
    const status = await client.pendingTransactionInformation(txId).do();
    if (status["pool-error"]) {
      throw new Error(`Transaction Pool Error: ${status["pool-error"]}`);
    }
    if (status["confirmed-round"]) {
      return status["confirmed-round"];
    }
    lastStatus = await client.statusAfterBlock(lastRound + 1).do();
    lastRound = lastStatus["last-round"];
  }
}