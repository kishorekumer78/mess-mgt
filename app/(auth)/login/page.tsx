"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const handleLogin = async () => {
    try {
      setLoading(true);
      await axios.post("/api/login", user);
      // console.log(res);

      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col p-5 w-1/4 mx-auto border border-neutral rounded-lg mt-[90px]">
      <h1 className="text-center text-lg font-bold my-3">
        {loading ? "Processing" : "Login"}
      </h1>

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
        <Link href="/signup" className="link">
          <small>* Signup</small>
        </Link>
      </div>
      <button
        onClick={handleLogin}
        className="btn btn-outline btn-neutral mt-5"
        disabled={buttonDisabled}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
