import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { register } from 'module';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';


const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        userByUsername: async (_: any, { username }: { username: string }) => {
            return await User.findOne({ username });
        },
        auth: (_: any, __: any, { user }) => {
            if (!user) throw new Error("Authentication required!");
            return `Hello ${user.username}, you are authenticated!`;
        }
    },
    Mutation: {
        createUser: async (_: any, { username, password }: { username: string, password: string }) => {
            const newUser = new User({ username, password });
            return await newUser.save();
        },
        register: async (_: any, { username, password }: { username: string, password: string }) => {

            try {
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("User already exists");
                }
                const newUser = new User({ username, password });
                await newUser.save();
                return { success: true, message: "User registered successfully" };
            } catch (error) {
                console.error("Error during registration:", error);
                return { success: false, message: error.message || "An error occurred during registration" };
            }

        },
        login: async (_: any, { username, password }) => {
            console.log("Login attempt with username:", username, "and password:", password);
            const user = await User.findOne({ username, password });
            if (!user) throw new Error("Invalid credentials");

            const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

            return { id: user.id, username: user.username, token };
        }
        // updateUser: async (_: any, { id, username, password }: { id: string, username: string, password: string }) => {
        //     return await User.findByIdAndUpdate(id, { username, password }, { new: true });
        // },
    },
};

export default resolvers;