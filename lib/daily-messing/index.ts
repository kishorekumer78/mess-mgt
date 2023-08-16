import { DailyMessingType, ResponseType } from "@/utilities/types";

const apiUrl = `${process.env.API_URL}/daily-messing`;

export async function addDailyMessings(dailyMessings: DailyMessingType[]): Promise<ResponseType> {
	const res = await fetch(apiUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(dailyMessings)
	});
	if (!res.ok) {
		throw new Error("Error");
	}
	const data: ResponseType = await res.json();
	// console.log(data);
	return data;
}

export async function getDailyMessings(offrId: string, date: Date): Promise<ResponseType> {
	const res = await fetch(`${apiUrl}?offrId=${offrId}&date=${+date}`);
	const result: ResponseType = await res.json();
	const data = result.data.map((item: any) => ({ ...item, date: new Date(item.date) }));
	return { ...result, data: data };
}
