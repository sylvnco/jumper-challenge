import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { vi } from "vitest";

import { app } from "@/server";

const goodAddress = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
const mockTokens = [
	{
		symbol: "string",
		balance: "1",
		decimal: 1,
		name: "string",
		address: "0x" as Address,
		logo: "logo",
	},
	{
		symbol: "string",
		balance: "1",
		decimal: 1,
		name: "string",
		address: "0xString" as Address,
		logo: "logo",
	},
	{
		symbol: "string",
		balance: "1",
		decimal: 1,
		name: "string",
		address: "0x" as Address,
		logo: "logo",
	},
];
vi.mock("viem", async () => {
	return {
		isAddress: vi.fn(),
	};
});

import { type Address, isAddress } from "viem";

vi.mock("@/common/services/alchemyServices", () => ({
	getTokensByWallet: vi.fn(),
}));
import { getTokensByWallet } from "@/common/services/alchemyServices";

describe("Token Api endpoint", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("GET / Should return the list of tokens for an address", async () => {
		vi.mocked(isAddress).mockReturnValue(true);
		vi.mocked(getTokensByWallet).mockResolvedValue(mockTokens);
		const response = await request(app)
			.get("/tokens")
			.query({ address: goodAddress })
			.expect(StatusCodes.OK);
		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe("GetTokens");
		expect(response.body.responseObject).toHaveLength(3);
	});

	it("GET / Should return nothing if bad address format", async () => {
		vi.mocked(isAddress).mockReturnValue(false);
		vi.mocked(getTokensByWallet).mockResolvedValue([]);
		const response = await request(app)
			.get("/tokens")
			.query({ address: goodAddress })
			.expect(StatusCodes.BAD_REQUEST);
		expect(response.body.success).toBe(false);
		expect(response.body.message).toBe(
			"Invalid input: Must be a valid Evm address",
		);
		expect(response.body.responseObject).toBeNull();
	});
});
