export type OfficerType = {
	_id: string | any;
	name: string;
	rank: string;
	bd: number;
	email: string;
	mobile: string;
	unit: string;
	outStation: boolean;
	messIn: boolean;
};

export type ResponseType = {
	message: string;
	success: boolean;
	data?: OfficerType | ContributionType | any;
};

export type ContributionType = {
	_id: string | any;
	type: string;
	amount: number;
};
