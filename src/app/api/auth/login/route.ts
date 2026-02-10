import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Student from '@/models/Student';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { enrollmentNo, password } = await request.json();

        if (!enrollmentNo || !password) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
        }

        const user = await Student.findOne({ enrollmentNo });
        if (!user || user.password !== password) {
            return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
        }

        return NextResponse.json({ success: true, data: user });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
