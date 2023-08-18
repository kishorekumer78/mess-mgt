'use client';
import { addNewContribution, deleteContribution, getAllContributions, updateContribution } from '@/lib/contribution';
import { ContributionType, ResponseType } from '@/utilities/types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';

export default function ContributionPage(): React.ReactElement {
	const [contributionList, setContributionList] = useState<ContributionType[]>([]);
	const [contribution, setContribution] = useState<ContributionType>({ amount: 0, type: '' });
	const [inputType, setInputType] = useState<'' | 'ADD' | 'EDIT'>('');
	const [total, setTotal] = useState<number>(0);
	//TODO: Create modal for Delete confirmation
	useEffect(() => {
		(async () => {
			const res: ResponseType = await getAllContributions();
			if (res.success) {
				setContributionList(res.data);
			}
		})();
	}, []);
	useEffect(() => {
		setTotal((_) => {
			const sum = contributionList.reduce((val, item) => val + item.amount, 0);
			return sum;
		});
	}, [contributionList]);

	const handleEdit = (con: ContributionType): void => {
		setInputType((_) => 'EDIT');
		setContribution((_) => con);
	};
	const resetInputType = (): void => {
		setInputType('ADD');
		setContribution((_) => ({ amount: 0, type: '' }));
	};

	const handleAdd = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		// send req to api
		const res = await addNewContribution(contribution);

		//On success reset contribution state, add new data to contributionList state and show success message
		if (res.success) {
			setContribution((_) => ({ amount: 0, type: '' }));
			setContributionList((prevState) => [...prevState, res.data]);
			setInputType('');
			toast.success(res.message);
		} else {
			toast.error(res.message);
			//console.log(res.data); //TODO remove
		}
	};
	const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// send req to api
		e.preventDefault();
		const res = await updateContribution(contribution._id, contribution);

		//On success reset contribution state, add new data to contributionList state and show success message
		if (res.success) {
			setContribution((_) => ({ amount: 0, type: '' }));
			setContributionList((prevState) => {
				let updatedList = prevState.map((item) => {
					if (item._id === res.data._id) {
						return { ...res.data };
					} else {
						return item;
					}
				});
				return updatedList;
			});
			setInputType((_) => '');
			toast.success(res.message);
		} else {
			toast.error(res.message);
			console.log(res.data); //TODO remove
		}
	};
	const handleDelete = async (id: string | any) => {
		const res = await deleteContribution(id);
		if (res.success) {
			setContributionList((prev) => [...prev.filter((x) => x._id !== res.data._id)]);
			toast.success(res.message);
		} else {
			toast.error(res.message);
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
								<th>S/N</th>
								<th className="text-center">Type</th>
								<th className="text-center">Amount</th>
								<th className="text-center">Actions</th>
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
											<button
												className="tooltip mx-2"
												data-tip="Edit Data"
												onClick={() => handleDelete(cont._id)}
											>
												<AiFillDelete size={24} className="text-error" />
											</button>
										</td>
									</tr>
								))}
							<tr>
								<td></td>
								<th className="text-end">Total</th>
								<th className="text-center">{total}</th>
								<td></td>
							</tr>

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
						{inputType === 'ADD' ? 'New Contribution Item' : 'Edit Contribution Item'}
					</h3>
					<form>
						<div className="form-control w-full">
							<label className="label label-text">Name</label>
							<input
								type="text"
								placeholder="Name"
								className="input input-bordered w-full "
								value={contribution.type}
								onChange={(e) => setContribution((prev) => ({ ...prev, type: e.target.value }))}
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
									setContribution((prev) => ({ ...prev, amount: Number(e.target.value) }))
								}
							/>
						</div>
						<div className="text-center mt-5">
							{inputType === 'ADD' ? (
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
				</div>
			)}
		</div>
	);
}
