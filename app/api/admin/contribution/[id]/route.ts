import { updateContribution } from "@/repo/mongoRepo/contribution.repo";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (request: NextRequest, context: { params: { id: string } }) => {
// 	const { id } = context.params;

// 	try {
// 		const result = await getOffrById(id);
// 		if (result.success === true) {
// 			return NextResponse.json(result, { status: 200 });
// 		} else {
// 			return NextResponse.json(result, { status: 404 });
// 		}
// 	} catch (error) {
// 		return NextResponse.json({ message: error.message, success: false }, { status: 500 });
// 	}
// };

export const PUT = async (request: NextRequest, context: { params: { id: string } }) => {
	try {
		// grab the id from params
		const { id } = context.params;

		// grab the req body
		const reqBody = await request.json();

		// update repository
		const result = await updateContribution(id, reqBody);
		if (result.success) {
			return NextResponse.json(result, { status: 200 });
		} else {
			return NextResponse.json(result, { status: 400 });
		}
	} catch (error) {
		return NextResponse.json({ message: error.message, success: false }, { status: 500 });
	}
};