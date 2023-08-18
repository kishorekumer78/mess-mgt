import { Month } from "../enums";
import { DailyMessingType } from "../types";

export function formatDate(date: Date): string {
	let year = date.getFullYear();
	let month = Object.keys(Month)[date.getMonth()];
	let day = date.getDate();

	return `${day} ${month} ${year}`;
}

export function incrementDay(date: Date, num: number) {
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();
	if (day + num > findLastDayOfMOnth(date)) {
		return null;
	} else {
		return new Date(year, month, day + num, 8, 0, 0);
	}
}

export const findLastDayOfMOnth = (date: Date): number => {
	let days = new Date(date.getFullYear(), date.getMonth() + 1, 0, 8, 0, 0).getDate();
	// console.log(days);
	return days;
};
/**
 *	Finds out the First Date in Object form of the provided month and year
 * @param month Month.Feb from Month enum  Feb=1,Mar=2
 * @param year Full year in number
 * @returns firstDate Object
 */
export function getFirstDateOfMonth(month: number, year: number): Date {
	const lastDate = new Date(Number(year), month, 1, 8, 0, 0);
	return lastDate;
}

/**
 *	Finds out the First Date in Object form of the month from month and year
 * @param month Month.Feb from enum  Feb=1,Mar=2
 * @param year Full year in number
 * @returns lastDate Object of last date of month
 */
export function getLastDateOfMonth(month: number, year: number): Date {
	const lastDate = new Date(Number(year), month + 1, 0, 8, 0, 0);
	return lastDate;
}

export function prepareDailyMessingPayload(dailyMessingArray: DailyMessingType[]): DailyMessingType[] {
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

export function calculateTotalBill(dailyMessings: DailyMessingType[]): number {
	let totalBill = 0;
	dailyMessings.forEach((item) => {
		totalBill = totalBill + Number(item.breakfast) + Number(item.lunch) + Number(item.dinner);
	});
	return totalBill;
}
// var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
// var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
