import { getFirstDateOfMonth, getLastDateOfMonth } from '@/utilities/misc';
import { OfficerType } from '@/utilities/types';
import Link from 'next/link';
import { GiMeal, GiShieldDisabled } from 'react-icons/gi';
import CircleDisplay from './CircleDisplay';

export default async function BillList({ month, year }) {
	// bring all data with req field only
	// show in the status box 4 circles and based on billStatus show filled
	// links to Daily messing generation,Bill Generation,

	const firstDay: Date = getFirstDateOfMonth(month, year);
	const lastDay: Date = getLastDateOfMonth(month, year);
	let offrList: OfficerType[] = [];
	// (async () => {
	// 	const res = await getAllOfficers({}, ['name', 'bd', 'rank']);
	// 	if (res.success) {
	// 		offrList = res.data;
	// 		console.log(offrList);
	// 	}
	// })();

	return (
		<>
			<div className=" mt-5">
				<table className="table text-center">
					<thead>
						<tr>
							<th>BD No</th>
							<th>Name</th>
							<th>Unit</th>
							<th>State</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{/* {offrList.length > 0 &&
							offrList.map((offr, index) => ( */}
						<tr className="text-center">
							<th>9385</th>
							<td className="text-start">Air Cdre John Doe Maria</td>
							<td>RTS BAF</td>
							<td>
								<CircleDisplay value={2} />
							</td>
							<td>
								<Link href={`/offrs/`} className="tooltip mx-2" data-tip="Details">
									<GiMeal size={24} />
								</Link>
								<Link href={'#'} className="tooltip mx-2" data-tip="Make Status Inactive">
									<GiShieldDisabled size={24} color="red" />
								</Link>
							</td>
						</tr>
						{/* ))} */}
					</tbody>
				</table>
			</div>

			{month}
			<br />
			{year}
		</>
	);
}
