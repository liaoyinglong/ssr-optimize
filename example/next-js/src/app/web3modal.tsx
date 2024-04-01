"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

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

    chains: [],
    projectId: "123",
  });
}

export function Web3ModalTrigger() {
  return (
    <button
      onClick={() => {
        web3Modal?.open();
      }}
    >
      open web3 modal
    </button>
  );
}
