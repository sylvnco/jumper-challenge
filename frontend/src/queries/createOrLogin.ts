import { postAccount } from "@/client";

export const createOrLogin = async (address: string, signature: string) => {
	const response = await postAccount({
		body: {
			address,
			signature,
		},
	});
	if (response.error) {
		const errorMessage = (response.error as { message: string }).message;
		throw new Error(errorMessage);
	}
	return response.data?.responseObject;
};
