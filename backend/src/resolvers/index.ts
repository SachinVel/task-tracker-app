import  userResolvers  from './userResolvers.js';
import  taskResolvers  from './taskResolvers.js';

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...taskResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...taskResolvers.Mutation,
    },
};

export default resolvers;