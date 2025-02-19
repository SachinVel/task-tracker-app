const userTypeDefs = `
    type User {
        username: String!
        password: String!
    }

    type Query {
        getUser(username: String!): User
        users: [User]
        userByUsername(username: String!): User
    }

    type Mutation {
        createUser(username: String!, password: String!): User
    }
`;

export default userTypeDefs;