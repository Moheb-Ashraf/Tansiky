import api from "../../lib/apiClient";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function SearchResults() {
  const location = useLocation();

  // Extract search query from URL params (e.g. /search?query=cairo)
  const query = new URLSearchParams(location.search).get("query");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Abort early if no search term is provided
    if (!query) return;

    const performSearch = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call the intelligent name search endpoint via the API client
        const { data } = await api.get(`/api/Universities/search/name/intelligent`, {
          params: { searchTerm: query }, // Axios handles Arabic URL encoding automatically
        });

        const finalResults = [];

        // ── Universities ──────────────────────────────────────────────────────
        // Process university results returned from the API
        if (data && Array.isArray(data.universities)) {
          data.universities.forEach((item) => {
            const isInstitute = item.type === 4; // type 4 = Higher Institute

            finalResults.push({
              id: `uni-${item.id}`,
              displayTitle: item.nameAr,
              subTitle: item.nameEn,
              typeLabel: isInstitute ? "معهد" : "جامعة",
              targetLink: isInstitute
                ? `/InstituteDetails/${item.id}`
                : `/university/${item.id}`,
              badgeColor: isInstitute
                ? "bg-gold-100 text-gold-700"
                : "bg-green-100 text-green-700",
            });
          });
        }

        // ── Colleges ──────────────────────────────────────────────────────────
        // Process college results and append the parent university name for clarity
        if (data && Array.isArray(data.colleges)) {
          data.colleges.forEach((item) => {
            const isInstitute = item.type === 4; // type 4 = Institute branch
            const uniName = item.university?.nameAr || "";
            const uniId = item.universityId || item.university?.id;

            finalResults.push({
              id: `coll-${item.id}`,
              // Display format: "College Name - University Name"
              displayTitle: uniName ? `${item.nameAr} - ${uniName}` : item.nameAr,
              subTitle: item.nameEn,
              typeLabel: isInstitute ? "شعبة معهد" : "كلية",
              targetLink: isInstitute
                ? `/InstituteDetails/${uniId}`
                : `/college/${uniId}/${item.id}`,
              badgeColor: isInstitute
                ? "bg-gold-100 text-gold-700"
                : "bg-brand-50 text-brand-700",
            });
          });
        }

        // ── Deduplication ─────────────────────────────────────────────────────
        // Remove duplicate entries using a composite key of title + link
        const uniqueResults = Array.from(
          new Map(
            finalResults.map((res) => [res.displayTitle + res.targetLink, res])
          ).values()
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
  }, [query]); // Re-run whenever the search query changes

  // ── Early Returns ───────────────────────────────────────────────────────────

  // No query provided — prompt user to type a search term
  if (!query)
    return (
      <div className="text-center py-20 bg-app-bg min-h-[50vh] theme-subtle">
        اكتب كلمة البحث في شريط التصفح أعلاه.
      </div>
    );

  // Show loading spinner while fetching
  if (loading) return <Loading />;

  // Show error state with retry option
  if (error)
    return (
      <div className="container mx-auto p-20 text-center bg-app-bg min-h-screen">
        <div className="theme-card p-6 rounded-3xl inline-block border border-maroon-100 text-maroon-600">
          <i className="fa-solid fa-triangle-exclamation text-2xl mb-2"></i>
          <p className="font-bold">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 text-sm underline block mx-auto cursor-pointer"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );

  // ── Main Render ─────────────────────────────────────────────────────────────
  return (
    <div className="container mx-auto p-6 min-h-screen bg-app-bg" dir="rtl">

      {/* Search results header */}
      <div className="mb-10 text-right">
        <h2 className="theme-heading text-3xl font-black">
          نتائج البحث عن:{" "}
          <span className="text-brand-600 font-sans italic">«{query}»</span>
        </h2>
        <p className="theme-subtle mt-2 font-medium">
          عدد النتائج: {results.length}
        </p>
      </div>

      {/* Empty state */}
      {results.length === 0 ? (
        <div className="theme-card rounded-3xl p-20 text-center shadow-sm border border-dashed border-gray-200">
          <p className="text-xl theme-subtle">لا توجد نتائج مطابقة لبحثك.</p>
        </div>
      ) : (
        // Results grid — each card navigates to the relevant university/college page
        <div className="grid gap-4 max-w-4xl mx-auto">
          {results.map((item) => (
            <Link
              key={item.id}
              to={item.targetLink}
              className="theme-card flex items-center justify-between p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-200 transition-all group"
            >
              <div className="flex items-center gap-4">
                {/* Type badge: University / College / Institute */}
                <span
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${item.badgeColor}`}
                >
                  {item.typeLabel}
                </span>

                {/* Title and subtitle */}
                <div className="flex flex-col">
                  <span className="text-lg font-bold theme-heading group-hover:text-brand-600 transition-colors">
                    {item.displayTitle}
                  </span>
                  {item.subTitle && (
                    <span className="text-xs theme-subtle font-sans mt-0.5 italic">
                      {item.subTitle}
                    </span>
                  )}
                </div>
              </div>

              {/* Navigation arrow */}
              <i className="fa-solid fa-chevron-left theme-subtle group-hover:text-brand-500 transition-all"></i>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
