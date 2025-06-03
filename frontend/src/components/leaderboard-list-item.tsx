import { Box, Paper, Typography } from "@mui/material";

type LeaderboardItem = {
	id: number;
	address: string;
	createdAt: string;
};

const LeaderboardListItem = ({ id, address, createdAt }: LeaderboardItem) => {
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
			<Box>
				<Typography
					variant="body2"
					sx={{
						fontWeight: 600,
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{id}
				</Typography>
			</Box>
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
					{address}
				</Typography>
			</Box>
			<Box sx={{ marginLeft: "auto" }}>
				<Typography variant="body2" sx={{ fontWeight: 500 }}>
					{new Date(createdAt).toLocaleString("fr-FR")}
				</Typography>
			</Box>
		</Paper>
	);
};

export default LeaderboardListItem;
