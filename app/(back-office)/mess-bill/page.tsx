'use client';
import BillList from '@/components/BillList';
import { Month } from '@/utilities/enums';
import { useEffect, useState } from 'react';

export default function MessBillPage() {
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState('Jan');
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow((_) => false);
	}, [year, month]);

	const handleClick = () => {
		setShow((_) => true);
	};

	return (
		<>
			<div className="flex gap-20 justify-center mt-5">
				<div className="w-80 flex gap-3">
					<label className="label label-text">Year</label>
					<select
						className="select select-bordered w-full"
						value={year}
						onChange={(e) => setYear((prev) => Number(e.target.value))}
					>
						<option className="optionStyle" key={0} value={new Date().getFullYear()}>
							{new Date().getFullYear()}
						</option>
						<option className="optionStyle" key={1} value={new Date().getFullYear() - 1}>
							{new Date().getFullYear() - 1}
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
				<button className="btn btn-primary mx-3" onClick={handleClick}>
					GO
				</button>
			</div>
			{`Month ${Month[month]}`}
			<br />
			{`Year ${year}`}

			<BillList year={year} month={Month[month]} />
		</>
	);
}
