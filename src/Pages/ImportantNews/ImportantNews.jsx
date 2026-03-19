import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function ImportantNews() {
  const [news, setNews] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {

    fetch("/api/News")
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

   if (loading) return <Loading />;

  return (
    <div className="bg-[#f4f7fb] py-10 px-4 md:px-8 lg:px-16 rtl" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-500 hover:text-gray-800 transition">
              العودة للرئيسية
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white shadow-sm">
                <i className="fa-solid fa-newspaper text-blue-600"></i>
              </span>
              <span>أحدث الأخبار</span>
            </h1>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col justify-between"
            >
              <header className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-blue-600">
                    <i className="fa-solid fa-file-lines"></i>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                    أخبار عامة
                  </span>
                </div>
                {/* date icon on top-left */}
                <div className="text-gray-400 text-sm flex items-center gap-2">
                  <i className="fa-regular fa-calendar"></i>
                  <span className="hidden sm:inline">{formatDate(item.date)}</span>
                </div>
              </header>

              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800 leading-relaxed mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <footer className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  to={`/ImportantNews/PageNews/${item.id}`}
                  className="text-blue-600 font-medium hover:underline inline-flex items-center gap-2"
                >
                  <span>اقرأ المزيد</span>
                  <i className="fa-solid fa-arrow-left text-sm"></i>
                </Link>
              </footer>
            </article>
          ))}
        </div>

        {news.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-500">لا توجد أخبار متاحة حالياً.</div>
        )}
      </div>
    </div>
  );
}