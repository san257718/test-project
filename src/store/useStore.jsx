import { create } from "zustand";

const useStore = create((set) => ({
  name: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  industryName: "",
  
  industryList: [
    { key: "1", value: "科技業" },
    { key: "2", value: "醫療產業" },
    { key: "3", value: "金融業" },
    { key: "4", value: "教育領域" },
    { key: "5", value: "其它" },
  ],
  sessionList: [
    { id: 1, name: "Session A" },
    { id: 2, name: "Session B" },
    { id: 3, name: "Session C" },
    { id: 4, name: "Session D" },
  ],
  selectedSessions: [],
  dinnerList: [
    { id: 1, name: "是" },
    { id: 2, name: "否" },
  ],
  dinner: 0,
  dietary_habits_List: [
    { id: 1, name: "葷食" },
    { id: 2, name: "素食" },
    { id: 3, name: "其他(請填寫)" },
  ],
  dietary_habits: 0,
  dietary_habits_name: "",
  errors: {},

  updateField: (field, value) =>
    set((state) => ({
      [field]: value,
      // 當使用者輸入時，自動清除該欄位的紅框
      errors: { ...state.errors, [field]: null },
    })),
  setErrors: (errors) => set({ errors }),

  toggleSession: (session) =>
    set((state) => {
      const isSelected = state.selectedSessions.some(
        (s) => s.value === session.id,
      );

      if (isSelected) {
        // 如果已存在，則移除該物件
        return {
          selectedSessions: state.selectedSessions.filter(
            (s) => s.value !== session.id,
          ),
        };
      } else {
        // 如果不存在，則新增指定格式的物件
        return {
          selectedSessions: [
            ...state.selectedSessions,
            { key: session.name, value: session.id },
          ],
        };
      }
    }),
}));

export default useStore; // 確保這裡是 default export
