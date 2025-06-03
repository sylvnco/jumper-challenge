import {
	Modal,
	Box,
	Typography,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { useConnect, injected } from "wagmi";
import { walletConnect } from "wagmi/connectors";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

type ConnectionModalType = {
	setOpen: Dispatch<SetStateAction<boolean>>;
	open: boolean;
};

const ConnectionModal = ({ setOpen, open }: ConnectionModalType) => {
	const handleClose = () => setOpen(false);
	const { connect, connectors } = useConnect();

	const walletConnectConnector = connectors.find(
		(connector) => connector.id === "walletConnect",
	);
	const connectWalletConnect = () => {
		if (walletConnectConnector) {
			connect({ connector: walletConnectConnector });
			setOpen(false);
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography variant="h6" component="h2">
					Connect wallet
				</Typography>
				<Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
					<nav aria-label="main mailbox folders">
						<List>
							<ListItem disablePadding>
								<ListItemButton
									onClick={() => {
										connect({ connector: injected() });
										setOpen(false);
									}}
								>
									<ListItemText primary="Browser Wallet" />
								</ListItemButton>
							</ListItem>
							{walletConnectConnector && (
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemText
											onClick={connectWalletConnect}
											primary="Wallet Connect"
										/>
									</ListItemButton>
								</ListItem>
							)}
						</List>
					</nav>
				</Box>
			</Box>
		</Modal>
	);
};

export default ConnectionModal;
