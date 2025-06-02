import type {
	Network,
	TokenMetadataResponse,
	TokenPriceByAddressResult,
} from "alchemy-sdk";
import type { Address } from "viem";

export type AlchemyTokenResponse = {
	network: Network;
	address: string;
	tokenBalance: string;
	tokenMetadata?: TokenMetadataResponse;
	tokenPrices?: TokenPriceByAddressResult;
	tokenAddress?: Address;
};
