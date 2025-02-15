export const getData = () => {
    return {

        todo: [{
            id: '1',
            title: 'Task 1',
            description: 'Some random description',
            dueDate: new Date(),
            status: 'todo',
            user: {
                name: 'John',
                id: 1,
            }

        },
        {
            id: '2',
            title: 'Task 2',
            description: 'Some random description',
            dueDate: new Date()
        }],
        progress: [{
            id: '3',
            title: 'Task 3',
            description: 'Some random description',
            dueDate: new Date()

        },
        {
            id: '4',
            title: 'Task 4',
            description: 'Some random description',
            dueDate: new Date()
        }],
        waitlist: [{
            id: '5',
            title: 'Task 5',
            description: 'Some random description',
            dueDate: new Date()

        },
        {
            id: '6',
            title: 'Task 6',
            description: 'Some random description',
            dueDate: new Date()
        }],
        completed: [{
            id: '7',
            title: 'Task 7',
            description: 'Some random description',
            dueDate: new Date()

        },
        {
            id: '8',
            title: 'Task 8',
            description: 'Some random description',
            dueDate: new Date()
        }]

    }
}

export const getListData = () => {
    return [{
        id: '1',
        title: 'Task 1',
        description: 'Some random description',
        dueDate: new Date(),
        status: 'todo',
        user: {
            name: 'John',
            id: 1,
        }

    },
    {
        id: '2',
        title: 'Task 2',
        description: 'Some random description',
        dueDate: new Date()
    }, {
        id: '3',
        title: 'Task 3',
        description: 'Some random description',
        dueDate: new Date()

    },
    {
        id: '4',
        title: 'Task 4',
        description: 'Some random description',
        dueDate: new Date()
    }, {
        id: '5',
        title: 'Task 5',
        description: 'Some random description',
        dueDate: new Date()

    },
    {
        id: '6',
        title: 'Task 6',
        description: 'Some random description',
        dueDate: new Date()
    },
    {
        id: '7',
        title: 'Task 7',
        description: 'Some random description',
        dueDate: new Date()

    },
    {
        id: '8',
        title: 'Task 8',
        description: 'Some random description',
        dueDate: new Date()
    }]

}