'use client';

import { useState } from 'react';
import { useAlertStore } from '@/store/alertStore';

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
}

export default function AdminPage() {
  // Profile state
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    email: 'jane@example.com',
    subscription: 'Pro',
  });
  const [saving, setSaving] = useState(false);

  // Team invite state
  const [inviteEmail, setInviteEmail] = useState('');
  const [pendingInvites, setPendingInvites] = useState<string[]>([]);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const { addAlert } = useAlertStore();

  const handleProfileSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      addAlert({ message: 'Profile updated successfully!', type: 'success' });
    }, 1000);
  };

  const handleSendInvite = () => {
    if (!inviteEmail) return;
    setPendingInvites((prev) => [...prev, inviteEmail]);
    setInviteEmail('');
    setInviteSuccess(true);
    addAlert({ message: `Invitation sent to ${inviteEmail}`, type: 'info' });
    setTimeout(() => setInviteSuccess(false), 1200);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-12 animate-fade-in">
      {/* Profile Section */}
      <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-[#E6DFD3] transition-all group hover:shadow-[0_8px_32px_0_rgba(191,174,159,0.25)]">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#BFAE9F] to-[#E6DFD3] flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-white">
            {profile.name.split(' ').map(n => n[0]).join('').toUpperCase() || '👤'}
          </div>
        </div>
        <h2 className="font-extrabold text-2xl mb-8 text-center tracking-tight bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] bg-clip-text text-transparent">Profile</h2>
        <div className="flex flex-col gap-6 mt-8">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[#7C6F5A] font-semibold">Name</span>
            <input
              className="rounded-xl border border-[#E6DFD3] px-4 py-2 bg-[#F7F5EF]/80 text-[#3E2C18] focus:ring-2 focus:ring-[#BFAE9F] transition-all shadow-sm"
              value={profile.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[#7C6F5A] font-semibold">Email</span>
            <input
              className="rounded-xl border border-[#E6DFD3] px-4 py-2 bg-[#F7F5EF]/80 text-[#3E2C18] focus:ring-2 focus:ring-[#BFAE9F] transition-all shadow-sm"
              value={profile.email}
              onChange={e => setProfile({ ...profile, email: e.target.value })}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-[#7C6F5A] font-semibold">Subscription/License</span>
            <select
              className="rounded-xl border border-[#E6DFD3] px-4 py-2 bg-[#F7F5EF]/80 text-[#3E2C18] focus:ring-2 focus:ring-[#BFAE9F] transition-all shadow-sm"
              value={profile.subscription}
              onChange={e => setProfile({ ...profile, subscription: e.target.value })}
            >
              <option>Free</option>
              <option>Pro</option>
              <option>Enterprise</option>
            </select>
          </label>
          <button
            className="mt-2 px-6 py-2 rounded-xl bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] text-white font-bold shadow-lg hover:scale-105 hover:from-[#A08C7D] hover:to-[#BFAE9F] transition-all w-fit self-end"
            onClick={handleProfileSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Team Invitation Section */}
      <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-[#E6DFD3] transition-all group hover:shadow-[0_8px_32px_0_rgba(191,174,159,0.25)]">
        <h2 className="font-extrabold text-2xl mb-6 text-center tracking-tight bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] bg-clip-text text-transparent">Team Invitations</h2>
        <div className="flex gap-2 mb-6">
          <input
            className="rounded-xl border border-[#E6DFD3] px-4 py-2 bg-[#F7F5EF]/80 text-[#3E2C18] flex-1 focus:ring-2 focus:ring-[#BFAE9F] transition-all shadow-sm"
            placeholder="Enter email address"
            value={inviteEmail}
            onChange={e => setInviteEmail(e.target.value)}
            type="email"
          />
          <button
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] text-white font-bold shadow-lg hover:scale-105 hover:from-[#A08C7D] hover:to-[#BFAE9F] transition-all"
            onClick={handleSendInvite}
          >
            Send Invite
          </button>
        </div>
        {inviteSuccess && (
          <div className="absolute right-8 top-8 animate-pop-in">
            <span className="inline-block text-2xl text-green-600">✔️</span>
          </div>
        )}
        {pendingInvites.length > 0 && (
          <div className="mt-2">
            <div className="text-xs text-[#7C6F5A] mb-1 font-semibold">Pending Invitations:</div>
            <ul className="list-disc pl-5">
              {pendingInvites.map((email, i) => (
                <li key={i} className="text-[#3E2C18] text-sm animate-fade-in animate-delay-100" style={{ animationDelay: `${i * 80}ms` }}>{email}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 