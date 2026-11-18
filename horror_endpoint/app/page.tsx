import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-slate-950 p-6 text-white">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold">x402 Horror Story API</h1>
        <p className="mb-8 text-xl text-slate-400">
          A paid API endpoint powered by x402 payment protocol on Base mainnet
        </p>
        <Link
          href="/horror-story"
          className="inline-block rounded-lg bg-red-600 px-8 py-3 font-semibold hover:bg-red-700 transition-colors"
        >
          Access Horror Stories
        </Link>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <div className="rounded-lg border border-red-900 bg-slate-900 p-6">
          <h2 className="mb-2 font-bold text-red-500">API Endpoint</h2>
          <code className="text-sm text-slate-300">/api/horror-story</code>
        </div>
        <div className="rounded-lg border border-red-900 bg-slate-900 p-6">
          <h2 className="mb-2 font-bold text-red-500">Payment</h2>
          <p className="text-sm text-slate-300">$0.25 USDC on Base mainnet</p>
        </div>
        <div className="rounded-lg border border-red-900 bg-slate-900 p-6">
          <h2 className="mb-2 font-bold text-red-500">Builder Code</h2>
          <p className="text-sm text-slate-300">ERC-8021 attribution enabled</p>
        </div>
      </div>
    </main>
  )
}
