import React from 'react';

export default function CircleDisplay({ value }) {
	// Calculate the number of circles to fill based on the value
	const filledCircles = Math.min(value, 4);

	// Create an array of circle elements with appropriate classes
	const circles = Array.from({ length: 4 }, (_, index) => (
		<div
			key={index}
			className={`badge badge-md mx-1 ${index < filledCircles ? 'badge-primary' : 'badge-neutral'}`}
		></div>
	));

	return <div className="circle-container">{circles}</div>;
}
