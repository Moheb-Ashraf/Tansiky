import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function SearchResults() {
  const location = useLocation();
  // Get query
  const query = new URLSearchParams(location.search).get("query");
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fix Arabic text
  const normalizeArabic = (text) => {
    if (!text) return "";
    return text
      .replace(/[أإآا]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/^\ال/g, "") 
      .replace(/\s/g, "")   
      .trim();
  };

  useEffect(() => {
    if (!query) return;

    const performSearch = async () => {
      try {
        setLoading(true);
        setError(null);

        // API call using collegeName parameter
        const { data } = await axios.get(
          `/api/proxy?path=api/Universities/search?collegeName=${encodeURIComponent(query)}`
        );

        const finalResults = [];
        const normalizedQuery = normalizeArabic(query.toLowerCase());

        // Process data
        data.forEach(university => {
          const isInstitute = university.type === 4;

          // Search inside colleges array
          university.colleges?.forEach(college => {
            const normalizedCollegeName = normalizeArabic(college.nameAr);
            const normalizedCollegeEn = college.nameEn?.toLowerCase() || "";

            // Check match
            if (normalizedCollegeName.includes(normalizedQuery) || normalizedCollegeEn.includes(normalizedQuery)) {
              finalResults.push({
                id: college.id,
                uniId: university.id,
                displayTitle: `${college.nameAr} - ${university.nameAr}`, 
                subTitle: college.nameEn,
                typeLabel: isInstitute ? "شعبة معهد" : "كلية",
                // Routing logic
                targetLink: isInstitute 
                  ? `/InstituteDetails/${university.id}` 
                  : `/college/${university.id}/${college.id}`,
                badgeColor: isInstitute ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
              });
            }
          });
        });

        // Remove duplicates
        const uniqueResults = Array.from(new Map(finalResults.map(res => [res.displayTitle, res])).values());
        setResults(uniqueResults);

      } catch (err) {
        console.error("Search Error:", err);
        setError("Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  // Loading state
  if (!query) return <div className="text-center py-20 text-gray-400">Type college name to search...</div>;
  if (loading) return <Loading />;
  if (error) return <div className="text-center py-20 text-red-500 font-bold">{error}</div>;

  return (
    <div className="container mx-auto p-6 min-h-screen" dir="rtl">
      {/* Header */}
      <div className="mb-10 text-right">
        <h2 className="text-3xl font-black text-gray-800">
          نتائج البحث عن: <span className="text-blue-600 font-sans italic">"{query}"</span>
        </h2>
        <p className="text-gray-500 mt-2 font-medium font-sans text-sm">Found {results.length} results</p>
      </div>
      
      {/* No results */}
      {results.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-dashed border-gray-200">
          <p className="text-xl text-gray-400 font-sans">
             No colleges found. Try searching for "علوم" or "هندسة".
          </p>
        </div>
      ) : (
        /* Results list */
        <div className="grid gap-4 max-w-4xl mx-auto">
          {results.map((item, index) => (
            <Link 
              key={index} 
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