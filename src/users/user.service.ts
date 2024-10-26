import { checkPassword, generateJWT, hashPassword, secret } from "../authentication/utils";
import { newCreatedUser, User } from "./user.interface";
import { UserRepository } from "./user.repository.interface";

export interface UserService {
    registerUser: (user: Omit<User, "_id">) => Promise<newCreatedUser>;
    getUserByEmail: (email: string) => Promise<User | null>;
    checkPassword: (plainText: string, hashPassword: string) => Promise<boolean>;
    generateAuthToken: (user: User) => Promise<string>
}

export const userServiceFactory: (userRepository: UserRepository) => UserService = (userRepository: UserRepository) => {
    return {
        registerUser: async (user: Omit<User, "_id">) => {
            try {
                const hashedPassword = await hashPassword(user.password);
                const newUser = await userRepository.create({ ...user, password: hashedPassword });
                const { email, firstName, lastName, _id } = newUser;
                return { email, firstName, lastName, _id }
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        getUserByEmail: (email: string) => {
            return userRepository.getByEmail(email);
        },
        checkPassword: (plainText: string, hashPassword: string) => {
            return checkPassword(plainText, hashPassword);
        },
        generateAuthToken: (user: User) => {
            const { email, firstName, lastName, _id } = user;
            const payload = { email, firstName, lastName, _id };
            const ttl = "4m";
            const options = {
                payload,
                secret: secret,
                expiresIn: ttl,
            }
            return generateJWT(options);
        },
    }
};