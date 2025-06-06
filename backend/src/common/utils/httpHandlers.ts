import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodSchema } from "zod";

import {
	ResponseStatus,
	ServiceResponse,
	type ServiceResponseObject,
} from "@/common/models/serviceResponse";

export const handleServiceResponse = (
	serviceResponse: ServiceResponse<ServiceResponseObject>,
	response: Response,
) => {
	return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest =
	(schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({ body: req.body, query: req.query, params: req.params });
			next();
		} catch (err) {
			const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
			const statusCode = StatusCodes.BAD_REQUEST;
			res
				.status(statusCode)
				.send(
					new ServiceResponse(
						ResponseStatus.Failed,
						errorMessage,
						null,
						statusCode,
					),
				);
		}
	};
