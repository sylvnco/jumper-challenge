"use client";
import { Typography } from "@mui/material";
import { useAccount } from "wagmi";
import TokenList from "@/components/token-list";

export default function Home() {
	const { isConnected } = useAccount();
	return (
		<>
			{!isConnected && (
				<Typography textAlign={"center"} variant="h1" marginTop={10}>
					Please connect wallet to load tokens
				</Typography>
			)}
			{isConnected && <TokenList />}
		</>
	);
}
