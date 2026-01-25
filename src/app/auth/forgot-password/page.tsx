"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log("Forgot password:", email);
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center pt-20 bg-zinc-950">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-700 bg-zinc-900 p-8 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </div>

        {!submitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-600 bg-zinc-800 px-3 py-2 text-white shadow-sm focus:border-blue-400 focus:outline-none focus:ring-blue-500"
                placeholder="you@example.com"
              />
              <p className="mt-2 text-sm text-gray-400">
                We&apos;ll send you a link to reset your password.
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send reset link
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-md bg-blue-900/20 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-300">
                  Check your email
                </h3>
                <div className="mt-2 text-sm text-blue-400">
                  <p>
                    We&apos;ve sent a password reset link to <strong>{email}</strong>.
                    Please check your inbox.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
