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
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    email: {
        type: String,
        unique: true,
        sparse: true, // Allow multiple nulls/missing if not provided
    },
    course: String,
    semester: String,
    year: { // Current year (1, 2, 3, 4)
        type: Number,
        default: 1
    },
    // NEP Electives
    minor: String,
    mdc: String,
    sec: String,
    vac: String,
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
