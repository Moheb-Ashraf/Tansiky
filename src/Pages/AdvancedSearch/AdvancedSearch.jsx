import api from "../../lib/apiClient";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";

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
    { id: 3, name: "أدبي" }, { id: 4, name: "صناعي" }, { id: 5, name: "أمريكي" },
    { id: 6, name: "كل الشعب" }
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

  // Build the correct navigation link based on the item type
  // - Institute (type 4)         → /InstituteDetails/:id
  // - College (has universityId) → /college/:universityId/:id
  // - University                 → /university/:id
  const getTargetLink = (item) => {
    if (item.type === 4) return `/InstituteDetails/${item.id}`;
    if (item.universityId) return `/college/${item.universityId}/${item.id}`;
    return `/university/${item.id}`;
  };

  // Resolve a human-readable type label for the badge
  // Checks the item's own type first, then falls back to the parent university's type
  const getTypeLabel = (item) => {
    if (item.universityId) return "كلية"; // It's a college result
    return universityTypes.find(t => t.id === item.type)?.name || "جامعة";
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);

      // Strip empty values and cast numeric fields before sending to the API
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

      const { data } = await api.get(`/api/Universities/search/intelligent`, {
        params: cleanFilters
      });

      // Normalize response — API may return an array directly or wrap it in an object
      let finalData = [];
      if (Array.isArray(data)) {
        finalData = data;
      } else if (data && typeof data === "object") {
        const arrayKey = Object.keys(data).find(key => Array.isArray(data[key]));
        finalData = arrayKey ? data[arrayKey] : [];
      }

      setResults(finalData);
      

      if (finalData.length === 0) {
        Swal.fire("تنبيه", "لم نجد نتائج تطابق هذه المعايير", "info");
      }

    } catch (error) {
      console.error("Search Error:", error);
      setResults([]);
      Swal.fire("تنبيه", "حدث خطأ أثناء تحميل البيانات، يرجى المحاولة لاحقاً", "error");
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
        <meta
          name="description"
          content="استخدم أداة البحث المتقدم للوصول إلى الكليات والجامعات بناءً على المجموع، المصاريف، والموقع الجغرافي."
        />
      </Helmet>

      <div className="min-h-screen bg-app-bg p-4 theme-page-pad md:p-8" dir="rtl">
        <div className="container mx-auto">
          <h1 className="theme-heading text-3xl theme-title-xl font-black mb-8 text-center">
            البحث المخصص عن الجامعات والكليات
          </h1>

          {/* ── Search Form ─────────────────────────────────────────────────── */}
          <form onSubmit={handleSearch} className="theme-card theme-elevated p-8 rounded-[2.5rem] shadow-sm mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              <div className="lg:col-span-2">
                <label className="block text-sm font-bold theme-subtle mb-2 mr-2">اسم الجامعة</label>
                <input type="text" name="searchTerm" value={filters.searchTerm} onChange={handleChange}
                  placeholder="ابحث باسم الجامعة..."
                  className="theme-input w-full p-4 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500 transition-all text-right" />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-bold theme-subtle mb-2 mr-2">اسم الكلية</label>
                <input type="text" name="collegeName" value={filters.collegeName} onChange={handleChange}
                  placeholder="مثال: هندسة، طب، علوم..."
                  className="theme-input w-full p-4 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500 transition-all text-right" />
              </div>

              <div>
                <label className="block text-sm font-bold theme-subtle mb-2 mr-2">نوع الجامعة</label>
                <select name="type" value={filters.type} onChange={handleChange}
                  className="theme-input w-full p-4 rounded-2xl outline-none cursor-pointer">
                  <option value="">كل الأنواع</option>
                  {universityTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold theme-subtle mb-2 mr-2">نوع الدراسة</label>
                <select name="studyType" value={filters.studyType} onChange={handleChange}
                  className="theme-input w-full p-4 rounded-2xl outline-none cursor-pointer">
                  <option value="">كل الشعب</option>
                  {studyTypes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold theme-subtle mb-2 mr-2">المحافظة</label>
                <select name="governorate" value={filters.governorate} onChange={handleChange}
                  className="theme-input w-full p-4 rounded-2xl outline-none cursor-pointer">
                  <option value="">كل المحافظات</option>
                  {governorates.map(gov => <option key={gov.id} value={gov.id}>{gov.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold theme-subtle mb-2 mr-2">المصاريف (من)</label>
                <input type="number" name="minFees" value={filters.minFees} onChange={handleChange}
                  placeholder="0" className="theme-input w-full p-4 rounded-2xl outline-none font-sans" />
              </div>

              <div>
                <label className="block text-sm font-bold theme-subtle mb-2 mr-2">المصاريف (إلى)</label>
                <input type="number" name="maxFees" value={filters.maxFees} onChange={handleChange}
                  placeholder="100000" className="theme-input w-full p-4 rounded-2xl outline-none font-sans" />
              </div>

              <div>
                <label className="block text-sm font-bold theme-subtle mb-2 mr-2">التنسيق % (من)</label>
                <input type="number" name="minCoordination" value={filters.minCoordination} onChange={handleChange}
                  placeholder="50" className="theme-input w-full p-4 rounded-2xl outline-none font-sans" />
              </div>

              <div>
                <label className="block text-sm font-bold theme-subtle mb-2 mr-2">التنسيق % (إلى)</label>
                <input type="number" name="maxCoordination" value={filters.maxCoordination} onChange={handleChange}
                  placeholder="100" className="theme-input w-full p-4 rounded-2xl outline-none font-sans" />
              </div>

            </div>

            <button type="submit"
              className="w-full mt-10 bg-brand-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-100 flex items-center justify-center gap-3 cursor-pointer">
              <i className="fa-solid fa-magnifying-glass"></i>
              ابدأ البحث المخصص الآن
            </button>
          </form>

          {/* ── Results Grid ────────────────────────────────────────────────── */}
          {loading ? <Loading /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {results.length > 0 ? (
                results.map((item) => (
                  <Link
                    key={item.id}
                    to={getTargetLink(item)}
                    className="theme-card theme-elevated rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      {/* Icon — different for institutes vs universities/colleges */}
                      <div className="bg-brand-50 text-brand-600 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm">
                        <i className={`fa-solid ${item.type === 4 ? "fa-school" : "fa-graduation-cap"}`}></i>
                      </div>

                      {/* ✅ Type badge — uses item's own type, not the nested university object */}
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                        item.type === 4 ? "bg-gold-100 text-gold-700" : "bg-brand-100 text-brand-700"
                      }`}>
                        {getTypeLabel(item)}
                      </span>
                    </div>

                    <h3 className="theme-heading text-xl font-black mb-2 leading-tight">{item.nameAr}</h3>
                    <p className="theme-subtle text-sm mb-6 line-clamp-2 italic">
                      {item.description || "لا يوجد وصف متاح."}
                    </p>

                    <div className="flex justify-between items-center pt-6 border-t border-(--theme-border)">
                      {/* Annual fees */}
                      <div className="flex flex-col">
                        <span className="text-[10px] theme-subtle font-bold uppercase">المصاريف</span>
                        <span className="text-brand-700 font-black text-lg font-sans">
                          {(item.fees || item.feesCategoryA)?.toLocaleString() || "---"} ج.م
                        </span>
                      </div>

                      {/* Coordination/admission percentage */}
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] theme-subtle font-bold uppercase">التنسيق</span>
                        <span className="text-brand-600 font-black text-lg font-sans">
                          {item.lastYearCoordination || item.minimumPercentage || "---"}%
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                // Empty state — shown before first search or when no results match
                <div className="col-span-full text-center py-20 theme-card theme-elevated rounded-[3rem] border-2 border-dashed">
                  <p className="theme-subtle text-xl font-medium">ابدأ البحث أو غير المعايير لعرض النتائج.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}