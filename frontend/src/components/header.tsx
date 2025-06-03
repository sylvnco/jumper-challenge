"use client";
import { AppBar, Button, FormControl, InputLabel, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { useAccount, useSwitchChain, useBalance, useDisconnect, useChains } from "wagmi";
import type { chainIds } from "@/../config";
import ConnectionModal from "@/components/modals/connection-modal";
import { useState } from "react";
import { formatUnits } from "viem";

const Header = () => {
	const { isConnected, chain, address } = useAccount();
	const [open, setOpen] = useState<boolean>(false);
	const { data: balance, isLoading: isBalanceLoading } = useBalance({
		address,
	});
	const { disconnect } = useDisconnect();
	const chains = useChains();
	const { switchChain } = useSwitchChain();
	return (
		<AppBar position="static" color="transparent">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
					Jumper Challenge
				</Typography>
				{isConnected ? (
					<>
						<FormControl sx={{ marginRight: "1rem", width: "100px" }}>
							<InputLabel>Network</InputLabel>
							<Select
								value={chain?.id}
								label="Network"
								onChange={(e) => switchChain({ chainId: e.target.value as chainIds })}>
								{chains.map((c) => (
									<MenuItem key={c.id} value={c.id}>
										{c.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Typography
							variant="body2"
							sx={{
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
								marginRight: "1rem",
							}}>
							{`${address?.slice(0, 6)}...${address?.slice(-4)}`}
						</Typography>
						<Typography variant="body2" sx={{ marginRight: "1rem" }}>
							{!isBalanceLoading &&
								balance &&
								`${formatUnits(balance.value, balance.decimals).split(".")[0]} ${balance.symbol}`}
						</Typography>
						<Button variant="contained" onClick={() => disconnect()}>
							Disconnect
						</Button>
					</>
				) : (
					<Button variant="contained" onClick={() => setOpen(true)}>
						Connect Wallet
					</Button>
				)}
			</Toolbar>
			<ConnectionModal setOpen={setOpen} open={open} />
		</AppBar>
	);
};

export default Header;
