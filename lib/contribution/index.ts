import { Msg } from '@/utilities/enums';
import { ContributionType, ResponseType } from '@/utilities/types';

const apiUrl = `${process.env.API_URL}/admin/contribution`;

export async function getAllContributions(): Promise<ResponseType> {
	const res = await fetch(`${apiUrl}`, { cache: 'no-store' });
	if (!res.ok) {
		throw new Error(Msg.DATA_FETCH_FAIL + 'For Contributions');
	}
	const data: ResponseType = await res.json();
	return data;
}

export async function findContributionById(id: string | any): Promise<ResponseType> {
	const res = await fetch(`${apiUrl}/${id}`);
	if (!res.ok) {
		throw new Error(Msg.DATA_FETCH_FAIL + 'For Contribution');
	}
	const data: ResponseType = await res.json();
	return data;
}

export async function addNewContribution(contribution: ContributionType): Promise<ResponseType> {
	const res = await fetch(apiUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(contribution)
	});
	if (!res.ok) {
		throw new Error(Msg.DATA_ADD_FAIL + 'For New Contribution');
	}
	const data: ResponseType = await res.json();
	return data;
}

export async function updateContribution(id: string | any, contribution: ContributionType): Promise<ResponseType> {
	const res = await fetch(`${apiUrl}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(contribution)
	});
	if (!res.ok) {
		throw new Error(Msg.DATA_ADD_FAIL + 'For New Contribution');
	}
	const data: ResponseType = await res.json();
	return data;
}
export async function deleteContribution(id: string | any) {
	const res = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
	if (!res.ok) {
		throw new Error(Msg.DATA_ADD_FAIL + 'For New Contribution');
	}
	const data: ResponseType = await res.json();
	return data;
}
