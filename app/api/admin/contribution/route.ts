import { NextRequest, NextResponse } from "next/server";
import { AddContribution, getAllContributions } from "@/repo/mongoRepo/contribution.repo";
import { ResponseType } from "@/utilities/types";
import { Msg } from "@/utilities/enums";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	try {
		const reqBody = await request.json();
		const res = await AddContribution(reqBody);
		if (res.success) {
			return NextResponse.json(res, { status: 201 });
		} else {
			return NextResponse.json(res);
		}
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message, success: false, message: Msg.SERVER },
			{ status: 500 }
		);
	}
};

export const GET = async (request: NextRequest) => {
	try {
		const result: ResponseType = await getAllContributions();

		if (result.success === true) {
			return NextResponse.json(result, { status: 200 });
		} else {
			return NextResponse.json(result, { status: 500 });
		}
	} catch (error) {
		return NextResponse.json({ message: error.message, success: false }, { status: 500 });
	}
};
