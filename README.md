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

2. 進階 UI 交互

  自定義 Checkbox/Radio：使用 Tailwind accent-[#9C0053] 統一品牌色系。
  
  Hover 圖片按鈕：利用 Tailwind 的 group-hover 實作按鈕切換效果，無需額外的 React State。
  
  自定義 Select 下拉選單：手動實作下拉選單以符合設計稿需求，並整合選中狀態的視覺回饋。

📂 檔案架構

  index.jsx: 主頁面邏輯、Zod Schema 定義與表單 UI。
  
  useStore.jsx: Zustand 全域狀態定義與 Action 邏輯。
  
  public/: 存放所有按鈕與背景圖片。
  
  schemas/: 存放 Zod Schema 定義。

=====================================================================================

1. 驗證邏輯抽離 (Zod Schema Decoupling)

  設計想法：我們將 formSchema.js 從 index.jsx 中獨立出來。
  
  優點：保持 UI 組件的簡潔，僅專注於渲染。Schema 可以在後端或其他測試腳本中重複使用。
  
  條件式驗證 (Conditional Validation)：
  
  利用 .superRefine 處理「依賴性欄位」。例如：當產業選擇「其它」時，文字輸入框才會轉為「必填」。
  
  解決了傳統 z.string().min(1) 在欄位隱藏時仍會跳出錯誤的痛點。

2. 狀態管理 (Zustand)
   
  技術選擇：使用 zustand 取代原生 useState 或 Redux。
  
  集中化管理：所有的選項列表（industryList、sessionList）與使用者輸入值都存在單一 Store 中，方便跨組件調用。
  
  自動化錯誤處理：在 updateField 函數中內建了「輸入即清除錯誤」的邏輯。當使用者開始更正錯誤欄位時，紅框提示會立即消失，提升體驗。

3. 使用者交互優化 (UX Design)
   
  Hover 圖片切換：採用 Tailwind CSS 的 group-hover 技巧，無需額外撰寫 React State 即可達成按鈕視覺切換，減少不必要的重新渲染 (Re-render)。
  
  自動重設邏輯：當使用者將「飲食習慣」從「其他」改回「葷食」時，系統會自動清空「其他說明」的文字並移除相關驗證錯誤，確保提交資料的乾淨度。
  
  Checkbox 樣式自定義：透過 appearance-none 與 accent-color 讓表單控制項符合品牌深粉色系。
