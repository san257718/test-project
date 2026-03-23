import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z.string().min(1, "姓名為必填"),
    email: z.string().email("信箱格式不正確").min(1, "信箱為必填"),
    phone: z
      .string()
      .min(1, "手機為必填")
      .regex(/^09\d{8}$/, "手機格式不正確"),
    company: z.string().min(1, "單位為必填"),
    industry: z.string().min(1, "產業為必填"),
    industryName: z.string().optional(), // 設為選填，由 superRefine 檢查
    selectedSessions: z.array(z.any()).min(1, "請至少選擇一個場次"),
    dinner: z
      .number({ invalid_type_error: "請選擇是否參與晚宴" })
      .min(1, "請選擇是否參與晚宴"),
    dietary_habits: z
      .number({ invalid_type_error: "請選擇飲食習慣" })
      .min(1, "請選擇飲食習慣"),
    dietary_habits_name: z.string().optional(), // 設為選填
  })
  .superRefine((data, ctx) => {
    // 1. 當產業選「其它」(ID "5") 時
    if (data.industry === "5" && !data.industryName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "其它產業名稱為必填",
        path: ["industryName"],
      });
    }
    // 2. 當飲食選「其他」(ID 3) 時
    if (data.dietary_habits === 3 && !data.dietary_habits_name?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "請輸入飲食習慣說明",
        path: ["dietary_habits_name"],
      });
    }
  });
