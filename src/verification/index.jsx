import { z } from "zod";
import useStore from "../store/useStore";

// 定義驗證規則
const formSchema = z.object({
  name: z.string().min(1, "姓名為必填"),
  email: z.string().email("信箱格式不正確").min(1, "信箱為必填"),
  phone: z.string().min(1, "手機為必填"),
  company: z.string().min(1, "單位為必填"),
  industry: z.string().min(1, "產業為必填"),
  selectedSessions: z.array(z.any()).min(1, "請至少選擇一個場次"),
  dinner: z.number({ invalid_type_error: "請選擇是否參與晚宴" }),
  dietary_habits: z.number({ invalid_type_error: "請選擇飲食習慣" }),
});

function IndexForm() {
  const { 
    name, email, phone, company, industry, selectedSessions, dinner, dietary_habits, 
    updateField, errors, setErrors 
  } = useStore();

  const submit = () => {
    const formData = { name, email, phone, company, industry, selectedSessions, dinner, dietary_habits };
    
    // 執行驗證
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      // 轉換 zod 錯誤格式為簡單物件 { fieldName: message }
      const formattedErrors = result.error.format();
      const newErrors = {};
      Object.keys(formattedErrors).forEach(key => {
        if (formattedErrors[key]?._errors) {
          newErrors[key] = formattedErrors[key]._errors[0];
        }
      });
      setErrors(newErrors);
      console.log("驗證失敗", newErrors);
      return;
    }

    console.log("提交成功！", result.data);
    alert("報名成功");
  };

  // 輔助函式：判斷是否顯示紅框 class
  const getErrorClass = (field) => errors[field] ? "border-red-500 border-2" : "border-gray-300";

  return (
    <main>
      <div className="w-full flex flex-col gap-7 px-10">
        {/* 姓名範例 */}
        <div className="flex flex-col">
          <label className="text-[#9C0053] font-bold">姓名 *</label>
          <input
            className={`w-123.25 h-11.75 border rounded-md bg-gray-100 pl-2.5 ${getErrorClass("name")}`}
            type="text"
            placeholder="請填寫"
            onChange={(e) => updateField("name", e.target.value)}
          />
          {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
        </div>

        {/* 常用信箱範例 */}
        <div className="flex flex-col">
          <label className="text-[#9C0053] font-bold">常用信箱 *</label>
          <input
            className={`w-123.25 h-11.75 border rounded-md bg-gray-100 pl-2.5 ${getErrorClass("email")}`}
            type="text"
            placeholder="請填寫"
            onChange={(e) => updateField("email", e.target.value)}
          />
          {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
        </div>

        {/* 其他 Input 比照辦理，將靜態 border-gray-300 換成 ${getErrorClass("欄位名")} */}
        
        {/* Checkbox 或 Radio 的容器也可以加上紅框提示 */}
        <div className={`p-2 rounded ${errors.selectedSessions ? "border-red-500 border-2" : ""}`}>
           {/* 原本的 sessionList.map */}
        </div>
      </div>
    </main>
  );
}