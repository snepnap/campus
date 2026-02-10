import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Student from '@/models/Student';

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.enrollmentNo) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const student = await Student.findOne({ enrollmentNo: session.user.enrollmentNo });

        if (!student) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: student });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.enrollmentNo) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await request.json();

        const student = await Student.findOneAndUpdate(
            { enrollmentNo: session.user.enrollmentNo },
            {
                $set: {
                    ...body,
                    course: body.department,
                }
            },
            { new: true }
        );

        if (!student) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: student });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
