import { create } from 'zustand'

export type Department = {
  id: string
  name: string
  color: string
}

export const departments: Department[] = [
  { id: 'accounting', name: 'Accounting', color: '#4F46E5' }, // Indigo
  { id: 'hr', name: 'HR', color: '#EC4899' }, // Pink
  { id: 'customer-support', name: 'Customer Support', color: '#10B981' }, // Emerald
  { id: 'event-planning', name: 'Event Planning', color: '#F59E0B' }, // Amber
]

type DepartmentStore = {
  selectedDepartment: Department
  setSelectedDepartment: (department: Department) => void
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
  selectedDepartment: departments[0],
  setSelectedDepartment: (department) => set({ selectedDepartment: department }),
})) 