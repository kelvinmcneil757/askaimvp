import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DepartmentSelector } from '@/components/DepartmentSelector';
import SidebarNav from '@/components/SidebarNav';
import { Providers } from './providers';
import GlobalAlertBar from '@/components/GlobalAlertBar';
import { UserCircleIcon, BellIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import SignOutButton from '@/components/SignOutButton';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DavaAI",
  description: "AI Assistant for Enterprise",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Auth gating for all app pages except /signin
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }

  return (
    <html lang="en">
      <body className="bg-[#F6F7F9] min-h-screen font-sans">
        <Providers>
          <GlobalAlertBar />
          <div className="flex min-h-screen">
            {/* Sidebar - static in flex layout */}
            <SidebarNav />
            {/* Main content area */}
            <div className="flex-1 flex flex-col min-h-screen">
              {/* Top bar */}
              <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-[#ECECEC] shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-extrabold tracking-tight text-[#3E2C18]">DavaAI</span>
                  <nav className="flex items-center gap-2 text-sm text-[#7C6F5A]">
                    <span className="font-medium text-[#3E2C18]">Home</span>
                    <span className="mx-1">/</span>
                    <span className="text-[#BFAE9F]">Section</span>
                  </nav>
                </div>
                <div className="flex items-center gap-4">
                  <button className="relative p-2 rounded-full hover:bg-[#F6F7F9] transition">
                    <BellIcon className="w-6 h-6 text-[#BFAE9F]" />
                  </button>
                  <SignOutButton />
                </div>
              </header>
              <main className="flex-1 flex flex-col items-center px-8 py-10">
                <div className="w-full max-w-5xl">{children}</div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
