import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    enrollmentNo: {
        type: String,
        required: [true, 'Please provide an enrollment number'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    course: String,
    semester: String,
    cgpa: {
        type: Number,
        default: 0.0,
    },
    attendance: {
        type: Number,
        default: 0,
    },
    points: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 1,
    },
    avatar: String,
    badges: [String],
}, {
    timestamps: true,
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
