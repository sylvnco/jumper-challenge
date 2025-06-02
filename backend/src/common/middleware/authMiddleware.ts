import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { z } from "zod";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const auth = req.headers.authorization;
	if (!auth?.startsWith("Bearer ")) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			message: "Missing or bad Authorization header",
		});
	}

	const token = auth.split(" ")[1];
	try {
		const JWT_SECRET = z.string().safeParse(process.env.JWT_SECRET);
		if (JWT_SECRET.success) {
			jwt.verify(token, JWT_SECRET.data);
			next();
		} else {
			throw new Error("Missing JWT_SECRET");
		}
	} catch {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			message: "Invalid or expired token",
		});
	}
};
