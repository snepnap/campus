import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import Resource from "@/models/Resource";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const { title, type, subject, department, semester, author, fileUrl, size } = body;

        if (!title || !type || !subject || !department || !semester) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const newResource = await Resource.create({
            title,
            type,
            subject,
            department,
            semester,
            author: author || "Unknown",
            fileUrl: fileUrl || "#",
            size: size || "Pending",
        });

        return NextResponse.json({ success: true, data: newResource }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating resource:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const department = searchParams.get('department');
        const semester = searchParams.get('semester');
        const type = searchParams.get('type');
        const search = searchParams.get('search');

        const query: any = {};
        if (department && department !== 'all') query.department = department;
        if (semester && semester !== 'all') query.semester = semester;
        if (type && type !== 'all') query.type = type;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } }
            ];
        }

        const resources = await Resource.find(query).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: resources }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching resources:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
