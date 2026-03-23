import { useState } from "react";
import useStore from "../store/useStore";
import { registrationSchema } from "../schemas/formSchema";

function IndexForm() {
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const state = useStore();

  // 或者解構賦值
  const {
    name,
    email,
    phone,
    company,
    industry,
    industryList,
    industryName,
    sessionList,
    updateField,
    toggleSession,
    selectedSessions,
    dinnerList,
    dinner,
    dietary_habits_List,
    dietary_habits,
    dietary_habits_name,
    errors,
    setErrors,
  } = state; // 取得方法 } = state;

  const submit = () => {
    const formData = {
      name,
      email,
      phone,
      company,
      industry,
      selectedSessions,
      dinner,
      dietary_habits,
      dietary_habits_name: dietary_habits === 3 ? dietary_habits_name : "", // 簡化判斷
      industryName: industry === "5" ? industryName : "", // 簡化判斷
    };

    const result = registrationSchema.safeParse(formData);

    if (!result.success) {
      // 轉換 zod 錯誤格式為簡單物件 { fieldName: message }
      const formattedErrors = result.error.format();
      const newErrors = {};
      Object.keys(formattedErrors).forEach((key) => {
        if (formattedErrors[key]?._errors) {
          newErrors[key] = formattedErrors[key]._errors[0];
        }
      });
      setErrors(newErrors);

      console.log(formData);

      return;
    }

    console.log("提交成功！", finalSubmitData);
    alert("報名成功");
  };

  const getErrorClass = (field) =>
    errors[field] ? "border-red-500 border" : "border-gray-300";

  return (
    <div className="w-full flex justify-center bg-[#F9EAF3]">
      <div className="w-xl bg-white">
        <div className="w-full flex justify-center">
          <h1 className="absolute w-89.5 h-17.75 top-14 text-[#9C0053] text-[44px] font-bold text-center">
            線上會議報名表
          </h1>
        </div>
        <div className="h-59.75 ">
          <img src="./title-backgrouned.png" alt="title-backgrouned" />
        </div>

        <main>
          <div className="w-full flex flex-col gap-7 px-10">
            <div className="flex flex-col">
              <label className="text-[#9C0053] font-bold">姓名 *</label>
              <input
                className={`w-123.25 h-11.75 border rounded-md bg-gray-100 pl-2.5 ${getErrorClass("name")}`}
                type="text"
                placeholder="請填寫"
                onChange={(e) => updateField("name", e.target.value)}
              />
              {errors.name && (
                <span className="text-[#FE2525] text-sm mt-1 text-end">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-[#9C0053] font-bold">常用信箱 *</label>
              <input
                className={`w-123.25 h-11.75 border rounded-md bg-gray-100 pl-2.5 ${getErrorClass("email")}`}
                type="text"
                placeholder="請填寫"
                onChange={(e) => updateField("email", e.target.value)}
              />
              {errors.email && (
                <span className="text-[#FE2525] text-sm mt-1 text-end">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-[#9C0053] font-bold">手機號碼 *</label>
              <input
                className={`w-123.25 h-11.75 border rounded-md bg-gray-100 pl-2.5 ${getErrorClass("phone")}`}
                type="text"
                onChange={(e) => updateField("phone", e.target.value)}
                inputMode="numeric" // 行動裝置自動跳轉數字鍵盤
                maxLength={10} // 限制輸入長度
                placeholder="0912345678"
              />
              {errors.phone && (
                <span className="text-[#FE2525] text-sm mt-1 text-end">
                  {errors.phone}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-[#9C0053] font-bold">服務單位 *</label>
              <input
                className={`w-123.25 h-11.75 border rounded-md bg-gray-100 pl-2.5 ${getErrorClass("company")}`}
                type="text"
                placeholder="請填寫"
                onChange={(e) => updateField("company", e.target.value)}
              />
              {errors.company && (
                <span className="text-[#FE2525] text-sm mt-1 text-end">
                  {errors.company}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-[#9C0053] font-bold">工作產業類別 *</label>

              <div
                className={` relative w-123.25 h-11.75 border rounded-md bg-gray-100 flex items-center justify-between px-4 cursor-pointer transition-all ${getErrorClass("industry")} ${isIndustryOpen ? "ring-1 ring-[#9C0053] border-[#9C0053]" : ""}`}
                onClick={() => setIsIndustryOpen(!isIndustryOpen)}
              >
                <span className={industry ? "text-black" : "text-gray-400"}>
                  {industryList.find((i) => i.key === industry)?.value ||
                    "請選擇"}
                </span>

                {isIndustryOpen ? (
                  <img src="./arrow-down.png" alt="arrow-down" />
                ) : (
                  <img src="./arrow-up.png" alt="arrow-up" />
                )}

                {isIndustryOpen && (
                  <div className="absolute top-12 right-0 w-123.25 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2">
                    {industryList.map((item) => (
                      <div
                        key={item.key}
                        className={`px-4 py-3 mx-2 rounded-lg cursor-pointer transition-colors ${
                          industry === item.key
                            ? "bg-[#F9EAF3] text-[#9C0053] font-bold" // 圖片中的選中深粉色背景
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                        onClick={() => {
                          updateField("industry", item.key);
                          setIsIndustryOpen(false); // 選完自動關閉
                        }}
                      >
                        {item.value}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {industry !== "5" && errors.industry && (
                <span className="text-[#FE2525] text-sm mt-1 text-end">
                  {errors.industry}
                </span>
              )}
            </div>

            {industry === "5" && (
              <div className="text-end">
                <input
                  className={`w-123.25 h-11.75 border rounded-md bg-gray-100 pl-2.5 ${getErrorClass("industryName")}`}
                  type="text"
                  placeholder="請填寫"
                  value={industryName || ""}
                  onChange={(e) => updateField("industryName", e.target.value)}
                />
                {errors.industryName && (
                  <span className="text-[#FE2525] text-sm mt-1 ">
                    {errors.industryName}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="w-full flex flex-col gap-7 px-10 mt-10">
            <div className="flex flex-col gap-4">
              <label className="text-[#9C0053] font-bold">
                欲參與的會議場次 (複選題) *
              </label>

              {sessionList.map((session) => (
                <div key={session.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`session-${session.id}`}
                    // 檢查 state 中是否有物件的 value 等於當前的 session.id
                    checked={selectedSessions.some(
                      (s) => s.value === session.id,
                    )}
                    onChange={() => toggleSession(session)} // 傳入完整物件
                    className="w-5 h-5 accent-[#9C0053] cursor-pointer" // 加在這裡
                  />
                  <label
                    htmlFor={`session-${session.id}`}
                    className="font-bold ml-5 cursor-pointer"
                  >
                    {session.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col gap-7 px-10 mt-10">
            <div className="flex flex-col gap-4">
              <label className="text-[#9C0053] font-bold">是否參與晚宴 *</label>
              <div className="flex gap-12">
                {dinnerList.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`dinner-${item.id}`}
                      // 檢查 state 中是否有物件的 value 等於當前的 session.id
                      checked={item.id === dinner}
                      onChange={() => updateField("dinner", item.id)}
                      className="w-5 h-5 accent-[#9C0053] cursor-pointer" // 加在這裡
                    />
                    <label className="font-bold ml-5 cursor-pointer">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[#9C0053] font-bold">飲食習慣 *</label>

              {dietary_habits_List.map((item) => (
                <div key={item.id} className="flex items-center">
                  <input
                    type="radio"
                    id={`dietary_habits-${item.id}`}
                    checked={item.id === dietary_habits}
                    onChange={() => {
                      updateField("dietary_habits", item.id);
                      // 如果選的不是「其他」，清除「其他」欄位的錯誤訊息與值
                      if (item.id !== 3) {
                        setErrors({ ...errors, dietary_habits_name: null });
                        updateField("dietary_habits_name", "");
                      }
                    }}
                    className="w-5 h-5 accent-[#9C0053] cursor-pointer"
                  />
                  <label className="font-bold ml-5 cursor-pointer">
                    {item.name}
                  </label>
                </div>
              ))}
              <div>
                {dietary_habits === 3 && (
                  <input
                    type="text"
                    // className="w-123.25 h-11.75 border border-gray-300 rounded-md bg-gray-100 pl-2.5"
                    className={`w-123.25 h-11.75 border rounded-md bg-gray-100 pl-2.5 ${dietary_habits === 3 ? getErrorClass("dietary_habits_name") : "border-gray-300"}`}
                    placeholder="請填寫"
                    onChange={(e) =>
                      updateField("dietary_habits_name", e.target.value)
                    }
                  />
                )}

                {dietary_habits === 3 && errors.dietary_habits_name && (
                  <div className="text-[#FE2525] text-sm mt-1 text-end">
                    {errors.dietary_habits_name}
                  </div>
                )}
              </div>

              <button
                className="relative flex justify-center cursor-pointer group" // 1. 加上 group 類別
                onClick={submit}
              >
                {/* 原始圖片：預設顯示，當 group 被 hover 時隱藏 */}
                <img
                  src="./active-button.png"
                  alt="button"
                  className=" hidden group-hover:block transition-opacity duration-300" // 2. 控制隱藏
                />

                <img
                  src="./hoeve-button.png" // 3. 替換成你的 Hover 圖片路徑
                  alt="button hover"
                  className="block group-hover:hidden  transition-opacity duration-300" // 4. 控制顯示
                />
                {/* Hover 圖片：預設隱藏，當 group 被 hover 時顯示 */}
              </button>
            </div>
          </div>
        </main>
        <div>
          <img src="./footer-backgrouned.png" alt="footer-background" />
        </div>
      </div>
    </div>
  );
}

export default IndexForm;
