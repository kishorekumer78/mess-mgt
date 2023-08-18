'use client';
import { addDailyMessings, getDailyMessings } from '@/lib/daily-messing';
import { getAllOfficers } from '@/lib/offr';
import { Month, Rank } from '@/utilities/enums';
import {
	calculateTotalBill,
	findLastDayOfMOnth,
	formatDate,
	incrementDay,
	prepareDailyMessingPayload
} from '@/utilities/misc';
import { DailyMessingType, OfficerType } from '@/utilities/types';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

export default function MessingPage() {
	const currentYear = new Date().getFullYear();
	const prevYear = currentYear - 1;
	const [offrs, setOffrs] = useState<OfficerType[]>([]);
	const [selectedRank, setSelectedRank] = useState('NONE'); // basing on this fetch officers data from api and fill the select box
	const [selectedOffr, setSelectedOffr] = useState<OfficerType>({ rank: 'NONE', name: '', bd: 0 });
	const [month, setMonth] = useState('Jan');
	const [year, setYear] = useState(currentYear);
	const [startDate, setStartDate] = useState(new Date(year, Month[month], 1, 8, 0, 0));

	const [inputFields, setInputFields] = useState<DailyMessingType[]>([]);

	const [totalBill, setTotalBill] = useState<number>(0);

	const handleSelectRank = async (rank: string) => {
		if (rank && rank !== 'NONE') {
			setSelectedRank((prev) => rank);
			const res = await getAllOfficers({ rank: rank }, ['name', 'bd', 'rank']);
			if (res.success) {
				setOffrs((_) => [...res.data]);
			}
		}
	};

	const handleSelectOfficer = (id: string) => {
		const officer = offrs.find((offr) => offr._id === id);
		console.log(officer);

		if (officer) {
			setSelectedOffr((_) => officer);
		}
	};

	const inputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
		let data = [...inputFields];
		data[index][event.target.name] = event.target.value;
		setInputFields(data);
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		const payLoad = prepareDailyMessingPayload(inputFields);
		const res = await addDailyMessings(payLoad);
		if (res.success) {
			toast.success(res.message);
		} else {
			console.log(res.data);
			toast.error(res.message);
		}
	};

	useEffect(() => {
		setStartDate(new Date(year, Month[month], 1, 8, 0, 0));
	}, [month, year]);
	useEffect(() => {
		const bill = calculateTotalBill(inputFields);
		setTotalBill((prev) => bill);
	}, [inputFields]);

	const handleGenerateForm = async () => {
		setInputFields((prev) => []);
		let days = findLastDayOfMOnth(startDate); // 30/31
		// get data from data base with condition selectedOffr, day start and end
		const res = await getDailyMessings(selectedOffr._id, startDate);
		// console.log(res);
		let saved: DailyMessingType[] = [];
		if (res.success) {
			saved = res.data;
		}
		let totalFields: DailyMessingType[] = [];
		if (startDate && selectedOffr.bd != 0) {
			for (let i = 0; i < days; i++) {
				let element: DailyMessingType = {
					date: incrementDay(startDate, i),
					offr: selectedOffr._id,
					breakfast: 0,
					lunch: 0,
					dinner: 0
				};
				const foundInSaved = saved.find((x) => +x.date === +element.date);
				// console.log(foundInSaved);
				if (foundInSaved) {
					element.breakfast = foundInSaved.breakfast;
					element.lunch = foundInSaved.lunch;
					element.dinner = foundInSaved.dinner;
					// console.log(element);
				}
				totalFields.push(element);
			}
			// console.log(totalFields);
			setInputFields((prev) => [...totalFields]);
		}
	};

	return (
		<>
			<div className="offr-details mt-5 flex justify-center gap-10">
				<div className="w-80 flex  gap-3">
					<label className="label label-text">Rank</label>
					<select
						className="select select-bordered w-full"
						value={selectedRank}
						onChange={(e) => handleSelectRank(e.target.value)}
					>
						{Object.keys(Rank).map((key, i) => (
							<option className="optionStyle" key={i} value={key}>
								{Rank[key]}
							</option>
						))}
					</select>
				</div>
				<div className="w-80 flex gap-3">
					<label className="label label-text">Name</label>
					<select
						className="select select-bordered w-full"
						value={selectedOffr._id}
						onChange={(e) => handleSelectOfficer(e.target.value)}
					>
						<option className="optionStyle" value={''}>
							--Select Officer--
						</option>
						{offrs.map((offr, i) => (
							<option className="optionStyle" key={i} value={offr._id}>
								{offr.name}
							</option>
						))}
					</select>
				</div>
				<div className="w-80 flex gap-3">
					<label className="label label-text">Year</label>
					<select
						className="select select-bordered w-full"
						value={year}
						onChange={(e) => setYear(Number(e.target.value))}
					>
						<option className="optionStyle" value={0}>
							--Select Year--
						</option>
						<option className="optionStyle" value={currentYear}>
							{currentYear}
						</option>
						<option className="optionStyle" value={prevYear}>
							{prevYear}
						</option>
					</select>
				</div>
				<div className="w-80 flex gap-3">
					<label className="label label-text">Month</label>
					<select
						className="select select-bordered w-full"
						value={month}
						onChange={(e) => setMonth((_) => e.target.value)}
					>
						{Object.keys(Month).map((key, i) => (
							<option className="optionStyle" key={i} value={key}>
								{key}
							</option>
						))}
					</select>
				</div>
				<div className="w-28">
					<button onClick={() => handleGenerateForm()} className="btn btn-primary">
						Generate
					</button>
				</div>
			</div>
			{/* {JSON.stringify(offrs)}
			<br />
			{JSON.stringify(selectedOffr)} */}
			<div className="flex gap-2 w-full">
				<div className="w-3/5 p-5 mt-5 rounded-lg bg-gray-100">
					<form>
						<div className="flex justify-between items-center text-center m">
							<h2 className="w-28 p-0 ">Date</h2>
							<h2 className="w-28 p-0">Breakfast</h2>
							<h2 className="w-28 p-0 ">Lunch</h2>
							<h2 className="w-28 p-0 ">Dinner</h2>
						</div>
						{inputFields &&
							inputFields.map((input, i) => (
								<div key={i} className="flex  items-center justify-between mt-5">
									<span className="font-semibold w-28 text-center">{formatDate(input.date)}</span>

									<input
										type="number"
										name="breakfast"
										className="input text-center input-bordered w-28 p-0 h-[40px]"
										value={input.breakfast}
										onChange={(e) => inputChange(e, i)}
									/>

									<input
										type="number"
										name="lunch"
										className="input text-center input-bordered w-28 p-0 h-[40px]"
										value={input.lunch}
										onChange={(e) => inputChange(e, i)}
									/>

									<input
										type="number"
										name="dinner"
										className="input text-center input-bordered w-28 p-0 h-[40px]"
										value={input.dinner}
										onChange={(e) => inputChange(e, i)}
									/>
								</div>
							))}
						<div className="text-center mt-5">
							<button onClick={(e) => handleSubmit(e)} className="btn btn-primary w-2/4">
								Save
							</button>
						</div>
					</form>
				</div>

				<div className="w-2/5 p-5 mt-5 rounded-lg bg-gray-100">
					<table className="table text-center">
						<thead>
							<tr>
								<th>Date</th>
								<th>Breakfast</th>
								<th>Lunch</th>
								<th>Dinner</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{inputFields &&
								inputFields.map((item, i) => (
									<tr key={i}>
										<td className="">{formatDate(item.date)}</td>
										<td className="">{item.breakfast}</td>
										<td className="">{item.lunch}</td>
										<td className="">{item.dinner}</td>
										<td className="">
											{Number(item.breakfast) + Number(item.lunch) + Number(item.dinner)}
										</td>
									</tr>
								))}
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<th>Total</th>
								<th>{totalBill}</th>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
