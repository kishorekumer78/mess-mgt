"use client";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function MessingPage() {
	const [startDate, setStartDate] = useState(new Date());

	return (
		<div>
			<DatePicker dateFormat={"dd/MM/yyyy"} selected={startDate} onChange={(date: Date) => setStartDate(date)} />
		</div>
	);
}
