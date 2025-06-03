import { getLeaderboard as clientGetLeaderboard } from "@/client";

export const getLeaderboard = async () => {
	const token = localStorage.getItem("jwt");
	const response = await clientGetLeaderboard({
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (response.error) {
		const errorMessage = (response.error as { message: string }).message;
		throw new Error(errorMessage);
	}
	return response.data?.responseObject;
};
