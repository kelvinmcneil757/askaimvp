"use client";

import { useState } from "react";
import { PlusIcon, ChevronDownIcon, ChevronRightIcon, PencilIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Demo data
const initialProjects = [
  {
    id: 1,
    name: "Project A",
    description: "Marketing automation workflows.",
    expanded: true,
    folders: [
      {
        id: 11,
        name: "Topic 1",
        threads: [
          { id: 111, title: "How do I improve X?", aiAnswer: "Try optimizing your workflow by..." },
        ],
      },
      {
        id: 12,
        name: "Topic 2",
        threads: [
          { id: 121, title: "What are best practices for Y?", aiAnswer: "Best practices include..." },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Project B",
    description: "Customer support knowledge base.",
    expanded: false,
    folders: [
      {
        id: 21,
        name: "FAQ",
        threads: [
          { id: 211, title: "How to reset password?", aiAnswer: "Go to settings and..." },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Project C",
    description: "Event planning resources.",
    expanded: false,
    folders: [],
  },
];

export default function TasksPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [selectedThread, setSelectedThread] = useState(projects[0].folders[0]?.threads[0] || null);
  const [editingName, setEditingName] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [search, setSearch] = useState("");

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  // Sidebar handlers
  const handleToggleProject = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, expanded: !p.expanded } : p
      )
    );
  };
  const handleSelectThread = (projectId, thread) => {
    setSelectedProjectId(projectId);
    setSelectedThread(thread);
  };
  const handleNewProject = () => {
    const newId = Math.max(...projects.map((p) => p.id)) + 1;
    setProjects([
      ...projects,
      {
        id: newId,
        name: `Untitled Project ${newId}`,
        description: "",
        expanded: true,
        folders: [],
      },
    ]);
    setSelectedProjectId(newId);
    setEditingName(true);
  };
  const handleRenameProject = (name) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProjectId ? { ...p, name } : p
      )
    );
    setEditingName(false);
  };
  const handleEditDesc = (desc) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProjectId ? { ...p, description: desc } : p
      )
    );
    setEditingDesc(false);
  };

  // Search threads across all projects
  const allThreads = projects.flatMap((p) =>
    p.folders.flatMap((f) =>
      f.threads.map((t) => ({ ...t, project: p.name, folder: f.name }))
    )
  );
  const filteredThreads = search
    ? allThreads.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.aiAnswer.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col md:flex-row h-[80vh] bg-white/80 rounded-2xl shadow-xl border border-[#E6DFD3] mx-auto mt-8 overflow-hidden animate-fade-in">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#F6F7F9] border-r border-[#ECECEC] flex flex-col p-4 gap-4 min-h-0">
        <button
          className="flex items-center gap-2 px-4 py-2 mb-2 rounded-lg bg-[#E6DFD3] text-[#3E2C18] font-bold shadow hover:bg-[#BFAE9F] transition text-base"
          onClick={handleNewProject}
        >
          <PlusIcon className="w-5 h-5" /> New Project
        </button>
        <nav className="flex-1 overflow-y-auto pr-2">
          {projects.map((project) => (
            <div key={project.id} className="mb-2">
              <button
                className={`flex items-center w-full px-2 py-2 rounded-lg text-left font-semibold text-[#3E2C18] hover:bg-[#ECECEC] transition ${selectedProjectId === project.id ? 'bg-[#ECECEC]' : ''}`}
                onClick={() => setSelectedProjectId(project.id)}
              >
                {project.expanded ? (
                  <ChevronDownIcon className="w-4 h-4 mr-1" onClick={e => { e.stopPropagation(); handleToggleProject(project.id); }} />
                ) : (
                  <ChevronRightIcon className="w-4 h-4 mr-1" onClick={e => { e.stopPropagation(); handleToggleProject(project.id); }} />
                )}
                <span className="truncate flex-1">{project.name}</span>
              </button>
              {project.expanded && project.folders.length > 0 && (
                <ul className="ml-6 mt-1">
                  {project.folders.map((folder) => (
                    <li key={folder.id} className="mb-1">
                      <div className="text-xs text-[#BFAE9F] font-bold mb-1">{folder.name}</div>
                      <ul>
                        {folder.threads.map((thread) => (
                          <li key={thread.id}>
                            <button
                              className={`block w-full text-left px-2 py-1 rounded-lg text-sm hover:bg-[#ECECEC] transition ${selectedThread?.id === thread.id ? 'bg-[#ECECEC] font-bold' : ''}`}
                              onClick={() => handleSelectThread(project.id, thread)}
                            >
                              {thread.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>
      {/* Main Panel */}
      <main className="flex-1 flex flex-col p-8 gap-6 min-w-0">
        {/* Project Name & Description */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          {editingName ? (
            <input
              className="text-2xl font-extrabold tracking-tight text-[#3E2C18] bg-transparent border-b-2 border-[#E6DFD3] focus:border-[#BFAE9F] outline-none rounded px-2 py-1"
              value={selectedProject.name}
              onChange={e => handleRenameProject(e.target.value)}
              onBlur={() => setEditingName(false)}
              autoFocus
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-[#3E2C18]">{selectedProject.name}</span>
              <button onClick={() => setEditingName(true)} className="p-1 rounded hover:bg-[#ECECEC]">
                <PencilIcon className="w-5 h-5 text-[#BFAE9F]" />
              </button>
            </div>
          )}
          {editingDesc ? (
            <input
              className="text-base font-medium text-[#7C6F5A] bg-transparent border-b-2 border-[#E6DFD3] focus:border-[#BFAE9F] outline-none rounded px-2 py-1 flex-1"
              value={selectedProject.description}
              onChange={e => handleEditDesc(e.target.value)}
              onBlur={() => setEditingDesc(false)}
              autoFocus
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-base font-medium text-[#7C6F5A]">{selectedProject.description}</span>
              <button onClick={() => setEditingDesc(true)} className="p-1 rounded hover:bg-[#ECECEC]">
                <PencilIcon className="w-4 h-4 text-[#BFAE9F]" />
              </button>
            </div>
          )}
        </div>
        {/* Thread Overview */}
        {selectedThread && (
          <div className="bg-[#F7F5EF] rounded-2xl shadow p-6 mb-4">
            <div className="font-bold text-lg mb-2">Thread: "{selectedThread.title}"</div>
            <div className="text-[#7C6F5A] text-base">• {selectedThread.aiAnswer}</div>
          </div>
        )}
        {/* Search Bar */}
        <div className="relative mb-2 max-w-md">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-[#BFAE9F]" />
          <input
            type="text"
            placeholder="Search threads across all projects..."
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white border border-[#ECECEC] text-sm focus:outline-none focus:ring-2 focus:ring-[#BFAE9F] transition"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {/* Search Results */}
        {search && (
          <div className="bg-white rounded-xl shadow p-4">
            <div className="font-semibold mb-2 text-[#3E2C18]">Threads matching "{search}"</div>
            <ul className="divide-y divide-[#ECECEC]">
              {filteredThreads.length === 0 && <li className="py-2 text-[#BFAE9F]">No threads found.</li>}
              {filteredThreads.map((t) => (
                <li key={t.id} className="py-2">
                  <div className="font-bold text-[#3E2C18]">{t.title}</div>
                  <div className="text-xs text-[#7C6F5A] mb-1">{t.project} / {t.folder}</div>
                  <div className="text-[#7C6F5A]">• {t.aiAnswer}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
} 