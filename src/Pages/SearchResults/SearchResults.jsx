import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!query) return;

    const performSearch = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`/api/proxy?path=api/Universities/search?searchTerm=${encodeURIComponent(query)}`);
        const finalResults = [];
        const lowerQuery = query.toLowerCase();

        data.forEach(item => {
          const isInstitute = item.type === 4; 

          const matchesUni = 
            item.nameAr?.toLowerCase().includes(lowerQuery) || 
            item.nameEn?.toLowerCase().includes(lowerQuery);

          if (matchesUni) {
            finalResults.push({
              id: item.id,
              displayTitle: item.nameAr,
              subTitle: item.nameEn, 
              typeLabel: isInstitute ? "معهد عالي" : "جامعة",
              targetLink: isInstitute ? `/InstituteDetails/${item.id}` : `/university/${item.id}`,
              badgeColor: isInstitute ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
            });
          }

          item.colleges?.forEach(college => {
            const matchesCollege = 
              college.nameAr?.toLowerCase().includes(lowerQuery) || 
              college.nameEn?.toLowerCase().includes(lowerQuery);

            if (matchesCollege) {
              finalResults.push({
                id: college.id,
                displayTitle: `${college.nameAr} - ${item.nameAr}`,
                subTitle: college.nameEn,
                typeLabel: isInstitute ? "شعبة معهد" : "كلية",
                targetLink: isInstitute ? `/InstituteDetails/${item.id}` : `/college/${item.id}/${college.id}`,
                badgeColor: isInstitute ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-700"
              });
            }
          });
        });

        // unique results
        const uniqueResults = Array.from(new Map(finalResults.map(res => [res.displayTitle, res])).values());
        setResults(uniqueResults);

      } catch (err) {
        console.error("Search Error:", err);
        setError("فشل في جلب النتائج، يرجى المحاولة لاحقاً");
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  if (!query) return <div className="text-center py-20 text-gray-400 font-sans">اكتب كلمة البحث للبدء...</div>;
  if (loading) return <Loading />;
  if (error) return <div className="text-center py-20 text-red-500 font-bold">{error}</div>;

  return (
    <div className="container mx-auto p-6 " dir="rtl">
      <div className="mb-10 text-right">
        <h2 className="text-3xl font-black text-gray-800 font-sans">
          نتائج البحث عن: <span className="text-blue-600">"{query}"</span>
        </h2>
        <p className="text-gray-500 mt-2 font-medium">عثرنا على {results.length} نتيجة</p>
      </div>
      
      {results.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-dashed border-gray-200">
          <p className="text-xl text-gray-400">لا توجد نتائج تطابق "{query}". جرب كلمات بحث أبسط مثل "علوم" أو "هندسة".</p>
        </div>
      ) : (
        <div className="grid gap-4 max-w-4xl">
          {results.map((item, index) => (
            <Link 
              key={index} 
              to={item.targetLink}
              className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex items-center gap-4">
                {/* Dynamic Badge Color */}
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${item.badgeColor}`}>
                  {item.typeLabel}
                </span>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                    {item.displayTitle}
                  </span>
                  {item.subTitle && <span className="text-xs text-gray-400 font-sans mt-0.5">{item.subTitle}</span>}
                </div>
              </div>
              <i className="fa-solid fa-chevron-left text-gray-300 group-hover:text-blue-500 transition-all"></i>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}