import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { tokenRouter } from "@/api/tokens/tokenRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";
import { accountRouter } from "./api/account/accountRouter";
import { leaderboardRouter } from "./api/leaderboard/leaderboardRouter";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

app.use(express.json());

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/tokens", tokenRouter);
app.use("/account", accountRouter);
app.use("/leaderboard", leaderboardRouter);

// Swagger UIpnpm
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
