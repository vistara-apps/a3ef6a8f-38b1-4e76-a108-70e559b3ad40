export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-text-primary">Loading ApexPredict</h2>
          <p className="text-text-secondary">Analyzing race data and telemetry...</p>
        </div>
      </div>
    </div>
  );
}
