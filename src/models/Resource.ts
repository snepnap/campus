import mongoose, { Document, Model } from "mongoose";

export interface IResource extends Document {
    title: string;
    type: "Notes" | "PYQ" | "Lab";
    subject: string;
    department: string;
    semester: string;
    author: string;
    uploadedBy: mongoose.Types.ObjectId;
    fileUrl: string; // Placeholder for file URL
    size?: string;
    createdAt: Date;
}

const ResourceSchema = new mongoose.Schema<IResource>(
    {
        title: { type: String, required: true },
        type: { type: String, enum: ["Notes", "PYQ", "Lab"], required: true },
        subject: { type: String, required: true },
        department: { type: String, required: true },
        semester: { type: String, required: true },
        author: { type: String, default: "Anonymous" },
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        fileUrl: { type: String, default: "#" }, // Default mock URL
        size: { type: String, default: "Unknown" },
    },
    { timestamps: true }
);

const Resource: Model<IResource> =
    mongoose.models.Resource || mongoose.model<IResource>("Resource", ResourceSchema);

export default Resource;
