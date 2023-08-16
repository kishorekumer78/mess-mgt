"use client";
import React, { useState } from "react";
import { Rank } from "@/utilities/enums";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { OfficerType, ResponseType } from "@/utilities/types";
import { createOffr } from "@/lib/offr";

const CreateOfficerPage = (): React.ReactElement => {
	const router = useRouter();
	const [offr, setOffr] = useState<OfficerType>({
		name: "",
		rank: "NONE",
		bd: 0,
		email: "",
		mobile: "",
		unit: "",
		outStation: false,
		messIn: false
	});

	const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		const res: ResponseType = await createOffr(offr);
		if (res.success === true) {
			toast.success(res.message);
			router.push(`/offrs?${Math.random().toString()}`);
		} else {
			toast.error(res.message);
			console.log(res.data); //TODO remove
		}
	};

	return (
		<>
			<div className="mt-5 w-3/4 mx-auto border border-gray-300 rounded-lg p-5">
				<h2 className="text-center font-bold">Add Officer Details</h2>
				<form className="">
					<div className="flex space-x-5">
						<div className="left w-full">
							<div className="form-control w-full">
								<label className="label label-text">Rank</label>
								<select
									className="select select-bordered w-full"
									value={offr.rank}
									onChange={(e) => setOffr({ ...offr, rank: e.target.value })}
								>
									{Object.keys(Rank).map((key, i) => (
										<option className="optionStyle" key={i} value={key}>
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
									onChange={(e) => setOffr({ ...offr, bd: Number(e.target.value) })}
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
						</div>
						<div className="right w-full">
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
						</div>
					</div>
					<div className="text-center mt-5">
						<button className="btn btn-primary w-1/3" onClick={(e) => handleSave(e)}>
							Save
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateOfficerPage;
