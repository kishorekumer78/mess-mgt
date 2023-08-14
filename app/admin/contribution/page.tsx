"use client";
import { addNewContribution, getAllContributions, updateContribution } from "@/helpers/contribution.helper";
import { ContributionType, ResponseType } from "@/utilities/types";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";

export default function ContributionPage(): React.ReactElement {
	const [contributionList, setContributionList] = useState<ContributionType[]>([]);
	const [contribution, setContribution] = useState<ContributionType>({
		_id: "",
		amount: 0,
		type: ""
	});
	const [inputType, setInputType] = useState("");

	useEffect(() => {
		(async () => {
			const res: ResponseType = await getAllContributions();
			if (res.success) {
				setContributionList(res.data);
				toast.success(res.message);
			}
		})();
	}, []);

	const handleEdit = (con: ContributionType) => {
		setInputType("EDIT");
		setContribution(con);
	};
	const resetInputType = () => {
		setInputType("ADD");
		setContribution({ _id: "", amount: 0, type: "" });
	};

	const handleAdd = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		// send req to api
		const res = await addNewContribution(contribution);

		//On success reset contribution state, add new data to contributionList state and show success message
		if (res.success) {
			setContribution({ _id: "", amount: 0, type: "" });
			setContributionList([...contributionList, res.data]);
			setInputType("");
			toast.success(res.message);
		} else {
			toast.error(res.message);
			console.log(res.data); //TODO remove
		}
	};
	const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// send req to api
		e.preventDefault();
		const res = await updateContribution(contribution._id, contribution);

		//On success reset contribution state, add new data to contributionList state and show success message
		if (res.success) {
			setContribution({ _id: "", amount: 0, type: "" });
			setContributionList(
				contributionList.map((item) => {
					if (item._id === res.data._id) {
						return { ...res.data };
					} else {
						return item;
					}
				})
			);
			setInputType("");
			toast.success(res.message);
		} else {
			toast.error(res.message);
			console.log(res.data); //TODO remove
		}
	};
	return (
		<div className="flex justify-between">
			<div className="w-3/6">
				<div className="border border-gray-300 rounded-lg p-5 mt-5">
					<h3 className="text-center font-semibold underline">Contribution List </h3>
					<div className="text-end">
						<button className="mx-2 btn btn-primary" onClick={resetInputType}>
							Add
						</button>
					</div>
					<table className="table">
						<thead>
							<tr>
								<th></th>
								<th className="text-center">Type</th>
								<th className="text-center">Amount</th>
								<th className="text-center"></th>
							</tr>
						</thead>
						<tbody>
							{contributionList.length > 0 &&
								contributionList.map((cont, i) => (
									<tr className="text-center" key={i}>
										<th>{i + 1}</th>
										<th>{cont.type}</th>
										<td>{cont.amount}</td>
										<td>
											<button
												className="tooltip mx-2"
												data-tip="Edit Data"
												onClick={() => handleEdit(cont)}
											>
												<CiEdit size={24} />
											</button>
										</td>
									</tr>
								))}

							{/* <tr>
								<td></td>
								<th className="text-end">Total</th>
								<td className="text-center">{total}</td>
							</tr> */}
						</tbody>
					</table>
				</div>
			</div>
			{inputType && (
				<div className="w-2/6 border border-gray-300 rounded-lg p-5 mt-5">
					<h3 className="font-bold mb-3 text-center">
						{inputType === "ADD" ? "New Contribution Item" : "Edit Contribution Item"}
					</h3>
					<form>
						<div className="form-control w-full">
							<label className="label label-text">Name</label>
							<input
								type="text"
								placeholder="Name"
								className="input input-bordered w-full "
								value={contribution.type}
								onChange={(e) => setContribution({ ...contribution, type: e.target.value })}
							/>
						</div>
						<div className="form-control w-full">
							<label className="label label-text">Amount</label>
							<input
								type="number"
								placeholder="Amount"
								className="input input-bordered w-full "
								value={contribution.amount}
								onChange={(e) =>
									setContribution({
										...contribution,
										amount: Number(e.target.value)
									})
								}
							/>
						</div>
						<div className="text-center mt-5">
							{inputType === "ADD" ? (
								<button className="btn btn-primary w-full" onClick={(e) => handleAdd(e)}>
									Add
								</button>
							) : (
								<button className="btn btn-primary w-full" onClick={(e) => handleUpdate(e)}>
									Update
								</button>
							)}
						</div>
					</form>
					{/* TODO: Remove */}
					{JSON.stringify(contribution)}
				</div>
			)}
		</div>
	);
}
