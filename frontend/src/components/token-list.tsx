"use client";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAccount, useChainId } from "wagmi";
import { getTokens } from "@/queries/getTokens";
import type { Address } from "viem";
import TokenListItem from "@/components/token-list-item";
import { Suspense } from "react";
import toast from "react-hot-toast";

const TokenList = () => {
	const { address } = useAccount();
	const chainId = useChainId();
	const { data, isLoading, isSuccess, error } = useQuery({
		queryKey: ["tokens", address, chainId],
		queryFn: () => getTokens(address as Address, chainId),
		enabled: !!address,
	});
	const tokens = data;

	if (error) {
		toast.error(error.message);
	}

	const loadingStage = (
		<>
			<Typography
				textAlign={"center"}
				variant="h1"
				marginTop={10}
				marginBottom={5}
			>
				Please wait for the data to load.
			</Typography>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CircularProgress />
			</Box>
		</>
	);

	if (isLoading) {
		return loadingStage;
	}

	return (
		<>
			<Suspense fallback={loadingStage}>
				<Typography
					textAlign={"center"}
					variant="h1"
					marginTop={10}
					marginBottom={5}
				>
					Found {tokens?.length || 0} tokens for {address?.slice(0, 6)}
				</Typography>
				<Box sx={{ width: "75%", overflowX: "auto", marginX: "auto" }}>
					<Stack direction="column" spacing={2} sx={{ py: 2 }}>
						{isSuccess &&
							tokens?.map((t, index) => (
								<TokenListItem
									key={`${t.symbol}-${index}`}
									address={t.address}
									balance={t.balance}
									decimal={t.decimal}
									logo={t.logo}
									name={t.name}
									symbol={t.symbol}
								/>
							))}
					</Stack>
				</Box>
			</Suspense>
		</>
	);
};

export default TokenList;
