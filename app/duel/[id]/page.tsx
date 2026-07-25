export default function DuelArena({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-400">⚔️ 邏輯擂台 ⚔️</h1>
        
        <div className="mb-8">
          <p className="text-gray-400 text-sm">房間 ID</p>
          <p className="text-gray-500 font-mono text-xs">{params.id}</p>
        </div>

        <div className="bg-gray-700 p-8 rounded-lg mb-8 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <h2 className="text-2xl text-blue-300 mb-2 font-bold animate-pulse">
            等待對手加入中...
          </h2>
          <p className="text-gray-400">
            當對手進入此連結並押注資金後，這場決鬥即刻展開。
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button className="bg-gray-600 cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg">
            對手尚未就緒
          </button>
        </div>
      </div>
    </main>
  );
}