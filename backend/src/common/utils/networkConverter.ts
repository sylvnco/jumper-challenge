import { Network } from "alchemy-sdk";

export const convertChainIdToAlchemyNetwork = (chainId?: number) => {
	switch (chainId) {
		case 11155111:
			return Network.ETH_SEPOLIA;
		case 137:
			return Network.MATIC_MAINNET;
		default:
			return Network.ETH_MAINNET;
	}
};
