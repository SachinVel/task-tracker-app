import Task from '../models/task.js';

const taskResolvers = {
    Query: {
        getAllTasks: async (_, __, { user }) => {
            if (!user) throw new Error('Authentication required');
            return await Task.find({ userId: user.id });
        },
    },
    Mutation: {
        createTask: async (_: any, { title, description, status, dueDate }: { title: string, description: string, status: string, dueDate: Date }, { user }: { user: any }) => {
            if (!user) throw new Error('Authentication required');
            try {
                const task = new Task({ title, description, status, dueDate, userId: user.id });

                await task.save();
                return {id: task._id, title: task.title, description: task.description, status: task.status, dueDate: task.dueDate, userId: task.userId };
            } catch (error) {
                throw error;
            }
        },
        updateTask: async (_, { id, title, description, status }, { user }) => {
            if (!user) throw new Error('Authentication required');
            try {
                const task = await Task.findById(id);
                if (!task) throw new Error('Task not found');
                if (task.userId.toString() !== user.id) throw new Error('Not authorized');

                if (title !== undefined) task.title = title;
                if (description !== undefined) task.description = description;
                if (status !== undefined) task.status = status;

                await task.save();
                return { success: true, message: 'Task updated successfully' };
            } catch (error) {
                return { success:false, message: error.message };
            }
        },
        updateTaskStatus: async (_, { id, status }, { user }) => {
            if (!user) throw new Error('Authentication required');
            try {
                const task = await Task.findById(id);
                if (!task) throw new Error('Task not found');
                if (task.userId.toString() !== user.id) throw new Error('Not authorized');

                task.status = status;
                await task.save();
                return { success: true, message: 'Task status updated successfully' };
            } catch (error) {
                console.error('Error updating task status:', error);
                return { success: false, message: error.message };
            }
        },
        deleteTask: async (_, { id }, { user }) => {
            if (!user) throw new Error('Authentication required');
            try {
                const task = await Task.findById(id);
                if (!task) throw new Error('Task not found');
                if (task.userId.toString() !== user.id) throw new Error('Not authorized');

                await Task.deleteOne({ _id: id });
                return { success: true, message: 'Task deleted successfully' };
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
    },
};

export default taskResolvers;