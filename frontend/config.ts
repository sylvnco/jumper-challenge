import { createConfig, http, injected } from "wagmi";
import { sepolia, mainnet, polygonAmoy, polygon } from "viem/chains";
import { walletConnect } from "wagmi/connectors";

const walletConnectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;
export type chainIds = 1 | 11155111 | 137;

export const config = createConfig({
	chains: [sepolia, mainnet, polygon],
	connectors: [
		injected(),
		walletConnect({
			projectId: walletConnectId as string,
		}),
	],
	ssr: true,
	transports: {
		[sepolia.id]: http(),
		[mainnet.id]: http(),
		[polygon.id]: http(),
	},
});

declare module "wagmi" {
	interface Register {
		config: typeof config;
	}
}
