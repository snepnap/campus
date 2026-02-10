import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Student from '@/models/Student';

export async function GET() {
    try {
        await dbConnect();

        // In a real app, we would get the user ID from the session
        // For now, we'll try to find a student with a specific enrollment number
        const student = await Student.findOne({ enrollmentNo: "GGV/22/0315" });

        if (!student) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: student, source: "database" });

    } catch (error: any) {
        console.error("Database connection failed:", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// Update Student Profile
export async function PUT(request: Request) {
    try {
        await dbConnect();

        const body = await request.json();

        // TODO: Get enrollment number from session
        const enrollmentNo = "GGV/22/0315";

        const student = await Student.findOneAndUpdate(
            { enrollmentNo },
            {
                $set: {
                    ...body, // Spread other fields like name, bio, etc.
                    course: body.department, // Store department as course
                    // Explicitly map special fields if needed, but direct map is fine
                }
            },
            { new: true, upsert: true } // Upsert: create if doesn't exist? Ideally authenticate first.
        );

        if (!student) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: student });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
