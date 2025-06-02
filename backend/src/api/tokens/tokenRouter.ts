import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
	ResponseStatus,
	ServiceResponse,
} from "@/common/models/serviceResponse";
import {
	handleServiceResponse,
	validateRequest,
} from "@/common/utils/httpHandlers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { isAddress } from "viem";
import { getTokensByWallet } from "@/common/services/alchemyServices";

extendZodWithOpenApi(z);

export const tokensRegistry = new OpenAPIRegistry();

const tokenQuerySchema = z.object({
	address: z.string().refine((val) => isAddress(val, { strict: false }), {
		message: "Must be a valid Evm address",
	}),
});

type TokenQuery = z.infer<typeof tokenQuerySchema>;

export const tokenRouter: Router = (() => {
	const router = express.Router();

	tokensRegistry.registerPath({
		method: "get",
		path: "/tokens",
		tags: ["Tokens"],
		request: {
			query: tokenQuerySchema,
		},
		responses: createApiResponse(z.null(), "Success"),
	});

	router.get(
		"/",
		validateRequest(z.object({ query: tokenQuerySchema })),
		async (_req: Request, res: Response) => {
			const safeQuery = _req.query as TokenQuery;

			const tokens = await getTokensByWallet(safeQuery.address);

			const serviceReponse = new ServiceResponse(
				ResponseStatus.Success,
				"GetTokens",
				tokens,
				StatusCodes.OK,
			);
			handleServiceResponse(serviceReponse, res);
		},
	);
	return router;
})();
