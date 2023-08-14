import React from "react";
import Link from "next/link";
import { CiMemoPad } from "react-icons/ci";
import { GiShieldDisabled } from "react-icons/gi";
import { Rank } from "@/utilities/enums";
import { OfficerType } from "@/utilities/types";
import { getAllOfficers } from "@/helpers/offr";

const OfficersListPage = async () => {
	let offrs: OfficerType[] = [];
	const res = await getAllOfficers();

	if (res.success) {
		offrs = res.data;
	}

	return (
		<>
			<div className=" mt-5">
				<h3 className="text-center font-semibold underline">List of Officers </h3>
				<div className="text-end">
					<Link href={`/offrs/create`}>+ Add Officer</Link>
				</div>
				<table className="table">
					<thead>
						<tr>
							<th></th>
							<th className="text-center">Rank</th>
							<th className="text-center">Name</th>
							<th className="text-center">BD No</th>
							<th className="text-center">Unit</th>
							<th className="text-center">Email</th>
							<th className="text-center">Mobile</th>
							<th className="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{offrs.length > 0 &&
							offrs.map((offr, i) => (
								<tr className="text-center" key={i}>
									<th>{i + 1}</th>
									<td>{Rank[offr.rank]}</td>
									<td className="text-start">{offr.name}</td>
									<td>{offr.bd}</td>
									<td>{offr.unit}</td>
									<td>{offr.email}</td>
									<td>{offr.mobile}</td>
									<td>
										<Link href={`/offrs/${offr._id}`} className="tooltip mx-2" data-tip="Details">
											<CiMemoPad size={24} />
										</Link>
										<Link href={"#"} className="tooltip mx-2" data-tip="Make Status Inactive">
											<GiShieldDisabled size={24} color="red" />
										</Link>
									</td>
								</tr>
							))}

						<tr className="text-center">
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td>Total</td>
							<td>{offrs.length}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default OfficersListPage;
