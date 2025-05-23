'use client';

import { useState } from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

const integrations = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Connect your Gmail account to send, receive, and summarize emails with AI.',
    logo: '/gmail.svg',
    provider: 'google',
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync your calendar to manage and summarize events with AI assistance.',
    logo: '/google-calendar.svg',
    provider: 'google',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Integrate Slack to send, receive, and summarize messages and channels.',
    logo: '/slack.svg',
    provider: 'slack',
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Connect Zendesk to manage and summarize support tickets with AI.',
    logo: '/zendesk.svg',
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Integrate Salesforce to access CRM data and automate workflows.',
    logo: '/salesforce.svg',
  },
  {
    id: 'confluence',
    name: 'Confluence',
    description: 'Connect Confluence to search, summarize, and manage documentation.',
    logo: '/confluence.svg',
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Integrate Jira to manage, create, and summarize issues and sprints.',
    logo: '/jira.svg',
  },
];

export default function IntegrationsPage() {
  const { data: session } = useSession();
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  const handleConnect = (provider?: string, id?: string) => {
    if (provider) {
      signIn(provider);
    } else if (id) {
      setConnected((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const handleDisconnect = (provider?: string, id?: string) => {
    if (provider) {
      signOut();
    } else if (id) {
      setConnected((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
      {integrations.map((integration) => {
        const isOAuth = !!integration.provider;
        const isConnected = isOAuth
          ? session && session.provider === integration.provider
          : connected[integration.id];
        return (
          <div
            key={integration.id}
            className="flex flex-col items-center justify-between bg-white rounded-2xl shadow-lg border border-[#E6DFD3] p-8 min-h-[340px] transition-all hover:shadow-2xl group"
          >
            <div className="flex flex-col items-center gap-3 flex-1 w-full">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#F7F5EF] mb-2 shadow-sm">
                <Image src={integration.logo} alt={integration.name + ' logo'} width={40} height={40} />
              </div>
              <div className="font-bold text-lg text-[#3E2C18] text-center mb-1">{integration.name}</div>
              <div className="text-[#7C6F5A] text-sm text-center mb-2 min-h-[48px]">{integration.description}</div>
            </div>
            <div className="w-full flex flex-col items-center mt-4">
              {isOAuth && session && session.provider === integration.provider ? (
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="text-xs text-[#7C6F5A]">Connected as {session.user?.email}</div>
                  <button
                    onClick={() => handleDisconnect(integration.provider)}
                    className="w-32 py-2 rounded-full font-semibold text-sm bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 transition-all shadow-sm"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleConnect(integration.provider, integration.id)}
                  className={`w-32 py-2 rounded-full font-semibold text-sm transition-all shadow-sm border
                    ${isConnected
                      ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
                      : 'bg-[#F7F5EF] text-[#3E2C18] border-[#E6DFD3] hover:bg-[#E6DFD3]'}
                  `}
                >
                  {isConnected ? 'Connected' : 'Setup'}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
} 