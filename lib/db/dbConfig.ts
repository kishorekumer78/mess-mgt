import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		const conn = mongoose.connection;
		conn.on("connected", () => {
			console.log("Connected to MONGO DB successfully");
		});
		conn.on("error", (err) => {
			console.log("Error connecting to MONGO DB", err);
			process.exit();
		});
	} catch (error) {
		console.log(error.messages);
	}
};
