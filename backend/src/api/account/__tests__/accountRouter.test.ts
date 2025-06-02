import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { vi } from "vitest";

import { app } from "@/server";

const goodAddress = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
const fakeSig =
	"0x0e1ec9ea68b1850417e3f2b2888426c5f24b42a6c0ca37d80e0a61302fd5b1d00831b3d1355d83ffa69a6e3af9f9ee6183b3711e4550876e639c3581001e36201b";

vi.mock("viem", async () => {
	return {
		isAddress: vi.fn(),
		verifyMessage: vi.fn(),
		isHex: vi.fn(),
	};
});

import { isAddress, verifyMessage, isHex } from "viem";

describe("Account Api Endpoint", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("POST / - should return 200 + a JWT when signature is valid", async () => {
		vi.mocked(isAddress).mockReturnValue(true);
		vi.mocked(isHex).mockReturnValue(true);
		vi.mocked(verifyMessage).mockResolvedValueOnce(true);

		const response = await request(app)
			.post("/account")
			.send({ address: goodAddress, signature: fakeSig })
			.expect(StatusCodes.OK);
		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe("OK");
	});

	it("POST / should return 400 if signature is not valid", async () => {
		vi.mocked(isAddress).mockReturnValue(true);
		vi.mocked(isHex).mockReturnValue(true);
		vi.mocked(verifyMessage).mockResolvedValueOnce(false);

		const response = await request(app)
			.post("/account")
			.send({ address: goodAddress, signature: fakeSig })
			.expect(StatusCodes.UNAUTHORIZED);

		expect(response.body.success).toBe(false);
		expect(response.body.message).toBe("Wrong signature");
	});

	it("POST / - should return 400 if address is not EVM compatible", async () => {
		vi.mocked(isAddress).mockReturnValue(false);
		vi.mocked(isHex).mockReturnValue(true);
		vi.mocked(verifyMessage).mockResolvedValueOnce(true);

		const response = await request(app)
			.post("/account")
			.send({ address: goodAddress, signature: fakeSig })
			.expect(StatusCodes.BAD_REQUEST);
		expect(response.body.success).toBe(false);
		expect(response.body.message).toBe(
			"Invalid input: Must be a valid Evm address",
		);
	});
});
