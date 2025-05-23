export default function MarketingHome() {
  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 py-20 animate-fade-in">
      {/* Left: Hero Text */}
      <div className="flex-1 flex flex-col gap-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#3E2C18] leading-tight mb-2">
          Meet <span className="bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] bg-clip-text text-transparent">DavaAI</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#7C6F5A] max-w-xl mb-4">
          The all-in-one AI assistant for modern teams. Automate tasks, get instant answers, and supercharge productivity with a beautiful, intuitive interface.
        </p>
        <div className="flex gap-4 mt-2">
          <a href="/start" className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] text-white font-bold text-lg shadow-lg hover:scale-105 hover:from-[#A08C7D] hover:to-[#BFAE9F] transition">Start for Free</a>
          <a href="/book-demo" className="px-8 py-4 rounded-xl bg-[#E6DFD3] text-[#3E2C18] font-semibold text-lg hover:bg-[#BFAE9F] transition">Book a Demo</a>
        </div>
      </div>
      {/* Right: Illustration */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[380px] h-[380px] rounded-3xl bg-gradient-to-br from-[#F7F5EF] to-[#E6DFD3] shadow-2xl flex items-center justify-center relative overflow-hidden">
          {/* Placeholder for illustration */}
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="110" cy="110" r="100" fill="#ECECEC" />
            <ellipse cx="110" cy="110" rx="80" ry="60" fill="#BFAE9F" fillOpacity="0.18" />
            <ellipse cx="110" cy="110" rx="60" ry="40" fill="#BFAE9F" fillOpacity="0.28" />
            <ellipse cx="110" cy="110" rx="40" ry="20" fill="#BFAE9F" fillOpacity="0.38" />
            <text x="50%" y="54%" textAnchor="middle" fill="#BFAE9F" fontSize="40" fontWeight="bold" dy=".3em">🤖</text>
          </svg>
        </div>
      </div>
    </section>
  );
} 