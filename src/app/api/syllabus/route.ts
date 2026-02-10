import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Syllabus from '@/models/Syllabus';

export async function GET(request: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const mode = searchParams.get('mode');

        if (mode === 'departments') {
            // Get unique departments
            const departments = await Syllabus.distinct('department');
            return NextResponse.json({ success: true, data: departments });
        }

        const department = searchParams.get('department');
        const semester = searchParams.get('semester');

        let query: any = {};
        if (department) query.department = department;
        if (semester) query.semester = semester;

        const syllabus = await Syllabus.find(query);
        return NextResponse.json({ success: true, data: syllabus });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
