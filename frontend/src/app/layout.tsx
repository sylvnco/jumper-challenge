import Header from "@/components/header";
import NavLink from "@/components/nav-link";
import Providers from "@/components/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Jumper Challenge",
	description: "Jumper Challenge",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<Header />
					<NavLink />
					{children}
				</Providers>
				<Toaster position="top-right" reverseOrder={false} />
			</body>
		</html>
	);
}
