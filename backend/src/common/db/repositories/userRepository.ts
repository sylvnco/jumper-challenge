import { PrismaClient, type User } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (address: string): Promise<User> => {
	return prisma.user.create({ data: { address } });
};

export const findUserByAddress = async (
	address: string,
): Promise<User | null> => {
	return prisma.user.findUnique({ where: { address } });
};

export const getAllUser = async () => {
	return prisma.user.findMany();
};
