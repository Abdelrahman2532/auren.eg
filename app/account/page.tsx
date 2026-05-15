import Link from "next/link";

export default function AccountHome() {
  return (
    <main className="min-h-screen bg-[#1a120e] text-[#f5ede3] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#221814] p-10 rounded-3xl text-center">

        <h1 className="text-4xl mb-12 tracking-[0.2em]">
          AUREN
        </h1>

        <div className="space-y-5">

          <Link
            href="/account/login"
            className="block w-full bg-[#f5ede3] text-black py-4 rounded-xl font-semibold"
          >
            Login
          </Link>

          <Link
            href="/account/signup"
            className="block w-full border border-[#f5ede3] py-4 rounded-xl"
          >
            Create Account
          </Link>

        </div>

      </div>

    </main>
  );
}