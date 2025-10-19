"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">500</h1>
        <p className="text-xl text-slate-300 mb-8">Something went wrong</p>
        <button
          onClick={reset}
          className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
