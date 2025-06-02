import { Alchemy, Network, type PortfolioAddress } from "alchemy-sdk";
import type { Address } from "viem";
import type { AlchemyTokenResponse } from "@/common/models/alchemyTokenResponse";
const settings = {
	apiKey: process.env.ALCHEMY_KEY,
	Network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export const getTokensByWallet = async (address: Address) => {
	let tokensResult: AlchemyTokenResponse[] = [];
	const porfolioAddress: PortfolioAddress[] = [
		{ address, networks: [Network.ETH_MAINNET] },
	];
	try {
		const result = await alchemy.portfolio.getTokensByWallet(porfolioAddress);
		const { pageKey, tokens } = result.data;
		// Alchemy provides a `pageKey`, so I should be able to iterate and fetch all my tokens,
		// but it seems I can’t use it with the current API…
		// For the sake of the exercise, I’ll just return the first page.

		tokensResult = tokens;
	} catch (error) {
		console.error("Error while fetching tokens from alchemy");
		return [];
	}

	return tokensResult;
};
