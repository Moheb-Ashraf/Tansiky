import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function AdvancedSearch() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    type: "",
    governorate: "",
    studyType: "",
    minFees: "",
    maxFees: "",
    minCoordination: "",
    maxCoordination: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // مصفوفات البيانات
  const universityTypes = [
    { id: 1, name: "حكومية" }, { id: 2, name: "خاصة" }, { id: 3, name: "أهلية" },
    { id: 4, name: "معهد عالي" }, { id: 5, name: "أجنبية" }, { id: 6, name: "تكنولوجية" }
  ];

  const studyTypes = [
    { id: 1, name: "علمي رياضة" }, { id: 2, name: "علمي علوم" },
    { id: 3, name: "أدبي" }, { id: 4, name: "صناعي" }, { id: 5, name: "أمريكي" }
  ];

  const governorates = [
  { id: 1, name: "القاهرة" }, { id: 2, name: "الجيزة" }, { id: 3, name: "الإسكندرية" },
  { id: 4, name: "الدقهلية" }, { id: 5, name: "البحر الأحمر" }, { id: 6, name: "البحيرة" },
  { id: 7, name: "الفيوم" }, { id: 8, name: "الغربية" }, { id: 9, name: "الإسماعيلية" },
  { id: 10, name: "المنوفية" }, { id: 11, name: "المنيا" }, { id: 12, name: "القليوبية" },
  { id: 13, name: "الوادي الجديد" }, { id: 14, name: "السويس" }, { id: 15, name: "الشرقية" },
  { id: 16, name: "دمياط" }, { id: 17, name: "بني سويف" }, { id: 18, name: "أسوان" },
  { id: 19, name: "أسيوط" }, { id: 20, name: "سوهاج" }, { id: 21, name: "قنا" },
  { id: 22, name: "شمال سيناء" }, { id: 23, name: "جنوب سيناء" }, { id: 24, name: "كفر الشيخ" },
  { id: 25, name: "مطروح" }, { id: 26, name: "الأقصر" }, { id: 27, name: "بورسعيد" }
];

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      
      // تنظيف الفلاتر 
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );

      const { data } = await axios.get("https://tansiqy.runasp.net/api/Universities/search", { params });
      setResults(data);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8" dir="rtl">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">البحث المخصص عن الجامعات</h1>

        {/*(Filter Sidebar/Top) */}
        <form onSubmit={handleSearch} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* كلمة البحث */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الجامعة أو الكلمة البحثية</label>
              <input
                type="text"
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleChange}
                placeholder="ابحث عن جامعة أو كلية..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* نوع الجامعة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الجامعة</label>
              <select name="type" value={filters.type} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none">
                <option value="">كل الأنواع</option>
                {universityTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>

            {/* نوع الدراسة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الدراسة (الثانوية)</label>
              <select name="studyType" value={filters.studyType} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none">
                <option value="">الكل</option>
                {studyTypes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            {/* المحافظة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المحافظة</label>
              <select 
                name="governorate" 
                value={filters.governorate} 
                onChange={handleChange} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 transition"
              >
                <option value="">كل المحافظات</option>
                {governorates.map(gov => (
                  <option key={gov.id} value={gov.id}>{gov.name}</option>
                ))}
              </select>
            </div>

            {/* المصاريف */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المصاريف (من)</label>
              <input type="number" name="minFees" value={filters.minFees} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المصاريف (إلى)</label>
              <input type="number" name="maxFees" value={filters.maxFees} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="100,000" />
            </div>

            {/* التنسيق */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التنسيق (من %)</label>
              <input type="number" name="minCoordination" value={filters.minCoordination} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">التنسيق (إلى %)</label>
              <input type="number" name="maxCoordination" value={filters.maxCoordination} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="100" />
            </div>

          </div>

          <button type="submit" className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
             بحث الآن
          </button>
        </form>

        {/* --- قسم عرض النتائج --- */}
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.length > 0 ? (
              results.map((uni) => (
                <Link key={uni.id} to={`/university/${uni.id}`} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition">
                      <i className="fa-solid fa-graduation-cap text-2xl"></i>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-500 font-bold">
                       {universityTypes.find(t => t.id === uni.type)?.name || "جامعة"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{uni.nameAr}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{uni.description}</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <div className="text-green-600 font-bold">{uni.fees?.toLocaleString()} ج.م</div>
                    <div className="text-blue-600 font-bold">تنسيق: {uni.lastYearCoordination || uni.minimumPercentage}%</div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-400">
                 <i className="fa-solid fa-magnifying-glass text-5xl mb-4"></i>
                 <p className="text-xl italic">ابدأ البحث للعثور على النتائج المناسبة</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}