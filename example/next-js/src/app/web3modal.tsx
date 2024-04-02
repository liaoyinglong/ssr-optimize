"use client";

import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";

export type Web3Modal = ReturnType<typeof createWeb3Modal>;
export let web3Modal: Web3Modal | undefined = undefined;

if (typeof window !== "undefined") {
  web3Modal = initModal();
}
function initModal() {
  const ethersConfig = defaultConfig({
    enableCoinbase: false,
    metadata: {
      name: "Web3Modal",
      description: "Web3Modal Example",
      url: "https://web3modal.com", // origin must match your domain & subdomain
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
  });
  return createWeb3Modal({
    ethersConfig,
    chains: [
      {
        chainId: 1,
        name: "Ethereum",
        currency: "ETH",
        explorerUrl: "https://etherscan.io",
        rpcUrl: "https://cloudflare-eth.com",
      },
      {
        chainId: 42161,
        name: "Arbitrum",
        currency: "ETH",
        explorerUrl: "https://arbiscan.io",
        rpcUrl: "https://arb1.arbitrum.io/rpc",
      },
    ],
    projectId: "123",
  });
}

export function Web3Modal() {
  const { isConnected, chainId, address } = useWeb3ModalAccount();

  if (isConnected) {
    return (
      <>
        <h3>current is connected, chainId: {chainId}</h3>
        <h4>address: {address}</h4>
        <button
          onClick={() => {
            web3Modal?.disconnect();
          }}
        >
          disconnect
        </button>
      </>
    );
  }

  return (
    <button
      onClick={() => {
        web3Modal?.open();
      }}
    >
      connect with Web3Modal
    </button>
  );
}
