'use client'

import { useDepartmentStore } from '@/store/departmentStore'
import { useState, useRef, useEffect } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

export default function AskPage() {
  const { selectedDepartment } = useDepartmentStore()
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hi! I'm your AI assistant for ${selectedDepartment.name}. How can I help you today?` },
  ])
  const [input, setInput] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((msgs) => [
      ...msgs,
      { role: 'user', text: input },
      { role: 'ai', text: `This is a mock AI response to: "${input}"` },
    ])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[80vh] max-h-[700px] bg-white/80 rounded-2xl shadow-xl border border-[#E6DFD3] mx-auto mt-8">
      {/* Chat history */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow
                ${msg.role === 'user'
                  ? 'bg-[#ECECEC] text-[#3E2C18] rounded-br-md'
                  : 'bg-[#F7F5EF] text-[#7C6F5A] rounded-bl-md'}
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      {/* Input bar */}
      <form
        className="flex items-center gap-2 p-4 border-t border-[#E6DFD3] bg-white rounded-b-2xl"
        onSubmit={e => { e.preventDefault(); handleSend(); }}
      >
        <textarea
          className="flex-1 resize-none rounded-xl border border-[#E6DFD3] bg-[#F7F5EF] px-4 py-3 text-[#3E2C18] focus:outline-none focus:ring-2 focus:ring-[#BFAE9F] shadow-sm text-base transition"
          placeholder={`Type your question for ${selectedDepartment.name}...`}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="p-3 rounded-xl bg-[#BFAE9F] hover:bg-[#3E2C18] transition text-white flex items-center justify-center shadow"
          aria-label="Send"
        >
          <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
        </button>
      </form>
    </div>
  )
} 