export default function PricingPage() {
  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-12 py-20 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#3E2C18] text-center mb-4">
        Pricing
      </h1>
      <p className="text-xl text-[#7C6F5A] max-w-2xl text-center mb-8">
        Choose the perfect plan for your team. DavaAI offers flexible pricing options to suit your needs, from a free tier to enterprise solutions.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6DFD3] w-full max-w-xs">
          <h2 className="text-2xl font-bold text-[#3E2C18] mb-4">Free</h2>
          <p className="text-[#7C6F5A] mb-6">
            Get started with DavaAI for free. Basic features to help you explore the power of AI.
          </p>
          <a href="/start" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] text-white font-bold shadow-lg hover:scale-105 hover:from-[#A08C7D] hover:to-[#BFAE9F] transition">Start for Free</a>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6DFD3] w-full max-w-xs">
          <h2 className="text-2xl font-bold text-[#3E2C18] mb-4">Pro</h2>
          <p className="text-[#7C6F5A] mb-6">
            Unlock advanced features and integrations with our Pro plan. Perfect for growing teams.
          </p>
          <a href="/book-demo" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] text-white font-bold shadow-lg hover:scale-105 hover:from-[#A08C7D] hover:to-[#BFAE9F] transition">Book a Demo</a>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6DFD3] w-full max-w-xs">
          <h2 className="text-2xl font-bold text-[#3E2C18] mb-4">Enterprise</h2>
          <p className="text-[#7C6F5A] mb-6">
            Custom solutions for large organizations. Contact us for a tailored plan.
          </p>
          <a href="/book-demo" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] text-white font-bold shadow-lg hover:scale-105 hover:from-[#A08C7D] hover:to-[#BFAE9F] transition">Contact Us</a>
        </div>
      </div>
    </section>
  );
} 