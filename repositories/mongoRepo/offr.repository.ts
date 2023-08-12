import { connect } from "@/db/dbConfig";
import dbConnect from "@/db/dbConnect";
import validateMongoDbId from "@/helpers/validateMongoDbId";
import Offr from "@/models/offr.model";

// connect();
dbConnect();
export const getAllOffrs = async () => {
	try {
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
	validateMongoDbId(id);
	try {
		const deleteOffr = await Offr.findByIdAndDelete(id);
		return deleteOffr;
	} catch (error) {
		return null;
	}
};

export const updateOffr = async (id: string, offrData: any) => {
	try {
		validateMongoDbId(id);
		// check if offr exists
		let foundOffr = await Offr.findById(id);

		if (foundOffr) {
			const updatedOffrData = await Offr.findByIdAndUpdate(id, offrData);
			if (updatedOffrData) {
				return { message: "Update successful", success: true, data: updatedOffrData };
			} else {
				return { message: "Update unsuccessful", success: false };
			}
		} else {
			return { message: "Data not found in DB", success: false };
		}
		//const updatedOffr = await Offr.findOneAndUpdate({ bd: offr.bd }, offr);
	} catch (error) {
		return { message: "Update operation failed", success: false, data: error.message };
	}
};

export const AddOfficer = async (offr: any) => {
	try {
		// check if officer exists with bd no
		const extOffr = await Offr.findOne({ bd: offr.bd });

		if (extOffr) {
			return { success: false, message: "Officer already exists" };
		} else {
			// offr does not exist in db . so add offr
			const savedOffr = await Offr.create(offr);
			return { success: true, message: "Officer data added successfully", data: savedOffr };
		}
	} catch (error: any) {
		return { success: false, message: "Failed to add Officer data", data: error.message };
	}
};
