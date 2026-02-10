import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    code: String,
    title: String,
    credits: Number,
    type: String,
});

const SyllabusSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // slug
    department: String,
    school: String,
    semester: String,
    courses: [CourseSchema],
    programUrl: String,
}, {
    timestamps: true,
});

export default mongoose.models.Syllabus || mongoose.model('Syllabus', SyllabusSchema);
