import User from '../models/user.js';

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        userByUsername: async (_: any, { username }: { username: string }) => {
            return await User.findOne({ username });
        },
    },
    Mutation: {
        createUser: async (_: any, { username, password }: { username: string, password: string }) => {
            const newUser = new User({ username, password });
            return await newUser.save();
        },
        // updateUser: async (_: any, { id, username, password }: { id: string, username: string, password: string }) => {
        //     return await User.findByIdAndUpdate(id, { username, password }, { new: true });
        // },
    },
};

export default resolvers;