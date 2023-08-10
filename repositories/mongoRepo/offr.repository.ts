import { connect } from "@/db/dbConfig";
import validateMongoDbId from "@/helpers/validateMongoDbId";
import Offr from "@/models/offr.model";

connect();
export const getAllOffrs = async () => {
	try {
		return await Offr.find();
	} catch (error) {
		return [];
	}
};

export const getOffrById = async (id: string) => {
	validateMongoDbId(id);
	try {
		const offr = await Offr.findById(id);
		return offr;
	} catch (error) {
		return null;
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

export const updateOffr = async (offr: any) => {
	validateMongoDbId(offr.id);
	try {
		const updatedOffr = await Offr.findOneAndUpdate({ bd: offr.bd }, offr);
		return updatedOffr;
	} catch (error) {
		return null;
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
