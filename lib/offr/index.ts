import { OfficerType, ResponseType } from '@/utilities/types';

const apiUrl = `${process.env.API_URL}/offrs`;

export async function getAllOfficers(filter = {}, fields = []): Promise<ResponseType> {
	let url = `${apiUrl}?`;
	if (Object.keys(filter).length > 0) {
		const keyArr = Object.keys(filter);
		keyArr.forEach((el, i) => {
			let filterStr = `${keyArr[i]}=${filter[el]}&`;
			url = url + filterStr;
		});
	}

	if (fields.length > 0) {
		let fdStr = `fields=${fields.join('_')}`;
		url = url + fdStr;
	}
	// console.log(url);
	const res = await fetch(url, { cache: 'no-store' });
	if (!res.ok) {
		throw new Error('Error fetching data in front end');
	}
	const data = await res.json();
	return data;
}
export async function getAllOfficersMinDataFromRank(rank: string): Promise<ResponseType> {
	const res = await fetch(`${apiUrl}/min?rank=${rank}`, { cache: 'no-store' });
	if (!res.ok) {
		throw new Error('Error');
	}
	return await res.json();
}

export async function getOfficerDetails(id: string): Promise<ResponseType> {
	const res = await fetch(`${apiUrl}/${id}`, { cache: 'no-store' });
	if (!res.ok) {
		throw new Error('Error');
	}
	return await res.json();
}

export async function createOffr(offr: OfficerType): Promise<ResponseType> {
	const res = await fetch(apiUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(offr)
	});
	if (!res.ok) {
		throw new Error('Error');
	}
	return await res.json();
}

export async function updateOffr(id: string, offr: OfficerType): Promise<ResponseType> {
	const res = await fetch(`${apiUrl}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(offr),
		cache: 'no-store'
	});
	if (!res.ok) {
		throw new Error('Error');
	}
	return await res.json();
}

export async function deleteOffr(id: string): Promise<ResponseType> {
	const res = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
	if (!res.ok) {
		throw new Error('Error');
	}
	return await res.json();
}
