import dbConnect from "@/db/dbConnect";
import validateMongoDbId from "@/helpers/validateMongoDbId";
import Offr from "@/models/offr.model";
import { Msg } from "@/utilities/enums";

export const getAllOffrs = async () => {
	try {
		await dbConnect();
		const offrs = await Offr.find().sort({ bd: 1 });
		if (offrs.length > 0) {
			return { success: true, message: "Fetch data Successful", data: offrs };
		} else {
			return { success: true, message: "No data in the db", data: [] };
		}
	} catch (error: any) {
		return { success: false, message: "Failed to load data", data: error.message };
	}
};

export const getOffrById = async (id: string) => {
	try {
		await dbConnect();
		validateMongoDbId(id);
		const offr = await Offr.findById(id);
		if (offr) {
			return { success: true, message: "Officer data fetching successful", data: offr };
		} else {
			return { success: false, message: "Officer with given id does not exist" };
		}
	} catch (error) {
		return { success: false, message: "Failed to fetch Officer data", data: error.message };
	}
};

export const deleteOffrById = async (id: string) => {
	try {
		validateMongoDbId(id);
		await dbConnect();
		const deleteOffr = await Offr.findByIdAndDelete(id);
		if (deleteOffr) {
			return { success: false, message: Msg.DATA_DELETE_SUCCESS, data: deleteOffr };
		} else {
			return { success: false, message: Msg.DATA_DELETE_FAIL };
		}
	} catch (error) {
		return { success: false, message: Msg.SERVER_ERROR, data: error.message };
	}
};

export const updateOffr = async (id: string, offrData: any) => {
	try {
		validateMongoDbId(id);
		await dbConnect();
		// check if offr exists
		let foundOffr = await Offr.findById(id);

		if (foundOffr) {
			const updatedOffrData = await Offr.findByIdAndUpdate(id, offrData, { new: true });
			if (updatedOffrData) {
				return { message: Msg.DATA_UPDATE_SUCCESS, success: true, data: updatedOffrData };
			} else {
				return { message: Msg.DATA_UPDATE_FAIL, success: false };
			}
		} else {
			return { message: Msg.DATA_NOT_FOUND, success: false };
		}
		//const updatedOffr = await Offr.findOneAndUpdate({ bd: offr.bd }, offr);
	} catch (error) {
		return { message: Msg.SERVER_ERROR, success: false, data: error.message };
	}
};

export const AddOfficer = async (offr: any) => {
	try {
		await dbConnect();
		// check if officer exists with bd no
		const extOffr = await Offr.findOne({ bd: offr.bd });

		if (extOffr) {
			return { success: false, message: Msg.DATA_EXIST, data: {} };
		} else {
			// offr does not exist in db . so add offr
			const savedOffr = await Offr.create(offr);

			return { success: true, message: Msg.DATA_ADD_SUCCESS, data: savedOffr };
		}
	} catch (error: any) {
		return { success: false, message: Msg.SERVER_ERROR, data: error.message };
	}
};
