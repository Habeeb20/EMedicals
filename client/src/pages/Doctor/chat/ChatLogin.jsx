import axios from "axios";
import React, { useState } from "react";
import useLogin from "../../../components/Doctor/hooks/useLogin";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../../components/Navbar";

function ChatLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };


  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="border border-black px-6 py-2 rounded-md space-y-3 w-96"
        >
          <h1 className="text-2xl items-center text-blue-600 font-bold">
            E_Medicals
          </h1>
          <h2 className="text-2xl items-center">
            Login with your{" "}
            <span className="text-blue-600 font-semibold">Account</span>
          </h2>

          {/* Email */}
          <label className="input input-bordered flex items-center gap-2">
         
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
         

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">
           
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        

          {/* Submit Button with Spinner */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : null}
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <p>
            Don't have an Account?{" "}
            <Link
              to={"/chatsignup"}
              className="text-blue-500 underline cursor-pointer ml-1"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default ChatLogin;
