import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    author: {
        name: {
            type: String,
            required: [true, 'Please provide an author name'],
        },
        avatar: String,
        role: String,
    },
    content: {
        type: String,
        required: [true, 'Please provide content'],
    },
    image: String,
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
    shares: {
        type: Number,
        default: 0,
    },
    category: String,
    trending: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
