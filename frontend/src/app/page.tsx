"use client";
import { Box, Typography } from "@mui/material";
import AccountCreation from "@/components/account-creation";
import { useAccount } from "wagmi";

export default function Home() {
	const { isConnected } = useAccount();
	return (
		<Box display="flex" justifyContent="center">
			<Typography variant="h1">Welcome to Jumper challenge!</Typography>
			{isConnected && <AccountCreation />}
		</Box>
	);
}
