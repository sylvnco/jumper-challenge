import { getTokensByWallet as getAlchemyTokensByWallet } from "@/common/clients/alchemyClient";
import { formatUnits, hexToBigInt, isHex, type Address, type Hex } from "viem";
import { type TokenResponse, TokenSchema } from "@/common/models/tokenResponse";
import { z } from "zod";

export const getTokensByWallet = async (
	address: Address,
): Promise<TokenResponse[]> => {
	try {
		const alchemyTokens = await getAlchemyTokensByWallet(address);

		const tokens = alchemyTokens
			.filter(({ tokenBalance, tokenMetadata, tokenAddress }) => {
				const decimals = tokenMetadata?.decimals;
				if (!tokenMetadata || !decimals || !isHex(tokenAddress)) return false;

				try {
					return hexToBigInt(tokenBalance as Hex) > 0n;
				} catch {
					return false;
				}
			})
			.map((x) => {
				const decimals = x.tokenMetadata?.decimals;
				return {
					address: x.tokenAddress,
					balance:
						(decimals &&
							formatUnits(hexToBigInt(x.tokenBalance as Hex), decimals)) ||
						"0",
					decimal: x.tokenMetadata?.decimals,
					logo: x.tokenMetadata?.logo,
					name: x.tokenMetadata?.name,
					symbol: x.tokenMetadata?.symbol,
				};
			});
		return z.array(TokenSchema).parse(tokens);
	} catch (error) {
		console.error("Error while processing tokens", error);
		return [];
	}
};
