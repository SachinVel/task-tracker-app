const typeDefs = `
    type Task {
        id: ID!
        title: String!
        description: String!
        status: String!
        userId: ID!
        dueDate: String!
    }

    type TaskResponse {
        success: Boolean!
        message: String!
    }   

    type Query {
        getAllTasks: [Task]
    }
    

    type Mutation {
        createTask(title: String!, description: String, status: String!, dueDate: String): Task
        updateTask(id: ID!, title: String, description: String, status: String, dueDate: String): TaskResponse
        updateTaskStatus(id: ID!, status: String!): TaskResponse
        deleteTask(id: ID!): TaskResponse
    }
`;

export default typeDefs;
