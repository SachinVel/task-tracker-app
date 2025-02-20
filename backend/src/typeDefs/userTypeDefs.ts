const userTypeDefs = `
    type User {
        username: String!
        password: String!
        token: String
    }

    type RegisterResponse {
        success: Boolean!
        message: String!
    }

    type Query {
        getUser(username: String!): User
        users: [User]
        userByUsername(username: String!): User
        auth: String!  
    }

    type Mutation {
        createUser(username: String!, password: String!): User
        login(username: String!, password: String!): User
        register(username: String!, password: String!): RegisterResponse
    }

    
`;

export default userTypeDefs;