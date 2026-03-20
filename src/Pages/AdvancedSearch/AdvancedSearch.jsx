import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async"; // إضافة الـ SEO

export default function AdvancedSearch() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    collegeName: "",
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

  const universityTypes = [
    { id: 1, name: "حكومية" }, { id: 2, name: "خاصة" }, { id: 3, name: "أهلية" },
    { id: 4, name: "معهد عالي" }, { id: 5, name: "أجنبية" }, { id: 6, name: "تكنولوجية" }
  ];

  const studyTypes = [
    { id: 1, name: "علمي رياضة" }, { id: 2, name: "علمي علوم" },
    { id: 3, name: "أدبي" }, { id: 4, name: "صناعي" }, { id: 5, name: "أمريكي" } , { id: 6, name: "كل الشعب" }
  ];

  const governorates = [
    { id: 1, name: "القاهرة" }, { id: 2, name: "الإسكندرية" }, { id: 3, name: "الجيزة" },
    { id: 4, name: "الشرقية" }, { id: 5, name: "الدقهلية" }, { id: 6, name: "البحيرة" },
    { id: 7, name: "المنوفية" }, { id: 8, name: "الغربية" }, { id: 9, name: "كفر الشيخ" },
    { id: 10, name: "القليوبية" }, { id: 11, name: "بني سويف" }, { id: 12, name: "الفيوم" },
    { id: 13, name: "المنيا" }, { id: 14, name: "أسيوط" }, { id: 15, name: "سوهاج" },
    { id: 16, name: "قنا" }, { id: 17, name: "الأقصر" }, { id: 18, name: "أسوان" },
    { id: 19, name: "البحر الأحمر" }, { id: 20, name: "الوادي الجديد" }, { id: 21, name: "مطروح" },
    { id: 22, name: "شمال سيناء" }, { id: 23, name: "جنوب سيناء" }, { id: 24, name: "بورسعيد" },
    { id: 25, name: "الإسماعيلية" }, { id: 26, name: "السويس" }, { id: 27, name: "دمياط" }
  ];

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      
      const cleanFilters = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== null) {
          if (["type", "governorate", "studyType", "minFees", "maxFees", "minCoordination", "maxCoordination"].includes(key)) {
            cleanFilters[key] = Number(value);
          } else {
            cleanFilters[key] = value;
          }
        }
      });

      // ✅ التعديل هنا: نستخدم axios.get مع البارامترات بشكل صحيح ليعمل البروكسي
      // لا نستخدم encodeURIComponent هنا لأن axios سيتكفل بالأمر
      const { data } = await axios.get(`/api/Universities/search/intelligent`, {
        params: cleanFilters
      });

      // ✅ إضافة فحص الأمان: التأكد من أن النتيجة مصفوفة قبل التخزين
      if (data && Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]); // تصفير النتائج إذا كانت الاستجابة غير متوقعة
        console.warn("Expected an array but got:", data);
      }

    } catch (error) {
        console.error("Search Error:", error);
        setResults([]); // تصفير النتائج لمنع انهيار الـ Map
        Swal.fire("تنبيه", "لم نجد نتائج تطابق هذه المعايير أو حدث خطأ في الشبكة", "info");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>البحث المخصص | تنسيقي ايجي</title>
        <meta name="description" content="استخدم أداة البحث المتقدم للوصول إلى الكليات والجامعات بناءً على المجموع، المصاريف، والموقع الجغرافي." />
      </Helmet>

      <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8" dir="rtl">
        <div className="container mx-auto">
          <h1 className="text-3xl font-black text-gray-800 mb-8 text-center">البحث المخصص عن الجامعات والكليات</h1>

          <form onSubmit={handleSearch} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
              <div className="lg:col-span-2">
                <label className="block text-sm font-bold text-gray-600 mb-2 mr-2">اسم الجامعة</label>
                <input type="text" name="searchTerm" value={filters.searchTerm} onChange={handleChange}
                  placeholder="ابحث باسم الجامعة..." className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-right" />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-bold text-gray-600 mb-2 mr-2">اسم الكلية</label>
                <input type="text" name="collegeName" value={filters.collegeName} onChange={handleChange}
                  placeholder="مثال: هندسة، طب، علوم..." className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-right" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2 mr-2">نوع الجامعة</label>
                <select name="type" value={filters.type} onChange={handleChange} className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none cursor-pointer">
                  <option value="">كل الأنواع</option>
                  {universityTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2 mr-2">نوع الدراسة</label>
                <select name="studyType" value={filters.studyType} onChange={handleChange} className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none cursor-pointer">
                  <option value="">كل الشعب</option>
                  {studyTypes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2 mr-2">المحافظة</label>
                <select name="governorate" value={filters.governorate} onChange={handleChange} className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none cursor-pointer">
                  <option value="">كل المحافظات</option>
                  {governorates.map(gov => <option key={gov.id} value={gov.id}>{gov.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2 mr-2">المصاريف (من)</label>
                <input type="number" name="minFees" value={filters.minFees} onChange={handleChange} placeholder="0" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-sans" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2 mr-2">المصاريف (إلى)</label>
                <input type="number" name="maxFees" value={filters.maxFees} onChange={handleChange} placeholder="100000" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-sans" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2 mr-2">التنسيق % (من)</label>
                <input type="number" name="minCoordination" value={filters.minCoordination} onChange={handleChange} placeholder="50" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-sans" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2 mr-2">التنسيق % (إلى)</label>
                <input type="number" name="maxCoordination" value={filters.maxCoordination} onChange={handleChange} placeholder="100" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none font-sans" />
              </div>

            </div>

            <button type="submit" className="w-full mt-10 bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 cursor-pointer">
               <i className="fa-solid fa-magnifying-glass"></i>
               ابدأ البحث المخصص الآن
            </button>
          </form>

          {loading ? <Loading /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {/* ✅ الحماية الإضافية هنا باستخدام Array.isArray */}
              {Array.isArray(results) && results.length > 0 ? (
                results.map((uni) => (
                  <Link key={uni.id} to={uni.type === 4 ? `/InstituteDetails/${uni.id}` : `/university/${uni.id}`} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-blue-50 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                        <i className={`fa-solid ${uni.type === 4 ? 'fa-school' : 'fa-graduation-cap'}`}></i>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${uni.type === 4 ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                         {universityTypes.find(t => t.id === uni.type)?.name || "جامعة"}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-black text-gray-800 mb-2 leading-tight">{uni.nameAr}</h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 italic">{uni.description || "لا يوجد وصف متاح."}</p>
                    
                    <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                      <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 font-bold uppercase">المصاريف</span>
                          <span className="text-emerald-600 font-black text-lg font-sans">{uni.fees?.toLocaleString() || '---'} ج.م</span>
                      </div>
                      <div className="flex flex-col text-left">
                          <span className="text-[10px] text-gray-400 font-bold uppercase">التنسيق</span>
                          <span className="text-blue-600 font-black text-lg font-sans">{uni.lastYearCoordination || uni.minimumPercentage || '---'}%</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                   <p className="text-gray-400 text-xl font-medium">ابدأ البحث أو غير المعايير لعرض النتائج.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}