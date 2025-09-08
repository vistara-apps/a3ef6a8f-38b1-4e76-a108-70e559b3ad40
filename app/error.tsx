'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-f1-red rounded-full flex items-center justify-center mx-auto">
          <span className="text-white text-2xl">⚠</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text-primary">
            Something went wrong!
          </h2>
          <p className="text-text-secondary">
            We encountered an error while loading the F1 prediction data.
          </p>
        </div>
        <button
          onClick={reset}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
