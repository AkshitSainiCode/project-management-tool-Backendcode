import mongoose, { Document } from 'mongoose';
export interface IProject extends Document {
    title: string;
    description: string;
    status: 'active' | 'completed';
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<{
    description: string;
    userId: mongoose.Types.ObjectId;
    title: string;
    status: "active" | "completed";
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    description: string;
    userId: mongoose.Types.ObjectId;
    title: string;
    status: "active" | "completed";
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    description: string;
    userId: mongoose.Types.ObjectId;
    title: string;
    status: "active" | "completed";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    description: string;
    userId: mongoose.Types.ObjectId;
    title: string;
    status: "active" | "completed";
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    description: string;
    userId: mongoose.Types.ObjectId;
    title: string;
    status: "active" | "completed";
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    description: string;
    userId: mongoose.Types.ObjectId;
    title: string;
    status: "active" | "completed";
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Project.d.ts.map