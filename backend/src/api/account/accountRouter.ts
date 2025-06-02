import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
	ServiceResponse,
	ResponseStatus,
} from "@/common/models/serviceResponse";
import {
	handleServiceResponse,
	validateRequest,
} from "@/common/utils/httpHandlers";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { isAddress, verifyMessage, isHex } from "viem";
import jwt from "jsonwebtoken";

extendZodWithOpenApi(z);

export const accountRegistry = new OpenAPIRegistry();

const accountBodySchema = z.object({
	address: z.string().refine((val) => isAddress(val, { strict: false }), {
		message: "Must be a valid Evm address",
	}),
	signature: z.string().refine((val) => isHex(val, { strict: false })),
});

type AccountBody = z.infer<typeof accountBodySchema>;

export const accountRouter: Router = (() => {
	const router = express.Router();

	accountRegistry.registerPath({
		method: "post",
		path: "/account",
		tags: ["Account"],
		request: {
			body: {
				required: true,
				content: {
					"application/json": {
						schema: accountBodySchema,
					},
				},
			},
		},
		responses: createApiResponse(z.null(), "Success"),
	});

	router.post(
		"/",
		validateRequest(z.object({ body: accountBodySchema })),
		async (_req: Request, res: Response) => {
			const safeBody = _req.body as AccountBody;

			const isVerified = await verifyMessage({
				address: safeBody.address,
				message: "Account Creation",
				signature: safeBody.signature,
			});

			if (isVerified) {
				// account creation
				const JWT_SECRET = z.string().safeParse(process.env.JWT_SECRET);
				if (!JWT_SECRET.success) {
					throw Error("Missing env variable JWT_SECRET");
				}

				const token = jwt.sign(
					{
						sub: safeBody.address.toLowerCase(),
					},
					JWT_SECRET.data,
					{
						expiresIn: "7d",
					},
				);

				const serviceResponse = new ServiceResponse(
					ResponseStatus.Success,
					"OK",
					{ token },
					StatusCodes.OK,
				);
				handleServiceResponse(serviceResponse, res);
			} else {
				const serviceResponse = new ServiceResponse(
					ResponseStatus.Failed,
					"Wrong signature",
					null,
					StatusCodes.UNAUTHORIZED,
				);
				handleServiceResponse(serviceResponse, res);
			}
		},
	);
	return router;
})();
