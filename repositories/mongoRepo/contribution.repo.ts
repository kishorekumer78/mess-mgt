import dbConnect from "@/db/dbConnect";
import validateMongoDbId from "@/helpers/validateMongoDbId";
import Contribution from "@/models/contribution.model";
import { Msg } from "@/utilities/enums";
import { ContributionType } from "@/utilities/types";

export const getAllContributions = async () => {
	try {
		await dbConnect();
		const contributions: ContributionType[] = await Contribution.find();
		if (contributions.length > 0) {
			return { success: true, message: Msg.DATA_FETCH_SUCCESS, data: contributions };
		} else {
			return { success: true, message: Msg.DATA_DB_EMPTY, data: [] };
		}
	} catch (error: any) {
		return { success: false, message: Msg.DATA_LOAD_FAIL, data: error.message };
	}
};

// export const getOffrById = async (id: string) => {
// 	try {
// 		await dbConnect();
// 		validateMongoDbId(id);
// 		const offr = await Offr.findById(id);
// 		if (offr) {
// 			return { success: true, message: "Officer data fetching successful", data: offr };
// 		} else {
// 			return { success: false, message: "Officer with given id does not exist" };
// 		}
// 	} catch (error) {
// 		return { success: false, message: "Failed to fetch Officer data", data: error.message };
// 	}
// };

// export const deleteOffrById = async (id: string) => {
// 	validateMongoDbId(id);
// 	try {
// 		await dbConnect();
// 		const deleteOffr = await Offr.findByIdAndDelete(id);
// 		return deleteOffr;
// 	} catch (error) {
// 		return null;
// 	}
// };

// export const updateOffr = async (id: string, offrData: any) => {
// 	try {
// 		validateMongoDbId(id);
// 		await dbConnect();
// 		// check if offr exists
// 		let foundOffr = await Offr.findById(id);

// 		if (foundOffr) {
// 			const updatedOffrData = await Offr.findByIdAndUpdate(id, offrData);
// 			if (updatedOffrData) {
// 				return { message: "Update successful", success: true, data: updatedOffrData };
// 			} else {
// 				return { message: "Update unsuccessful", success: false };
// 			}
// 		} else {
// 			return { message: "Data not found in DB", success: false };
// 		}
// 		//const updatedOffr = await Offr.findOneAndUpdate({ bd: offr.bd }, offr);
// 	} catch (error) {
// 		return { message: "Update operation failed", success: false, data: error.message };
// 	}
// };

export const AddContribution = async (contribution: ContributionType) => {
	try {
		await dbConnect();
		// check if already exists
		const extContribution = await Contribution.findOne({ type: contribution.type });

		if (extContribution) {
			return { success: false, message: Msg.DATA_EXIST };
		} else {
			// contribution does not exist in db . so add contribution
			const { type, amount } = contribution;
			const savedContribution = await Contribution.create({ type, amount });
			return {
				success: true,
				message: Msg.DATA_SUCCESS,
				data: savedContribution
			};
		}
	} catch (error: any) {
		return { success: false, message: Msg.DATA_ADD_FAIL, data: error.message };
	}
};
