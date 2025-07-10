'use client'

// import React from "react";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { http, WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'HICApp',
    projectId: 'HICApp',
    chains: [mainnet, sepolia],
    ssr: true,
    transports: {
      [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/8rgdAH9Vy_zuXQFA2hedqK_a_3GAxvuZ'),
      [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/8rgdAH9Vy_zuXQFA2hedqK_a_3GAxvuZ'),
    },
  })

  const queryClient = new QueryClient();

  export default function EthProv({ children }: { children: React.ReactNode }) {
   
    return (
        <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }