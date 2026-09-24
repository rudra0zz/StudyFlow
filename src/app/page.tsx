import Link from "next/link";

const features = [
  {
    title: "Organize",
    description: "Keep your subjects and tasks structured in one place."
  },
  {
    title: "Focus",
    description: "Know exactly what needs your attention today."
  },
  {
    title: "Progress",
    description: "Track your consistency and see how far you've come."
  },
];

export default function HomePage() {
  return (
    <div>
      <header className="flex items-center justify-between px-4 md:px-8 py-5 bg-gray-200 rounded-2xl">

        <div>
          <Link href="/" className="font-bold text-2xl">
            StudyFlow
          </Link>
        </div>

        <div className="flex gap-4">
          <Link href="/signup" className="hover:underline transition-all">
            SignUp
          </Link>

          <Link href="/login" className="hover:underline transition-all">
            Login
          </Link>
        </div>

      </header>

      <section className="flex flex-col items-center gap-8 mt-8">

        <div className="font-serif text-gray-600">
          Your study workflow, simplified.
        </div>

        <h1 className="font-bold text-3xl md:text-5xl w-full md:w-170 text-center">
          Turn your academic workload
          into a study flow.
        </h1>

        <div className="w-full px-6 md:w-96 md:px-0 font-semibold text-lg text-gray-900 text-center">
          Organize your subjects, focus on today&apos;s work,
          and track your progress over time.
        </div>

        <Link href="/signup" className="text-white bg-black px-3 py-2 border-2 border-black rounded-xl hover:text-black hover:bg-white transition">
          Get Started
        </Link>

      </section>

      <section className="mt-15">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
          {features.map((feature) => (

            <div key={feature.title} className="h-50 bg-gray-300 rounded-2xl hover:shadow-xl hover:bg-gray-200 transition-all">

              <h3 className="font-semibold text-xl px-3 py-5 hover:underline w-fit">
                {feature.title}
              </h3>

              <p className="text-gray-800 w-full px-5">
                {feature.description}
              </p>

            </div>

          ))}
        </div>
      </section>
    </div>
  );
}