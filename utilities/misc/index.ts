import { Month } from "../enums";
import { DailyMessingType } from "../types";

export const formatDate = (date: Date): string => {
	let year = date.getFullYear();
	let month = Object.keys(Month)[date.getMonth()];
	let day = date.getDate();

	return `${day} ${month} ${year}`;
};

export const incrementDay = (date: Date, num: number) => {
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();
	if (day + num > findLastDayOfMOnth(date)) {
		return null;
	} else {
		return new Date(year, month, day + num, 8, 0, 0);
	}
};

export const findLastDayOfMOnth = (date: Date): number => {
	let days = new Date(date.getFullYear(), date.getMonth() + 1, 0, 8, 0, 0).getDate();
	// console.log(days);
	return days;
};

export function prepareDailyMessingPayload(dailyMessingArray: DailyMessingType[]) {
	const messingBills = dailyMessingArray.filter(
		(item) => !item._id || Number(item.breakfast) !== 0 || Number(item.lunch !== 0) || Number(item.dinner) !== 0
	);
	// convert the breakfast,lunch, dinner value to number
	const payLoad: DailyMessingType[] = messingBills.map((item) => {
		return {
			...item,
			breakfast: Number(item.breakfast),
			lunch: Number(item.lunch),
			dinner: Number(item.dinner),
			date: item.date
		};
	});
	return payLoad;
}

export const calculateTotalBill = (dailyMessings: DailyMessingType[]): number => {
	let totalBill = 0;
	dailyMessings.forEach((item) => {
		totalBill = totalBill + Number(item.breakfast) + Number(item.lunch) + Number(item.dinner);
	});
	return totalBill;
};
// var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
// var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
