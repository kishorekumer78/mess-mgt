"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";


const SignupPage = () => {
	const router = useRouter();
	const [user, setUser] = useState({ email: "", password: "", username: "" });
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	const handleSignup = async () => {
		try {
			setLoading(true);
			const res = await axios.post("/api/signup", user);
			toast.success("Signup Successful");
			router.push("/login");
		} catch (error) {
			toast.error("Could not Signup");
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<div className="flex flex-col p-5 w-1/4 mx-auto border border-neutral rounded-lg mt-[50px]">
				<h1 className="text-center text-lg font-bold my-3">{loading ? "Processing" : "Signup"}</h1>

				<label htmlFor="username" className="label label-text">
					Username
				</label>
				<input
					className="input input-bordered w-full max-w-x"
					type="text"
					name="username"
					id="username"
					placeholder="Username"
					value={user.username}
					onChange={(e) => setUser({ ...user, username: e.target.value })}
				/>
				<label htmlFor="email" className="label label-text">
					Email
				</label>
				<input
					className="input input-bordered w-full max-w-x"
					type="text"
					name="email"
					id="email"
					placeholder="Email"
					value={user.email}
					onChange={(e) => setUser({ ...user, email: e.target.value })}
				/>
				<label htmlFor="password" className="label label-text">
					Password
				</label>
				<input
					className="input input-bordered w-full max-w-x"
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					value={user.password}
					onChange={(e) => setUser({ ...user, password: e.target.value })}
				/>
				<div className={"text-end mt-3"}>
					<Link href="/login" className="link">
						<small>* Login</small>
					</Link>
				</div>
				<button onClick={handleSignup} className="btn btn-outline btn-neutral mt-5" disabled={buttonDisabled}>
					Signup
				</button>
			</div>
		</>
	);
};

export default SignupPage;
