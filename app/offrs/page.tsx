'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CiMemoPad, CiEdit } from 'react-icons/ci';
import { GiShieldDisabled } from 'react-icons/gi';

const MembersPage = (): React.ReactElement => {
	const [offrs, setOffrs] = useState([]);
	// to fetch the list of offrs from db
	useEffect(() => {}, []);

	return (
		<>
			<div className=" mt-5">
				<h3 className="text-center font-semibold underline">List of Officers </h3>
				<div className="text-end">
					<Link href="/offrs/create" className="btn btn-primary">
						+ Add Officer
					</Link>
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
						<tr className="text-center">
							<th>1</th>
							<td>Gp Capt</td>
							<td className="text-start">Karim Rahman Biddut</td>
							<td>9023</td>
							<td>FCTU BAF</td>
							<td>biddut987@gmail.com</td>
							<td>017111111111</td>
							<td>
								<Link href={'#'} className="tooltip mx-2" data-tip="Edit Officer Data">
									<CiEdit size={24} />
								</Link>
								<Link href={'#'} className="tooltip mx-2" data-tip="Details">
									<CiMemoPad size={24} />
								</Link>
								<Link href={'/'} className="tooltip mx-2" data-tip="Make Status Inactive">
									<GiShieldDisabled size={24} color="red" />
								</Link>
							</td>
						</tr>
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

export default MembersPage;
