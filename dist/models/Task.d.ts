import mongoose, { Document } from 'mongoose';
export interface ITask extends Document {
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    dueDate: Date;
    projectId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<{
    description: string;
    title: string;
    status: "todo" | "in-progress" | "done";
    dueDate: NativeDate;
    projectId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    description: string;
    title: string;
    status: "todo" | "in-progress" | "done";
    dueDate: NativeDate;
    projectId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    description: string;
    title: string;
    status: "todo" | "in-progress" | "done";
    dueDate: NativeDate;
    projectId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    description: string;
    title: string;
    status: "todo" | "in-progress" | "done";
    dueDate: NativeDate;
    projectId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    description: string;
    title: string;
    status: "todo" | "in-progress" | "done";
    dueDate: NativeDate;
    projectId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    description: string;
    title: string;
    status: "todo" | "in-progress" | "done";
    dueDate: NativeDate;
    projectId: mongoose.Types.ObjectId;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Task.d.ts.map