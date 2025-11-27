import mongoose, { Schema } from "mongoose";
import { AvailableTaskStatuses, TaskStatusEnum } from "../utils/constants";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        typr: String,
        enum: AvailableTaskStatuses,
        default: TaskStatusEnum.TODO
    },
    attachment: {
        type: [
            {
            url: String,
            mimeType: String,
            size: Number
            }
        ],
        default: []
    }
},
    { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);