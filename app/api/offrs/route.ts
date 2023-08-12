import { NextRequest, NextResponse } from "next/server";
import { AddOfficer, getAllOffrs } from "@/repositories/mongoRepo/offr.repository";

export const GET = async (request: NextRequest) => {
	try {
		const result = await getAllOffrs();

		if (result.success === true) {
			return NextResponse.json(result, { status: 200 });
		} else {
			return NextResponse.json(result, { status: 500 });
		}
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
