import  userResolvers  from './userResolvers.js';

const resolvers = {
    Query: {
        ...userResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
    },
};

export default resolvers;