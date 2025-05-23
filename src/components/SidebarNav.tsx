'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DepartmentSelector } from '@/components/DepartmentSelector';
import { MagnifyingGlassIcon, SparklesIcon, StarIcon, FolderIcon, ChartBarIcon, UsersIcon, Cog6ToothIcon, ClockIcon, LinkIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { name: 'Ask AI', href: '/ask', icon: <SparklesIcon className="w-5 h-5 text-[#BFAE9F]" /> },
  { name: 'Tasks', href: '/tasks', icon: <ChartBarIcon className="w-5 h-5 text-[#BFAE9F]" /> },
  { name: 'History', href: '/history', icon: <ClockIcon className="w-5 h-5 text-[#BFAE9F]" /> },
  { name: 'Admin', href: '/admin', icon: <Cog6ToothIcon className="w-5 h-5 text-[#BFAE9F]" /> },
  { name: 'Integrations', href: '/integrations', icon: <LinkIcon className="w-5 h-5 text-[#BFAE9F]" /> },
];

const favorites = [
  { name: 'KPIs and metrics', icon: <StarIcon className="w-4 h-4 text-[#BFAE9F]" /> },
  { name: 'Introduction', icon: <StarIcon className="w-4 h-4 text-[#BFAE9F]" /> },
  { name: 'My goals', icon: <StarIcon className="w-4 h-4 text-[#BFAE9F]" /> },
];

const channels = [
  { name: 'Company Wiki', icon: <FolderIcon className="w-4 h-4 text-[#BFAE9F]" /> },
  { name: 'Mission & Values', icon: <FolderIcon className="w-4 h-4 text-[#BFAE9F]" /> },
  { name: 'Strategy', icon: <FolderIcon className="w-4 h-4 text-[#BFAE9F]" /> },
  { name: 'Employees', icon: <UsersIcon className="w-4 h-4 text-[#BFAE9F]" /> },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <aside
      className="h-[92vh] w-72 flex flex-col bg-[#F6F7F9] rounded-2xl shadow-xl border border-[#ECECEC] p-4"
    >
      {/* DavaAI Brand */}
      <div className="flex items-center justify-center mb-6">
        <span className="text-2xl font-extrabold tracking-tight text-[#3E2C18]">DavaAI</span>
      </div>
      {/* Search and Ask */}
      <div className="flex items-center gap-2 mb-4 px-1">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-2.5 text-[#BFAE9F]" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-[#ECECEC] text-sm focus:outline-none focus:ring-2 focus:ring-[#BFAE9F] transition"
          />
        </div>
        <button className="ml-1 px-3 py-2 rounded-lg bg-white border border-[#ECECEC] text-[#BFAE9F] font-semibold text-sm flex items-center gap-1 hover:bg-[#ECECEC] transition">
          <SparklesIcon className="w-4 h-4" />
          Ask
        </button>
      </div>
      {/* Departments */}
      <div className="mb-2">
        <div className="uppercase text-xs text-[#BFAE9F] font-bold tracking-wider mb-1 px-2">Departments</div>
        <DepartmentSelector />
      </div>
      {/* Main nav links - moved up */}
      <div className="mt-2">
        <ul className="flex flex-col gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${pathname.startsWith(link.href)
                    ? 'bg-[#ECECEC] text-[#3E2C18] font-bold shadow-sm'
                    : 'text-[#3E2C18] hover:bg-white'}
                `}
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
} 