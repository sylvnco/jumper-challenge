import { Avatar, Box, Paper, Typography } from "@mui/material";

type TokenListItem = {
	address: string;
	balance: string;
	decimal: number;
	name: string;
	symbol: string;
	logo?: string;
};

const TokenListItem = ({
	symbol,
	logo,
	name,
	decimal,
	balance,
}: TokenListItem) => {
	return (
		<Paper
			elevation={1}
			sx={{
				px: 2,
				py: 1,
				display: "flex",
				alignItems: "center",
				gap: 1,
				minWidth: { xs: 220, sm: 240, md: 260 },
				flexShrink: 0,
			}}
		>
			<Avatar src={logo} alt={symbol} sx={{ width: 32, height: 32 }} />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
				}}
			>
				<Typography
					variant="body2"
					sx={{
						fontWeight: 600,
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{name}
				</Typography>
				<Typography variant="caption" color="text.secondary">
					{symbol}
				</Typography>
				<Box>
					<Typography variant="body2" sx={{ fontWeight: 500 }}>
						{decimal} decimals
					</Typography>
				</Box>
			</Box>
			<Box sx={{ marginLeft: "auto" }}>
				<Typography variant="body2" sx={{ fontWeight: 500 }}>
					{balance}
				</Typography>
			</Box>
		</Paper>
	);
};

export default TokenListItem;
