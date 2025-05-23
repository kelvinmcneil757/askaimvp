'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push('/tasks');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F7F9]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border border-[#E6DFD3] p-8 w-full max-w-md flex flex-col gap-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-[#3E2C18] tracking-tight mb-2">DavaAI</h1>
        <div className="text-center text-[#7C6F5A] mb-2">Sign in to your account</div>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <label className="flex flex-col gap-1">
          <span className="text-xs text-[#7C6F5A] font-semibold">Email</span>
          <input
            type="email"
            className="rounded-xl border border-[#E6DFD3] px-4 py-2 bg-[#F7F5EF] text-[#3E2C18] focus:ring-2 focus:ring-[#BFAE9F] transition-all shadow-sm"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-[#7C6F5A] font-semibold">Password</span>
          <input
            type="password"
            className="rounded-xl border border-[#E6DFD3] px-4 py-2 bg-[#F7F5EF] text-[#3E2C18] focus:ring-2 focus:ring-[#BFAE9F] transition-all shadow-sm"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="mt-2 px-6 py-2 rounded-xl bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] text-white font-bold shadow-lg hover:scale-105 hover:from-[#A08C7D] hover:to-[#BFAE9F] transition-all"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
} 