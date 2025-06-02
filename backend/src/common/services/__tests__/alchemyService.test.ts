import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/common/clients/alchemyClient", () => ({
	getTokensByWallet: vi.fn(),
}));

import { getTokensByWallet as getAlchemyTokensByWallet } from "@/common/clients/alchemyClient";

vi.mock("viem", () => ({
	isHex: vi.fn(),
	hexToBigInt: vi.fn(),
	formatUnits: vi.fn(),
}));

import { isHex, hexToBigInt, formatUnits, type Address } from "viem";

import { getTokensByWallet } from "@/common/services/alchemyServices";
import type { AlchemyTokenResponse } from "@/common/models/alchemyTokenResponse";

const WALLET = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045" as Address;

const ALCHEMY_TOKEN_OK = {
	tokenAddress: "0x1111111111111111111111111111111111111111",
	tokenBalance: "0x01",
	tokenMetadata: {
		decimals: 18,
		logo: "logo.png",
		name: "ETH",
		symbol: "ETH",
	},
} as unknown as AlchemyTokenResponse;

const ALCHEMY_TOKEN_ZERO = {
	...ALCHEMY_TOKEN_OK,
	tokenBalance: "0x00",
};

const ALCHEMY_TOKEN_BAD_META = {
	...ALCHEMY_TOKEN_OK,
	tokenMetadata: undefined,
};

beforeEach(() => {
	vi.clearAllMocks();
});

describe("getTokensByWallet", () => {
	it.skip("return token list", async () => {
		vi.mocked(getAlchemyTokensByWallet).mockResolvedValueOnce([
			ALCHEMY_TOKEN_OK,
		]);
		vi.mocked(formatUnits).mockReturnValue("1.0");
		vi.mocked(isHex).mockReturnValue(true);
		vi.mocked(hexToBigInt).mockReturnValue(1n);
		const tokens = await getTokensByWallet(WALLET);
		expect(tokens).toEqual([
			{
				address: ALCHEMY_TOKEN_OK.tokenAddress,
				balance: "1.0",
				decimal: 18,
				logo: "logo.png",
				name: "ETH",
				symbol: "ETH",
			},
		]);

		expect(getAlchemyTokensByWallet).toHaveBeenCalledWith(WALLET);
	});

	it("remove tokens with 0 balance or bad metadata", async () => {
		vi.mocked(getAlchemyTokensByWallet).mockResolvedValueOnce([
			ALCHEMY_TOKEN_ZERO,
			ALCHEMY_TOKEN_BAD_META,
		]);

		vi.mocked(hexToBigInt).mockImplementation((hex) =>
			hex === "0x00" ? 0n : 1n,
		);

		const tokens = await getTokensByWallet(WALLET);

		expect(tokens).toEqual([]);
	});

	it("return empty array if alchemy throw an error", async () => {
		vi.mocked(getAlchemyTokensByWallet).mockRejectedValueOnce(
			new Error("Error from alchemy"),
		);

		const tokens = await getTokensByWallet(WALLET);

		expect(tokens).toEqual([]);
	});
});
