"use client";
import React, { useEffect, useState } from "react";
import styles from "../../create/style.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Rank from "@/utilities/enums/rank.enum";
import toast from "react-hot-toast";

const getOffrDetails = async (id: string) => {
	const url = `/api/offrs/${id}`;
	const res = await axios.get(url);
	if (res.data.success === true) {
		return res.data.data;
	} else return null;
};

const EditOfficerDetailsPage = ({ params }: { params: { id: string } }) => {
	const router = useRouter();
	const [offr, setOffr] = useState({
		_id: "",
		name: "",
		rank: "",
		bd: "",
		email: "",
		mobile: "",
		unit: "",
		outStation: false,
		messIn: false
	});
	// grab params
	const { id } = params;

	// set the user data brought from db to user state
	useEffect(() => {
		(async () => {
			const data = await getOffrDetails(id);
			if (data) {
				setOffr({ ...data });
			}
		})();
	}, [id]);

	const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// prevent page refresh
		e.preventDefault();
		// send request to server to add data
		try {
			const res = await axios.put(`/api/offrs/${offr._id}`, offr, {
				headers: {
					"Cache-Control": "no-cache",
					Pragma: "no-cache",
					Expires: "0"
				}
			});
			if (res.data.success === true) {
				// show success toast
				toast.success(res.data.message);
				// redirect to offr list page
				// router.push(`/offrs?${Math.random().toString()}`);
				router.push("/offrs");
			} else {
				// on failure remain on the page
				//show error toast
				toast.error(res.data.message);
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
					<div className="form-control">
						<label className="label cursor-pointer">
							<span className="label-text">Out Station</span>
							<input
								type="checkbox"
								checked={offr.outStation}
								className="checkbox"
								onChange={() =>
									setOffr((prevOffr) => ({
										...prevOffr,
										outStation: !prevOffr.outStation
									}))
								}
							/>
						</label>
					</div>
					<div className="form-control">
						<label className="label cursor-pointer">
							<span className="label-text">Mess in</span>
							<input
								type="checkbox"
								checked={offr.messIn}
								className="checkbox"
								onChange={() =>
									setOffr((prevOffr) => ({
										...prevOffr,
										messIn: !prevOffr.messIn
									}))
								}
							/>
						</label>
					</div>
					<div className="text-center mt-5">
						<button className="btn btn-primary w-full" onClick={(e) => handleSave(e)}>
							Update
						</button>
					</div>
				</form>
			</div>
			<h2>{JSON.stringify(offr)}</h2> {/* 🔔 */}
			{/* TODO remove */}
		</>
	);
};

export default EditOfficerDetailsPage;
