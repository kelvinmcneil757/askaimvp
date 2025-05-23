'use client';

import { signOut } from 'next-auth/react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function SignOutButton() {
  return (
    <button
      className="w-9 h-9 rounded-full bg-[#E6DFD3] flex items-center justify-center hover:bg-[#BFAE9F] transition"
      onClick={() => signOut({ callbackUrl: '/signin' })}
      title="Sign out"
    >
      <ArrowRightOnRectangleIcon className="w-7 h-7 text-[#BFAE9F]" />
    </button>
  );
} 