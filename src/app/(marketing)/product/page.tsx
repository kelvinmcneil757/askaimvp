export default function ProductPage() {
  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-12 py-20 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#3E2C18] text-center mb-4">
        Product
      </h1>
      <p className="text-xl text-[#7C6F5A] max-w-2xl text-center mb-8">
        DavaAI is your all-in-one AI assistant designed to streamline workflows, automate tasks, and provide instant answers. Our intuitive interface makes it easy for teams to collaborate and boost productivity.
      </p>
      <div className="flex flex-col items-center gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E6DFD3] w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-[#3E2C18] mb-4">Ask AI</h2>
          <p className="text-[#7C6F5A] mb-6">
            Get instant answers to your questions with our powerful Ask AI feature. Whether you need help with data analysis, task automation, or quick insights, DavaAI is here to assist you.
          </p>
          <a href="/start" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#BFAE9F] to-[#E6DFD3] text-white font-bold shadow-lg hover:scale-105 hover:from-[#A08C7D] hover:to-[#BFAE9F] transition">Try Ask AI Now</a>
        </div>
      </div>
    </section>
  );
} 