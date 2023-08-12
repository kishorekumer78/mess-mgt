import React from "react";
import ButtonLink from "../components/ButtonLink";
import OfficerListActionLinks from "../components/OfficerListActionLinks";
import { Rank } from "@/utilities/enums";
import { OfficerType } from "@/utilities/types";

const OfficersListPage = async (): Promise<React.ReactElement> => {
	const data = await fetch(`${process.env.DOMAIN_NAME}/api/offrs`, { cache: "no-store" });
	const res = await data.json();
	const offrs: OfficerType[] = res.data;

	return (
		<>
			<div className=" mt-5">
				<h3 className="text-center font-semibold underline">List of Officers </h3>
				<div className="text-end">
					<ButtonLink href="/offrs/create">+ Add Officer</ButtonLink>
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
						{offrs &&
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
										<OfficerListActionLinks id={offr._id} />
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
