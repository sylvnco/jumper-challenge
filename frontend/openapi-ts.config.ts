import { defineConfig } from "@hey-api/openapi-ts";
import "dotenv/config";

export default defineConfig({
	input: `${process.env.API_ENDPOINT}/swagger.json`,
	output: "src/client",
	plugins: ["@hey-api/client-fetch"],
});
