import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';

export async function GET() {
    try {
        await dbConnect();

        // Fetch posts from database
        const posts = await Post.find({}).sort({ createdAt: -1 }).limit(20);

        return NextResponse.json({ success: true, data: posts, source: "database" });
    } catch (error: any) {
        console.error("Database connection failed:", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const post = await Post.create(body);
        return NextResponse.json({ success: true, data: post }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
