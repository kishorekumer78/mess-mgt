import { ContributionType, ResponseType } from "@/utilities/types";

const apiUrl = "/api/admin/contribution";

export const getAllContributions = async (): Promise<ResponseType> => {
	const res = await fetch(`${apiUrl}`, { cache: "no-store" });
	const data: ResponseType = await res.json();
	return data;
};

export const addNewContribution = async (contribution: ContributionType): Promise<ResponseType> => {
	const res = await fetch(apiUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(contribution)
	});
	const data = await res.json();
	return data;
};

export const updateContribution = async (id: string | any, contribution: ContributionType): Promise<ResponseType> => {
	const res = await fetch(`${apiUrl}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(contribution)
	});
	const data = await res.json();
	return data;
};
