import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Student from '@/models/Student';

export async function GET() {
    try {
        await dbConnect();

        // Check if we can count students or do a simple query
        const studentCount = await Student.countDocuments();

        return NextResponse.json({
            success: true,
            message: 'MongoDB Connected successfully!',
            count: studentCount
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: 'MongoDB Connection Failed',
            error: error.message
        }, { status: 500 });
    }
}
