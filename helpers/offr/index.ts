import { OfficerType, ResponseType } from "@/utilities/types";
//TODO: for
const apiUrl = "/api/offrs";

export const getAllOfficers = async () => {
	const res = await fetch("http://127.0.0.1:3000/api/offrs", { cache: "no-store" });
	const data: ResponseType = await res.json();
	return data;
};

export const getOfficerDetails = async (id: string) => {
	const res = await fetch(`http://127.0.0.1:3000/api/offrs/${id}`, { cache: "no-store" });
	const data: ResponseType = await res.json();
	return data;
};

export const createOffr = async (offr: OfficerType) => {
	const res = await fetch(`http://127.0.0.1:3000/api/offrs`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(offr)
	});
	const data: ResponseType = await res.json();

	return data;
};

export const updateOffr = async (id: string, offr: OfficerType) => {
	const res = await fetch(`http://127.0.0.1:3000/api/offrs/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(offr),
		cache: "no-store"
	});
	const data: ResponseType = await res.json();
	return data;
};

export const deleteOffr = async (id: string) => {
	const res = await fetch(`http://127.0.0.1:3000/api/offrs/${id}`, { method: "DELETE" });
	const data: ResponseType = await res.json();
	return data;
};
