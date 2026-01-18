import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query")?.toLowerCase();
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const performSearch = async () => {
      try {
        setLoading(true);
        setError(null);

        
        const types = [1, 2, 3, 4, 5, 6];
        const requests = types.map(t => 
          axios.get(`/api/Universities/type/${t}`).catch(e => ({ data: [] }))
        );

        const responses = await Promise.all(requests);
        
        // دمج كل الجامعات في مصفوفة واحدة كبيرة
        const allUniversities = responses.flatMap(res => res.data);

        const uniResults = [];
        const collegeResults = [];
        const deptResults = [];

        allUniversities.forEach(u => {
          // 1. البحث في اسم الجامعة
          if (u.nameAr?.toLowerCase().includes(query)) {
            uniResults.push({ id: u.id, nameAr: u.nameAr, type: "university" });
          }

          // 2. البحث في الكليات
          u.colleges?.forEach(c => {
            if (c.nameAr?.toLowerCase().includes(query)) {
              collegeResults.push({ id: c.id, nameAr: c.nameAr, type: "college", uniId: u.id });
            }

            // 3. البحث في الأقسام
            c.departments?.forEach(d => {
              if (d.nameAr?.toLowerCase().includes(query)) {
                deptResults.push({ id: d.id, nameAr: d.nameAr, type: "department", collegeId: c.id });
              }
            });
          });
        });

        setResults([...uniResults, ...collegeResults, ...deptResults]);
      } catch (err) {
        console.error("Search Error:", err);
        setError("فشل الاتصال بالسيرفر، يرجى المحاولة لاحقاً");
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  if (!query) return <div className="text-center py-20 text-gray-400">ابدأ البحث الآن...</div>;
  if (loading) return <Loading />;
  if (error) return <div className="text-center py-20 text-red-500 font-bold">{error}</div>;

  return (
    <div className="container mx-auto p-6 min-h-screen" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
        نتائج البحث عن: <span className="text-blue-600">"{query}"</span>
      </h2>
      
      {results.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-sans text-xl">
          لا توجد نتائج تطابق بحثك.
        </div>
      ) : (
        <div className="grid gap-4">
          {results.map((item, index) => {
            let targetLink = "";
            let typeLabel = "";
            let badgeColor = "";

            if (item.type === "university") {
              targetLink = `/university/${item.id}`;
              typeLabel = "جامعة";
              badgeColor = "bg-blue-100 text-blue-700";
            } else if (item.type === "college") {
              targetLink = `/college/${item.uniId}/${item.id}`;
              typeLabel = "كلية";
              badgeColor = "bg-green-100 text-green-700";
            } else {
              targetLink = `/department/${item.collegeId}/${item.id}`;
              typeLabel = "قسم";
              badgeColor = "bg-purple-100 text-purple-700";
            }

            return (
              <Link 
                key={`${item.type}-${item.id}-${index}`} 
                to={targetLink}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
                    {typeLabel}
                  </span>
                  <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {item.nameAr}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 group-hover:text-blue-500">
                  <span className="text-sm hidden md:inline">انتقال</span>
                  <i className="fa-solid fa-chevron-left transition-transform group-hover:-translate-x-1"></i>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}