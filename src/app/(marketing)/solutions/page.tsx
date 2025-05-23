export default function SolutionsPage() {
  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-12 py-20 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#3E2C18] text-center mb-4">
        Solutions
      </h1>
      <p className="text-xl text-[#7C6F5A] max-w-2xl text-center mb-8">
        DavaAI offers tailored solutions for various industries and use cases. Whether you're in healthcare, finance, or manufacturing, our AI assistant can help streamline your workflows and boost productivity.
      </p>
      <div className="flex flex-col items-center gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6DFD3] w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-[#3E2C18] mb-4">Industry Solutions</h2>
          <p className="text-[#7C6F5A] mb-6">
            From automating routine tasks to providing instant insights, DavaAI is designed to meet the unique needs of your industry. Explore how our solutions can transform your business.
          </p>
          <a href="/book-demo" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] text-white font-bold shadow-lg hover:scale-105 hover:from-[#A08C7D] hover:to-[#BFAE9F] transition">Book a Demo</a>
        </div>
      </div>
    </section>
  );
} 