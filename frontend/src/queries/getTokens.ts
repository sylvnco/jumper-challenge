import type { Address } from "viem";
import { getTokens as clientGetTokens } from "@/client";

export const getTokens = async (address: Address, chainId: number) => {
	const response = await clientGetTokens({
		query: {
			address,
			chainId,
		},
	});

	if (response.error) {
		const errorMessage = (response.error as { message: string }).message;
		throw new Error(errorMessage);
	}
	return response.data?.responseObject;
};
