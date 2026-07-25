import Link from "next/link";
import { ArrowRight, Activity, Shield, Zap, TrendingUp } from "lucide-react";

// 模擬從資料庫抓取的對決資料 (未來會替換成 Prisma 抓取真實數據)
const mockDisputes = [
  {
    id: "cm01",
    title: "以太坊在 2026 年底前會突破 $10,000 嗎？",
    poolVolume: "12.5 ETH",
    status: "ACTIVE",
    participants: 142,
    aiConfidence: "87%",
  },
  {
    id: "cm02",
    title: "AI 算力霸主之爭：NVIDIA 市值是否能在 Q3 擊敗對手？",
    poolVolume: "50.2 ETH",
    status: "ACTIVE",
    participants: 531,
    aiConfidence: "92%",
  },
  {
    id: "cm03",
    title: "本次駭客松冠軍是否會由 NTU 團隊拿下？",
    poolVolume: "3.1 ETH",
    status: "PENDING",
    participants: 28,
    aiConfidence: "--",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0E1117] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* 頂部導覽列 */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0E1117]/80 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            AI Judge Protocol
          </span>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Markets
          </button>
          <button className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-full transition-all shadow-lg shadow-blue-600/20">
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* 英雄區塊 (Hero Section) */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col items-start gap-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium">
            <Zap className="w-4 h-4" />
            <span>Powered by Smart Contracts & AI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-tight">
            Trustless Resolution. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Zero Human Bias.
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            透過區塊鏈智能合約鎖定資金，並由先進 AI 邏輯模型進行最終裁決。在這裡，邏輯與數據決定一切，拒絕任何和稀泥的中心化判決。
          </p>
          <div className="flex gap-4 mt-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#0E1117] font-bold rounded-xl hover:bg-slate-200 transition-colors">
              發起對決 <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition-colors border border-slate-700">
              了解結算邏輯
            </button>
          </div>
        </div>

        {/* 活躍市場區塊 (Polymarket Style Cards) */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            Trending Disputes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDisputes.map((dispute) => (
            <Link href={`/duel/${dispute.id}`} key={dispute.id}>
              <div className="group flex flex-col justify-between p-6 bg-[#1A1D24] rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-[#1E222A] transition-all h-full cursor-pointer overflow-hidden relative">
                
                {/* 卡片發光特效 */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                        dispute.status === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {dispute.status}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <Activity className="w-4 h-4" /> {dispute.participants} 參與
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-4 line-clamp-3 group-hover:text-blue-400 transition-colors">
                    {dispute.title}
                  </h3>
                </div>

                <div className="flex items-end justify-between pt-4 border-t border-slate-800/50 mt-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Pool Volume</p>
                    <p className="text-xl font-mono font-bold text-white">
                      {dispute.poolVolume}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 mb-1">AI Confidence</p>
                    <p className="text-lg font-mono font-semibold text-blue-400">
                      {dispute.aiConfidence}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}