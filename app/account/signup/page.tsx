'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signUp() {

   
const { data, error } =
  await supabase.auth.signUp({
    email,
    password,
  });

if (error) {
  alert(error.message);
  return;
}

await supabase
  .from("profiles")
  .insert([
    {
      id: data.user?.id,
      email,
      role: "user",
    },
  ]);

alert("Account created");


  }

  return (
    <main className="min-h-screen bg-[#1a120e] text-[#f5ede3] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#221814] p-8 rounded-3xl">

        <h1 className="text-4xl mb-10 text-center tracking-[0.2em]">
          CREATE ACCOUNT
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-transparent border border-[#4b362c] px-5 py-4 rounded-xl outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-transparent border border-[#4b362c] px-5 py-4 rounded-xl outline-none"
          />

          <button
            onClick={signUp}
            className="w-full bg-[#f5ede3] text-black py-4 rounded-xl font-semibold"
          >
            Create Account
          </button>

        </div>

      </div>

    </main>
  );
}