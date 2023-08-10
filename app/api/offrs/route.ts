import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/dbConfig";
import { AddOfficer } from "@/repositories/mongoRepo/offr.repository";

connect();
export const GET = async () => {
	try {
	} catch (error) {
		return NextResponse.json({ message: error.message, success: false }, { status: 500 });
	}
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	try {
		const reqBody = await request.json();
		const res = await AddOfficer(reqBody);
		if (res.success) {
			return NextResponse.json(res, { status: 201 });
		} else {
			return NextResponse.json(res);
		}
	} catch (error: any) {
		return NextResponse.json({ error: error.message, success: false }, { status: 500 });
	}
};
