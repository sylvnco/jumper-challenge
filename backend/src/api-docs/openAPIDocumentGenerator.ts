import {
	OpenAPIRegistry,
	OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";

import { healthCheckRegistry } from "@/api/healthCheck/healthCheckRouter";
import { tokensRegistry } from "@/api/tokens/tokenRouter";
import { accountRegistry } from "@/api/account/accountRouter";
import { leaderboardRegistry } from "@/api/leaderboard/leaderboardRouter";

export function generateOpenAPIDocument() {
	const registry = new OpenAPIRegistry([
		healthCheckRegistry,
		tokensRegistry,
		accountRegistry,
		leaderboardRegistry,
	]);
	const generator = new OpenApiGeneratorV3(registry.definitions);

	return generator.generateDocument({
		openapi: "3.0.0",
		info: {
			version: "1.0.0",
			title: "Swagger API",
		},
		externalDocs: {
			description: "View the raw OpenAPI Specification in JSON format",
			url: "/swagger.json",
		},
	});
}
