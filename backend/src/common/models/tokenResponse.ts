import { z } from "zod";
import type { Address } from "viem";

export const TokenSchema = z.object({
	address: z.string() as unknown as z.ZodType<Address>,
	balance: z.string(),
	decimal: z.number(),
	name: z.string(),
	symbol: z.string(),
	logo: z.string().url().optional(),
});

export type TokenResponse = z.infer<typeof TokenSchema>;
