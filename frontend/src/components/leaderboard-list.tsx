import { getLeaderboard } from "@/queries/getLeaderBoard";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LeaderboardListItem from "@/components/leaderboard-list-item";

const LeaderboardList = () => {
	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: ["leaderboard"],
		queryFn: () => getLeaderboard(),
	});

	if (isLoading) {
		return (
			<>
				<Typography
					textAlign={"center"}
					variant="h1"
					marginTop={10}
					marginBottom={5}
				>
					Please wait for the leaderboard to load.
				</Typography>
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</Box>
			</>
		);
	}

	if (error) {
		toast.error(error.message);
	}

	return (
		<>
			<Typography
				textAlign={"center"}
				variant="h1"
				marginTop={10}
				marginBottom={5}
			>
				Found {data?.users.length || 0} entries in the leaderboard
			</Typography>
			<Box sx={{ width: "75%", overflowX: "auto", marginX: "auto" }}>
				<Stack direction="column" spacing={2} sx={{ py: 2 }}>
					{isSuccess &&
						data?.users?.map((u, index) => (
							<LeaderboardListItem
								key={u.id}
								id={u.id}
								address={u.address}
								createdAt={u.createdAt}
							/>
						))}
				</Stack>
			</Box>
		</>
	);
};

export default LeaderboardList;
