import { jwtDecode } from "jwt-decode";

type JwtPayload = {
	exp: number;
	sub: string;
};

export function isJwtValid(token: string): boolean {
	try {
		const decoded = jwtDecode<JwtPayload>(token);
		return decoded.exp * 1000 > Date.now();
	} catch (err) {
		return false;
	}
}
