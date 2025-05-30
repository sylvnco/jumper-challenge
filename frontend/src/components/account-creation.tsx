import { Button } from "@mui/material";
import { useSignMessage } from "wagmi";
const AccountCreation = () => {
	const { signMessageAsync } = useSignMessage();
	return (
		<div>
			<p>Account</p>
			<Button
				onClick={async () => {
					const hash = await signMessageAsync(
						{
							message: "Account Creation",
						},
						{
							onSuccess: (res) => {
								console.log("call to db");
								console.log("res", res);
							},
						},
					);
				}}>
				Create Account
			</Button>
		</div>
	);
};

export default AccountCreation;
