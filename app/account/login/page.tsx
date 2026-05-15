'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AccountPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 

  async function signIn() {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert('Logged in successfully');
  }

  return (
    <main className="min-h-screen bg-[#1a120e] text-[#f5ede3] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#221814] p-8 rounded-3xl">

        <h1 className="text-4xl mb-10 text-center tracking-[0.2em]">
          AUREN
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
            onClick={signIn}
            className="w-full border border-[#f5ede3] py-4 rounded-xl"
          >
            Login
          </button>

        </div>

      </div>

    </main>
  );
}