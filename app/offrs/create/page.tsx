"use client";
import React, { useState } from "react";
import { Rank } from "@/utilities/enums";
import styles from "./style.module.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateOfficerPage = (): React.ReactElement => {
	const router = useRouter();
	const [offr, setOffr] = useState({
		name: "",
		rank: "NONE",
		bd: "",
		email: "",
		mobile: "",
		unit: ""
	});

	const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// prevent page refresh
		e.preventDefault();
		// send request to server to add data
		try {
			const res = await axios.post("/api/offrs", offr);
			if (res.data.success === true) {
				// show success toast
				toast.success(res.data.message);
				// redirect to offr list page
				// router.push(`/offrs?num=${Math.random().toFixed().toString()}`);
				router.push("/offrs");
			} else {
				// on failure remain on the page
				//show error toast
				// errors in res.data.data
				toast.error(res.data.message);
				//  display errors
				//TODO
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<div className="mt-5 w-1/3 mx-auto border border-gray-300 rounded-lg p-5">
				<h2 className="text-center font-bold">Add Officer Details</h2>
				<form className="">
					<div className="form-control w-full">
						<label className="label label-text">Rank</label>
						<select
							className="select select-bordered w-full"
							value={offr.rank}
							onChange={(e) => setOffr({ ...offr, rank: e.target.value })}
						>
							{Object.keys(Rank).map((key, i) => (
								<option className={styles.optionStyle} key={i} value={key}>
									{Rank[key]}
								</option>
							))}
						</select>
					</div>
					<div className="form-control w-full">
						<label className="label label-text">Name</label>
						<input
							type="text"
							placeholder="Name"
							className="input input-bordered w-full "
							value={offr.name}
							onChange={(e) => setOffr({ ...offr, name: e.target.value })}
						/>
					</div>
					<div className="form-control w-full">
						<label className="label label-text">BD No</label>
						<input
							type="number"
							placeholder="BD No"
							className="input input-bordered w-full "
							value={offr.bd}
							onChange={(e) => setOffr({ ...offr, bd: e.target.value })}
						/>
					</div>
					<div className="form-control w-full">
						<label className="label label-text">Unit</label>
						<input
							type="text"
							placeholder="Unit name"
							className="input input-bordered w-full "
							value={offr.unit}
							onChange={(e) => setOffr({ ...offr, unit: e.target.value })}
						/>
					</div>
					<div className="form-control w-full">
						<label className="label label-text">Email</label>
						<input
							type="text"
							placeholder="Email"
							className="input input-bordered w-full "
							value={offr.email}
							onChange={(e) => setOffr({ ...offr, email: e.target.value })}
						/>
					</div>
					<div className="form-control w-full">
						<label className="label label-text">Mobile</label>
						<input
							type="text"
							placeholder="Mobile"
							className="input input-bordered w-full "
							value={offr.mobile}
							onChange={(e) => setOffr({ ...offr, mobile: e.target.value })}
						/>
					</div>
					<div className="text-center mt-5">
						<button className="btn btn-primary w-full" onClick={(e) => handleSave(e)}>
							Save
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateOfficerPage;
