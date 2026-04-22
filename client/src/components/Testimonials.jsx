export default function Testimonials() {
  const reviews = [
    {
      name: "Simiya from English",
      text: "Fast delivery and smooth experience ",
    },
    {
      name: "Maisha",
      text: "Best online bookstore I’ve used so far!",
    },
    {
      name: "Oni",
      text: "Best online bookstore I’ve used so far!",
    },
    {
      name: "Bushra",
      text: "Best online bookstore I’ve used so far!",
    },
    {
      name: "Sukonna",
      text: "Best online bookstore I’ve used so far!",
    },
    {
      name: "Bristy",
      text: "My husband recommended this website and I love this",
    },
  ];

  return (
    <div className="bg-slate-950 text-white py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-indigo-400">
        What Our Users Say 💬
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-slate-900 p-6 rounded-xl border border-slate-800"
          >
            <p className="text-slate-300 mb-4">"{r.text}"</p>
            <h4 className="font-semibold text-indigo-400">
              - {r.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}