'use client';

import { useAlertStore } from '@/store/alertStore';

export default function GlobalAlertBar() {
  const { alerts, removeAlert } = useAlertStore();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col items-center gap-2 p-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`px-4 py-2 rounded shadow-lg flex items-center gap-3 animate-pop-in
            ${alert.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : ''}
            ${alert.type === 'error' ? 'bg-red-100 text-red-800 border border-red-300' : ''}
            ${alert.type === 'info' ? 'bg-[#E6DFD3] text-[#3E2C18] border border-[#BFAE9F]' : ''}
          `}
        >
          <span className="font-medium">{alert.message}</span>
          <button
            className="ml-2 text-xs px-2 py-1 rounded bg-white/50 hover:bg-white/80 border border-gray-200"
            onClick={() => removeAlert(alert.id)}
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
} 