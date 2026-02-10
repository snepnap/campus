import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Student from '@/models/Student';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { name, enrollmentNo, password } = await request.json();

        if (!name || !enrollmentNo || !password) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
        }

        const existingUser = await Student.findOne({ enrollmentNo });
        if (existingUser) {
            return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Student.create({
            name,
            enrollmentNo,
            password: hashedPassword,
            email: `${enrollmentNo.replace(/\//g, '')}@ggu.in` // Simple email generation
        });

        return NextResponse.json({ success: true, data: newUser });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
