import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async"; 

export default function ImportantNews() {
  const [news, setNews] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/News");
        setNews(data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("فشل في تحميل الأخبار حالياً، يرجى المحاولة لاحقاً.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  if (loading) return <Loading />;

  return (
    <>
      {/*   SEO   */}
      <Helmet>
        <title>آخر أخبار التنسيق والجامعات المصرية | تنسيقي ايجي</title>
        <meta name="description" content="تابع أحدث أخبار التنسيق، مواعيد التقديم في الكليات، وقرارات وزارة التعليم العالي لحظة بلحظة على موقع تنسيقي ايجي." />
        <meta name="keywords" content="أخبار التنسيق، أخبار الجامعات، موعد تنسيق الثانوية العامة، نتائج التنسيق، تنسيقي ايجي" />
      </Helmet>

      <div className="bg-[#f4f7fb] min-h-screen py-10 px-4 md:px-8 lg:px-16" dir="rtl">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-400 hover:text-blue-600 transition-all">
                <i className="fa-solid fa-house"></i>
              </Link>
              <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-800 flex items-center gap-3">
                <span>أحدث الأخبار </span>
              </h1>
            </div>
            <p className="text-gray-500 font-medium bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
              إجمالي الأخبار: {news.length}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-6 rounded-3xl text-center border border-red-100 mb-8">
              <i className="fa-solid fa-circle-exclamation text-2xl mb-2"></i>
              <p className="font-bold">{error}</p>
            </div>
          )}

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="group bg-white rounded-4xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-7 flex flex-col justify-between"
              >
                <div>
                  <header className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                        <i className="fa-solid fa-newspaper text-xl"></i>
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                        أخبار حصرية
                      </span>
                    </div>
                  </header>

                  <div className="space-y-3">
                    <div className="text-gray-400 text-xs flex items-center gap-2 font-medium">
                      <i className="fa-regular fa-calendar-check text-blue-400"></i>
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 italic">
                      {item.description}
                    </p>
                  </div>
                </div>

                <footer className="mt-8 pt-5 border-t border-gray-50 flex items-center justify-between">
                  <Link
                    to={`/ImportantNews/PageNews/${item.id}`}
                    className="text-blue-600 font-bold hover:gap-3 transition-all inline-flex items-center gap-2 group-hover:text-blue-800"
                  >
                    <span>تفاصيل الخبر</span>
                    <i className="fa-solid fa-chevron-left text-xs"></i>
                  </Link>
                  <span className="text-gray-200 group-hover:text-blue-100 transition-colors">
                     <i className="fa-solid fa-bolt-lightning text-xl"></i>
                  </span>
                </footer>
              </article>
            ))}
          </div>

          {news.length === 0 && !loading && !error && (
            <div className="bg-white rounded-[3rem] shadow-sm p-20 text-center border border-dashed border-gray-200">
               <i className="fa-solid fa-inbox text-5xl text-gray-200 mb-4"></i>
               <p className="text-xl text-gray-400 font-medium">لا توجد أخبار منشورة حالياً.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}