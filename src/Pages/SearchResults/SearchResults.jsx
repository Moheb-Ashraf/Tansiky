import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function SearchResults() {
  const location = useLocation();
  // Get query from URL parameters
  const query = new URLSearchParams(location.search).get("query");
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If there's no query, don't perform search
    if (!query) return;

    const performSearch = async () => {
      try {
        setLoading(true);
        setError(null);

        // Calling the API directly through the /api proxy
        const { data } = await axios.get(`/api/Universities/search/name/intelligent`, {
          params: {
            searchTerm: query // Axios handles Arabic encoding automatically
          }
        });

        const finalResults = [];

        if (data && Array.isArray(data)) {
          data.forEach(item => {
            const isInstitute = item.type === 4;

            // Add the University or Institute entry
            finalResults.push({
              id: `uni-${item.id}`,
              displayTitle: item.nameAr,
              subTitle: item.nameEn,
              typeLabel: isInstitute ? "معهد عالي" : (item.typeAr || "جامعة"),
              targetLink: isInstitute ? `/InstituteDetails/${item.id}` : `/university/${item.id}`,
              badgeColor: isInstitute ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
            });

            // Add Colleges if they exist in the result item
            if (item.colleges && item.colleges.length > 0) {
              item.colleges.forEach(college => {
                finalResults.push({
                  id: `coll-${college.id}`,
                  displayTitle: `${college.nameAr} - ${item.nameAr}`,
                  subTitle: college.nameEn,
                  typeLabel: isInstitute ? "شعبة معهد" : "كلية",
                  targetLink: isInstitute ? `/InstituteDetails/${item.id}` : `/college/${item.id}/${college.id}`,
                  badgeColor: isInstitute ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-700"
                });
              });
            }
          });
        }

        // Remove duplicates based on title and link
        const uniqueResults = Array.from(
          new Map(finalResults.map(res => [res.displayTitle + res.targetLink, res])).values()
        );
        
        setResults(uniqueResults);

      } catch (err) {
        console.error("Search Error:", err);
        setError("فشل في تحميل النتائج. يرجى التأكد من كتابة الكلمة بشكل صحيح.");
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  // Handle Loading and Errors
  if (!query) return <div className="text-center py-20 text-gray-400 font-sans italic">Search for colleges or universities...</div>;
  if (loading) return <Loading />;
  
  if (error) return (
    <div className="container mx-auto p-20 text-center">
      <div className="bg-red-50 text-red-600 p-6 rounded-3xl inline-block border border-red-100">
        <i className="fa-solid fa-triangle-exclamation text-2xl mb-2"></i>
        <p className="font-bold">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-sm underline block mx-auto">Retry again</button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 min-h-screen" dir="rtl">
      {/* Header */}
      <div className="mb-10 text-right">
        <h2 className="text-3xl font-black text-gray-800">
          نتائج البحث عن: <span className="text-blue-600 font-sans italic">"{query}"</span>
        </h2>
        <p className="text-gray-500 mt-2 font-medium">Found {results.length} results</p>
      </div>
      
      {/* Results Rendering */}
      {results.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-dashed border-gray-200">
          <p className="text-xl text-gray-400">No matching results found.</p>
        </div>
      ) : (
        <div className="grid gap-4 max-w-4xl mx-auto">
          {results.map((item) => (
            <Link 
              key={item.id} 
              to={item.targetLink} 
              className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${item.badgeColor}`}>
                  {item.typeLabel}
                </span>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                    {item.displayTitle}
                  </span>
                  {item.subTitle && <span className="text-xs text-gray-400 font-sans mt-0.5 italic">{item.subTitle}</span>}
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