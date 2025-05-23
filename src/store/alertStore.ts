import { create } from 'zustand';

export type Alert = {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
};

type AlertStore = {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
};

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  addAlert: (alert) =>
    set((state) => ({
      alerts: [
        ...state.alerts,
        { ...alert, id: Math.random().toString(36).slice(2) },
      ],
    })),
  removeAlert: (id) =>
    set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) })),
  clearAlerts: () => set({ alerts: [] }),
})); 