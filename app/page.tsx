"use client";

import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState("");

  const handleCreateDuel = async () => {
    if (!title) return alert("請輸入決鬥主題！");
    setIsLoading(true);

    try {
      // 呼叫我們剛剛在後端寫好的 API
      const res = await fetch("/api/disputes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          partyAId: "user_test_001", // 暫時寫死一個發起人 ID，未來會換成真實登入帳號
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // 成功後，在畫面上產生專屬邀請連結
        setLink(`${window.location.origin}/duel/${data.dispute.id}`);
      } else {
        alert("發生錯誤: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("網路錯誤，請檢查伺服器狀態！");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
          ⚡ 發起邏輯對決
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              爭議主題 (Proposition)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：RSA 加密在未來十年內是否會被破解？"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
            />
          </div>

          <button
            onClick={handleCreateDuel}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? "正在生成擂台並寫入資料庫..." : "建立擂台並產生連結"}
          </button>

          {link && (
            <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-green-500/30">
              <p className="text-sm text-green-400 mb-2 font-semibold">✅ 建立成功！把連結丟給對手：</p>
              <input
                type="text"
                readOnly
                value={link}
                className="w-full px-3 py-2 bg-gray-900 text-gray-300 rounded border border-gray-600 text-sm cursor-pointer"
                onClick={(e) => {
                  (e.target as HTMLInputElement).select();
                  navigator.clipboard.writeText(link);
                }}
                title="點擊即可複製"
              />
              <p className="text-xs text-gray-400 mt-2">*(點擊連結框即可複製)*</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}