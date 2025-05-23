import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-[#F6F7F9] min-h-screen font-sans">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-[#ECECEC] shadow-sm">
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-2xl font-extrabold tracking-tight text-[#3E2C18]">DavaAI</Link>
              <div className="hidden md:flex items-center gap-4 text-[#7C6F5A] font-medium text-sm">
                <Link href="/product" className="hover:text-[#3E2C18] transition">Product</Link>
                <Link href="/solutions" className="hover:text-[#3E2C18] transition">Solutions</Link>
                <Link href="/pricing" className="hover:text-[#3E2C18] transition">Pricing</Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/signin" className="px-4 py-2 rounded-xl text-[#3E2C18] font-semibold hover:bg-[#ECECEC] transition">Sign In</Link>
              <Link href="/book-demo" className="px-4 py-2 rounded-xl bg-[#E6DFD3] text-[#3E2C18] font-semibold hover:bg-[#BFAE9F] transition">Book a Demo</Link>
              <Link href="/start" className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] text-white font-bold shadow-lg hover:scale-105 hover:from-[#A08C7D] hover:to-[#BFAE9F] transition">Start for Free</Link>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XMarkIcon className="w-6 h-6 text-[#3E2C18]" /> : <Bars3Icon className="w-6 h-6 text-[#3E2C18]" />}
            </button>
          </nav>
          {isMenuOpen && (
            <div className="md:hidden bg-white border-b border-[#ECECEC] shadow-sm">
              <div className="flex flex-col items-center gap-4 py-4">
                <Link href="/product" className="hover:text-[#3E2C18] transition">Product</Link>
                <Link href="/solutions" className="hover:text-[#3E2C18] transition">Solutions</Link>
                <Link href="/pricing" className="hover:text-[#3E2C18] transition">Pricing</Link>
              </div>
            </div>
          )}
        </header>
        <main className="min-h-[80vh] flex flex-col items-center justify-center px-4">
          {children}
        </main>
      </body>
    </html>
  );
} 