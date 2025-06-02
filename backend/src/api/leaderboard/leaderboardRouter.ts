import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
	ResponseStatus,
	ServiceResponse,
} from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { authMiddleware } from "@/common/middleware/authMiddleware";

export const leaderboardRegistry = new OpenAPIRegistry();

export const leaderboardRouter: Router = (() => {
	const router = express.Router();

	leaderboardRegistry.registerPath({
		method: "get",
		path: "/leaderboard",
		tags: ["Health Check"],
		responses: createApiResponse(z.null(), "Success"),
	});

	router.get("/", authMiddleware, (_req: Request, res: Response) => {
		const serviceResponse = new ServiceResponse(
			ResponseStatus.Success,
			"Leaderboard",
			null,
			StatusCodes.OK,
		);
		handleServiceResponse(serviceResponse, res);
	});

	return router;
})();
