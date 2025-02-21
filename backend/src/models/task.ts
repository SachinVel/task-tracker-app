import { Schema, model } from 'mongoose';

interface ITask {
    title: string;
    description: string;
    status: string;
    userId: string;
    dueDate: String;
}

const taskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    userId: { type: String, required: true },
    dueDate: { type: String, required: true }
});

const Task = model<ITask>('Task', taskSchema);

export default Task;