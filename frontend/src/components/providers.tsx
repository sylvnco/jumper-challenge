"use client";
import { WagmiProvider } from "wagmi";
import { config } from "@/../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

const queryClient = new QueryClient();

const Providers = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<AppRouterCacheProvider>
						<ThemeProvider theme={theme}>{children}</ThemeProvider>
					</AppRouterCacheProvider>
				</QueryClientProvider>
			</WagmiProvider>
		</>
	);
};

export default Providers;
