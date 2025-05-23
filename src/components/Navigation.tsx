'use client'

import { useDepartmentStore, departments } from '@/store/departmentStore'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigationTabs = [
  { name: 'Ask AI', href: '/ask' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'History', href: '/history' },
  { name: 'Admin', href: '/admin' },
]

export default function Navigation() {
  const { selectedDepartment, setSelectedDepartment } = useDepartmentStore()
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Department
          </h2>
          <div className="space-y-1">
            {departments.map((department) => (
              <button
                key={department.id}
                onClick={() => setSelectedDepartment(department)}
                className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors
                  ${
                    selectedDepartment.id === department.id
                      ? 'bg-opacity-10'
                      : 'hover:bg-gray-100'
                  }`}
                style={{
                  backgroundColor:
                    selectedDepartment.id === department.id
                      ? `${department.color}20`
                      : 'transparent',
                  color:
                    selectedDepartment.id === department.id
                      ? department.color
                      : 'inherit',
                }}
              >
                {department.name}
              </button>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
          <div className="space-y-1">
            {navigationTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`block rounded-lg px-4 py-2 text-sm font-medium transition-colors
                  ${
                    pathname === tab.href
                      ? 'bg-opacity-10'
                      : 'hover:bg-gray-100'
                  }`}
                style={{
                  backgroundColor:
                    pathname === tab.href
                      ? `${selectedDepartment.color}20`
                      : 'transparent',
                  color:
                    pathname === tab.href
                      ? selectedDepartment.color
                      : 'inherit',
                }}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 