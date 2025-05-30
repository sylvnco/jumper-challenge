"use client";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAccount, useSwitchChain, useBalance, useDisconnect, useChains } from "wagmi";
import type { chainIds } from "@/../config";
import ConnectionModal from "@/components/modals/connection-modal";
import { useState } from "react";
import { formatUnits } from "viem";

const Header = () => {
	const { isConnected, chain, address } = useAccount();
	const [open, setOpen] = useState<boolean>(false);
	const { data: balance, isLoading: isBalanceLoading } = useBalance({ address });
	const { disconnect } = useDisconnect();
	const chains = useChains();
	const { switchChain } = useSwitchChain();
	return (
		<div>
			{isConnected ? (
				<div>
					<FormControl>
						<InputLabel>Network</InputLabel>
						<Select
							value={chain!.id}
							label="Network"
							onChange={(e) => switchChain({ chainId: e.target.value as chainIds })}>
							{chains.map((c) => (
								<MenuItem key={c.id} value={c.id}>
									{c.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<div>Address : {address && address.slice(0.6)}</div>
					<div>
						Balance : {!isBalanceLoading && balance && formatUnits(balance.value, balance.decimals).split(".")[0]}
					</div>
					<Button variant="contained" onClick={() => disconnect()}>
						Disconnect
					</Button>
				</div>
			) : (
				<Button variant="contained" onClick={() => setOpen(true)}>
					Connect Wallet
				</Button>
			)}

			<ConnectionModal setOpen={setOpen} open={open} />
		</div>
	);
};

export default Header;
