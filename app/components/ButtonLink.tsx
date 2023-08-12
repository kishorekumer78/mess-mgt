"use client";
import Link from "next/link";
import React from "react";

const ButtonLink = ({ href, children }): React.ReactElement => {
	return (
		<Link className="btn btn-primary" href={href}>
			{children}
		</Link>
	);
};

export default ButtonLink;
