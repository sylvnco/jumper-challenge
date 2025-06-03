import { Box, Link, Stack } from "@mui/material";

const NavLink = () => {
	return (
		<Box
			component="nav"
			sx={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				marginTop: 2,
				py: 1,
			}}
		>
			<Stack
				direction="row"
				spacing={1}
				divider={
					<Box component="span" sx={{ mx: 0.5 }}>
						|
					</Box>
				}
			>
				<Link href="/" underline="hover">
					Home
				</Link>
				<Link href="/leaderboard" underline="hover">
					Leaderboard
				</Link>
			</Stack>
		</Box>
	);
};

export default NavLink;
