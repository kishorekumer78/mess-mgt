import dbConnect from "@/db/dbConnect";
import validateMongoDbId from "@/helpers/validateMongoDbId";
import Contribution from "@/models/contribution.model";
import { Msg } from "@/utilities/enums";
import { ContributionType, ResponseType } from "@/utilities/types";

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
		return { success: false, message: Msg.DATA_FETCH_FAIL, data: error.message };
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

export const deleteOffrById = async (id: string) => {
	try {
		validateMongoDbId(id);
		await dbConnect();
		const deleteCon = await Contribution.findByIdAndDelete(id);
		return { success: true, message: Msg.DATA_DELETE_SUCCESS, data: deleteCon };
	} catch (error) {
		return { success: false, message: Msg.DATA_DELETE_FAIL, data: error.message };
	}
};

export const updateContribution = async (id: string, contributionData: ContributionType): Promise<ResponseType> => {
	try {
		validateMongoDbId(id);
		await dbConnect();
		// check if contribution exists
		let foundCon = await Contribution.findById(id);

		if (foundCon) {
			delete contributionData._id;

			const updatedConData = await Contribution.findByIdAndUpdate(id, contributionData, { new: true });

			if (updatedConData) {
				return { message: Msg.DATA_UPDATE_SUCCESS, success: true, data: updatedConData };
			} else {
				return { message: Msg.DATA_UPDATE_FAIL, success: false };
			}
		} else {
			return { message: Msg.DATA_NOT_FOUND, success: false };
		}
	} catch (error) {
		return { message: "Update operation failed", success: false, data: error.message };
	}
};

export const AddContribution = async (contribution: ContributionType) => {
	try {
		await dbConnect();
		// check if already exists
		const extContribution = await Contribution.findOne({ type: contribution.type });

		if (extContribution) {
			return { success: false, message: Msg.DATA_EXIST };
		} else {
			// contribution does not exist in db . so add contribution
			delete contribution._id; //removing _id field
			const savedContribution = await Contribution.create(contribution);
			return {
				success: true,
				message: Msg.DATA_ADD_SUCCESS,
				data: savedContribution
			};
		}
	} catch (error: any) {
		return { success: false, message: Msg.DATA_ADD_FAIL, data: error.message };
	}
};
