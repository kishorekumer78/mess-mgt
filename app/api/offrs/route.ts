import { NextRequest, NextResponse } from "next/server";
import { AddOfficer, getAllOffrs } from "@/repo/mongoRepo/offr.repository";
import { Msg } from "@/utilities/enums";
import { ResponseType } from "@/utilities/types";

export const GET = async (request: NextRequest) => {
	try {
		const result = await getAllOffrs();

		if (result.success === true) {
			return NextResponse.json(result, { status: 200 });
		} else {
			return NextResponse.json(result, { status: 500 });
		}
	} catch (error) {
		return NextResponse.json(
			{ message: Msg.DATA_FETCH_FAIL, data: error.message, success: false },
			{ status: 500 }
		);
	}
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	const reqBody = await request.json();

	const res: ResponseType = await AddOfficer(reqBody);

	if (res.success) {
		return NextResponse.json(res, { status: 201 });
	} else {
		return NextResponse.json(res);
	}
};
