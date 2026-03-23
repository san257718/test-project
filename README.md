# React + Vite

這是一個使用 React 搭配 Zustand 進行狀態管理，並使用 Zod 進行嚴謹表單驗證的線上報名系統。

🚀 技術棧 (Tech Stack)

Frontend Framework: React

State Management: Zustand (自定義 Hook useStore.jsx)

Validation: Zod (Schema-based validation)

Styling: Tailwind CSS

Icons/Assets: 自定義圖片按鈕與選單圖標

✨ 核心功能與修正重點

1. 智慧型連動驗證 (Smart Conditional Validation)

專案使用了 Zod 的 .superRefine 邏輯，解決了跨欄位依賴的驗證問題：

產業類別：當 industry 選項為「其它」(ID: "5") 時，industryName 欄位轉為必填。

飲食習慣：當 dietary_habits 選項為「其他」(ID: 3) 時，dietary_habits_name 欄位轉為必填。

動態錯誤清除：當使用者從「其他」切換回「葷食/素食」時，系統會自動清除相關錯誤訊息並重設該文字欄位。

2. 進階 UI 交互

自定義 Checkbox/Radio：使用 Tailwind accent-[#9C0053] 統一品牌色系。

Hover 圖片按鈕：利用 Tailwind 的 group-hover 實作按鈕切換效果，無需額外的 React State。

自定義 Select 下拉選單：手動實作下拉選單以符合設計稿需求，並整合選中狀態的視覺回饋。

📂 檔案架構

index.jsx: 主頁面邏輯、Zod Schema 定義與表單 UI。

useStore.jsx: Zustand 全域狀態定義與 Action 邏輯。

public/: 存放所有按鈕與背景圖片。

schemas/: 存放 Zod Schema 定義。