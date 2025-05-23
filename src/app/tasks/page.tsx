'use client';

import { useRef, useState } from 'react';

const agents = [
  { name: 'Researcher', icon: '🧑‍🔬', desc: 'Deep research and insights' },
  { name: 'Writer', icon: '✍️', desc: 'Drafts, summaries, and emails' },
  { name: 'Designer', icon: '🎨', desc: 'Generate images and slides' },
  { name: 'Analyst', icon: '📊', desc: 'Analyze data and docs' },
];

const reports = [
  { name: 'Q2 Sales Report', icon: '📈', date: '2024-06-01' },
  { name: 'Customer Feedback', icon: '📝', date: '2024-05-20' },
  { name: 'Market Analysis', icon: '🔍', date: '2024-05-10' },
];

const llms = [
  { id: 'openai', name: 'OpenAI', icon: 'openai' },
  { id: 'gemini', name: 'Gemini', icon: 'gemini' },
];

function LLMIcon({ type }: { type: string }) {
  if (type === 'openai') {
    return (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#10A37F"/><path d="M16 8l5.2 3v6l-5.2 3-5.2-3v-6z" fill="#fff"/></svg>
    );
  }
  if (type === 'gemini') {
    return (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#4285F4"/><path d="M16 8a8 8 0 100 16 8 8 0 000-16z" fill="#fff"/></svg>
    );
  }
  return null;
}

export default function DashboardPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [selectedLLM, setSelectedLLM] = useState(llms[0]);
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };
  const handlePrompt = (type: 'presentation' | 'design') => {
    setOutput(
      `Generated a ${type} using ${selectedLLM.name} as ${selectedAgent.name}:
${prompt}
[This is a mock result. Integrate with real LLM API for live output.]`
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
      {/* Upload Area */}
      <div className="col-span-1 bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-[#E6DFD3] hover:shadow-2xl transition-all">
        <h2 className="font-bold text-lg mb-2 flex items-center gap-2">📤 Upload Documents</h2>
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-[#BFAE9F] rounded-xl p-6 cursor-pointer hover:bg-[#F7F5EF] transition-all min-h-[120px]"
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <span className="text-[#BFAE9F] text-3xl mb-2">⬆️</span>
          <span className="text-[#3E2C18] text-sm">Drag & drop or click to upload</span>
        </div>
        {uploadedFiles.length > 0 && (
          <div className="mt-2 space-y-1">
            {uploadedFiles.map((file, i) => (
              <div key={i} className="text-xs text-[#3E2C18] bg-[#F7F5EF] rounded px-2 py-1 inline-block animate-pop-in">{file.name}</div>
            ))}
          </div>
        )}
      </div>

      {/* AI Agents & Reports */}
      <div className="col-span-1 flex flex-col gap-8">
        {/* AI Agents */}
        <div className="bg-white/80 rounded-2xl shadow-xl p-6 border border-[#E6DFD3] hover:shadow-2xl transition-all">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">🤖 AI Agents</h2>
          <div className="flex flex-wrap gap-3">
            {agents.map(agent => (
              <button
                key={agent.name}
                onClick={() => setSelectedAgent(agent)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all font-semibold text-[#3E2C18] border-2 min-w-[90px]
                  ${selectedAgent.name === agent.name ? 'bg-[#E6DFD3] border-[#BFAE9F] scale-105 shadow-lg z-10' : 'bg-[#F7F5EF] border-transparent hover:border-[#BFAE9F]'}
                `}
                style={{ boxShadow: selectedAgent.name === agent.name ? '0 4px 16px 0 #BFAE9F33' : undefined }}
              >
                <span className="text-2xl">{agent.icon}</span>
                <span className="text-xs">{agent.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 text-xs text-[#7C6F5A] italic">{selectedAgent.desc}</div>
        </div>
        {/* Reports */}
        <div className="bg-white/80 rounded-2xl shadow-xl p-6 border border-[#E6DFD3] hover:shadow-2xl transition-all">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">📑 Reports</h2>
          <div className="flex flex-col gap-2">
            {reports.map(report => (
              <div key={report.name} className="flex items-center gap-3 bg-[#F7F5EF] rounded-lg px-3 py-2 hover:bg-[#E6DFD3] transition-all animate-pop-in">
                <span className="text-xl">{report.icon}</span>
                <span className="font-medium">{report.name}</span>
                <span className="ml-auto text-xs text-[#7C6F5A]">{report.date}</span>
                <button className="ml-2 px-2 py-1 text-xs rounded bg-[#BFAE9F] text-white hover:bg-[#3E2C18] transition-all">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prompt & LLM Area */}
      <div className="col-span-1 bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-[#E6DFD3] hover:shadow-2xl transition-all">
        <h2 className="font-bold text-lg mb-2 flex items-center gap-2">✨ Create with AI</h2>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#7C6F5A] text-xs">LLM:</span>
          {llms.map(llm => (
            <button
              key={llm.id}
              onClick={() => setSelectedLLM(llm)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border-2 text-xs font-semibold transition-all
                ${selectedLLM.id === llm.id ? 'bg-[#E6DFD3] border-[#BFAE9F] scale-105' : 'bg-[#F7F5EF] border-transparent hover:border-[#BFAE9F]'}`}
            >
              <LLMIcon type={llm.icon} />
              {llm.name}
            </button>
          ))}
        </div>
        <textarea
          className="w-full rounded-xl border border-[#E6DFD3] p-4 focus:outline-none focus:ring-2 focus:ring-[#BFAE9F] text-[#3E2C18] bg-[#F7F5EF] transition-all"
          placeholder={`Describe what you want to create as ${selectedAgent.name}...`}
          rows={4}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            onClick={() => handlePrompt('presentation')}
            className="rounded-lg px-4 py-2 bg-[#BFAE9F] text-white font-semibold shadow hover:bg-[#3E2C18] transition-all"
          >
            Generate Presentation
          </button>
          <button
            onClick={() => handlePrompt('design')}
            className="rounded-lg px-4 py-2 bg-[#BFAE9F] text-white font-semibold shadow hover:bg-[#3E2C18] transition-all"
          >
            Generate Design
          </button>
        </div>
        {output && (
          <div className="mt-4 bg-[#F7F5EF] rounded-xl p-4 text-[#3E2C18] animate-fade-in border border-[#E6DFD3]">
            <pre className="whitespace-pre-wrap text-sm">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
} 