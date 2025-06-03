import { createOrLogin } from "@/queries/createOrLogin";
import { Box, Button, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useSignMessage, useAccount } from "wagmi";
import LeaderboardList from "./leaderboard-list";
import { useEffect, useState } from "react";
import { isJwtValid } from "@/utils/auth";

const AccountCreation = () => {
	const { signMessageAsync } = useSignMessage();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const { address } = useAccount();

	useEffect(() => {
		const token = localStorage.getItem("jwt");
		if (token && isJwtValid(token)) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	return (
		<>
			{!isAuthenticated ? (
				<>
					<Typography textAlign={"center"} variant="h1" marginTop={10}>
						Please create an account or login to access leaderboard
					</Typography>

					<Box textAlign={"center"} marginTop={2}>
						<Button
							variant="contained"
							onClick={async () => {
								const hash = await signMessageAsync(
									{
										message: "Account Creation",
									},
									{
										onSuccess: async (res) => {
											if (address) {
												const response = await createOrLogin(address, res);
												if (response?.jwt) {
													localStorage.setItem("jwt", response.jwt);
													toast.success("Logged in successfully!");
													setIsAuthenticated(true);
												} else {
													toast.error("Login failed: no token returned");
												}
											} else {
												toast.error(
													"Evm address not found. Please reload the application",
												);
											}
										},
										onError: (error) => {
											toast.error(error.message);
										},
									},
								);
							}}
						>
							Create Account / login
						</Button>
					</Box>
				</>
			) : (
				<LeaderboardList />
			)}
		</>
	);
};

export default AccountCreation;
