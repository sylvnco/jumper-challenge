import type { Address } from "viem";
import {
	createUser,
	findUserByAddress,
} from "../db/repositories/userRepository";

export const createUserIfNotExist = async (address: Address) => {
	const user = await findUserByAddress(address);
	if (user) {
		return user;
	}
	try {
		const result = await createUser(address);
		return result;
	} catch (error) {
		console.error("Something went wrong during account creation", error);
	}
};
