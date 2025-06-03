"use client";
import AccountCreation from "@/components/account-creation";
import { Typography } from "@mui/material";
import { useAccount } from "wagmi";

const Leaderboard = () => {
	const { isConnected } = useAccount();
	return (
		<>
			{!isConnected && (
				<Typography textAlign={"center"} variant="h1" marginTop={10}>
					Please connect wallet to access leaderboard
				</Typography>
			)}
			{isConnected && <AccountCreation />}
		</>
	);
};

export default Leaderboard;
