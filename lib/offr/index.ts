import { OfficerType, ResponseType } from "@/utilities/types";

const apiUrl = `${process.env.API_URL}/offrs`;
console.log(apiUrl);

export const getAllOfficers = async (): Promise<ResponseType> => {
	const res = await fetch(apiUrl, { cache: "no-store" });
	const data: ResponseType = await res.json();
	return data;
};
export const getAllOfficersMinDataFromRank = async (rank: string): Promise<ResponseType> => {
	const res = await fetch(`${apiUrl}/min?rank=${rank}`, { cache: "no-store" });
	const data: ResponseType = await res.json();
	return data;
};

export const getOfficerDetails = async (id: string): Promise<ResponseType> => {
	const res = await fetch(`${apiUrl}/${id}`, { cache: "no-store" });
	const data: ResponseType = await res.json();
	return data;
};

export const createOffr = async (offr: OfficerType): Promise<ResponseType> => {
	const res = await fetch(apiUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(offr)
	});
	const data: ResponseType = await res.json();

	return data;
};

export const updateOffr = async (id: string, offr: OfficerType): Promise<ResponseType> => {
	const res = await fetch(`${apiUrl}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(offr),
		cache: "no-store"
	});
	const data: ResponseType = await res.json();
	return data;
};

export const deleteOffr = async (id: string): Promise<ResponseType> => {
	const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
	const data: ResponseType = await res.json();
	return data;
};
