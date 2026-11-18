// Halaman utama sementara (placeholder) untuk mengecek Fase 0.
// Isinya akan diganti total di Fase 0 (Hero, About, Skills).
export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-4 px-6 py-24">
      {/* label kecil di atas judul */}
      <p className="text-sm font-medium uppercase tracking-widest text-sky-600">
        Portfolio - Work in progress
      </p>

      {/* Judul utama halaman */}
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Hi, I&apos;m Rohid.
      </h1>

      {/* Kalimat pembuka singkat untuk pembaca non-teknis */}
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        I turn raw data into pipelines, dashboards, and AI tools.
      </p>
      </main>
  );
}