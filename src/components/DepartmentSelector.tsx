'use client';

import { useDepartmentStore, departments as departmentList } from '@/store/departmentStore';

export function DepartmentSelector() {
  const { selectedDepartment, setSelectedDepartment } = useDepartmentStore();

  return (
    <div className="flex flex-wrap gap-2 mt-2 mb-4">
      {departmentList.map((dept) => {
        const isSelected = selectedDepartment.id === dept.id;
        return (
          <button
            key={dept.id}
            onClick={() => setSelectedDepartment(dept)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm focus:outline-none
              ${isSelected
                ? 'bg-transparent border-2'
                : 'bg-white/10 hover:bg-[#E6DFD3] text-[#3E2C18] border border-[#E6DFD3]'}
            `}
            style={isSelected ? {
              borderColor: dept.color,
              color: dept.color,
              background: 'transparent',
            } : {}}
            aria-pressed={isSelected}
          >
            {dept.name}
          </button>
        );
      })}
    </div>
  );
} 