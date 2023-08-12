import React from "react";
import Link from "next/link";
import { CiMemoPad, CiEdit } from "react-icons/ci";
import { GiShieldDisabled } from "react-icons/gi";

export default function OfficerListActionLinks({ id }) {
	return (
		<>
			<Link href={`/offrs/edit/${id}`} className="tooltip mx-2" data-tip="Edit Officer Data">
				<CiEdit size={24} />
			</Link>
			<Link href={`/offrs/${id}`} className="tooltip mx-2" data-tip="Details">
				<CiMemoPad size={24} />
			</Link>
			<Link href={"#"} className="tooltip mx-2" data-tip="Make Status Inactive">
				<GiShieldDisabled size={24} color="red" />
			</Link>
		</>
	);
}
