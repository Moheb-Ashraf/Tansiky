import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/apiClient"; 
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
        const { data } = await api.get("/api/News");
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

      <div className="bg-app-bg min-h-screen py-10 px-4 theme-page-pad md:px-8 lg:px-16" dir="rtl">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="theme-card w-10 h-10 flex items-center justify-center rounded-full shadow-sm theme-subtle hover:text-brand-600 transition-all">
                <i className="fa-solid fa-house"></i>
              </Link>
              <div className="h-8 w-1 bg-brand-600 rounded-full"></div>
              <h1 className="theme-heading text-2xl theme-title-xl md:text-3xl font-black flex items-center gap-3">
                <span>أحدث الأخبار </span>
              </h1>
            </div>
            <p className="theme-subtle font-medium bg-brand-50 px-4 py-2 rounded-2xl border border-brand-100">
              إجمالي الأخبار: {news.length}
            </p>
          </div>

          {error && (
            <div className="bg-maroon-50 text-maroon-600 p-6 rounded-3xl text-center border border-maroon-100 mb-8">
              <i className="fa-solid fa-circle-exclamation text-2xl mb-2"></i>
              <p className="font-bold">{error}</p>
            </div>
          )}

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="theme-card theme-elevated group rounded-4xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-7 flex flex-col justify-between"
              >
                <div>
                  <header className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                        <i className="fa-solid fa-newspaper text-xl"></i>
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-[var(--theme-muted)] theme-subtle text-[10px] font-black uppercase tracking-widest">
                        أخبار حصرية
                      </span>
                    </div>
                  </header>

                  <div className="space-y-3">
                    <div className="theme-subtle text-xs flex items-center gap-2 font-medium">
                      <i className="fa-regular fa-calendar-check text-brand-500"></i>
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <h2 className="theme-heading text-xl font-bold leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="theme-subtle text-sm leading-relaxed line-clamp-3 italic">
                      {item.description}
                    </p>
                  </div>
                </div>

                <footer className="mt-8 pt-5 border-t border-[var(--theme-border)] flex items-center justify-between">
                  <Link
                    to={`/ImportantNews/PageNews/${item.id}`}
                    className="text-brand-600 font-bold hover:gap-3 transition-all inline-flex items-center gap-2 group-hover:text-brand-800"
                  >
                    <span>تفاصيل الخبر</span>
                    <i className="fa-solid fa-chevron-left text-xs"></i>
                  </Link>
                  <span className="theme-subtle group-hover:text-brand-100 transition-colors">
                     <i className="fa-solid fa-bolt-lightning text-xl"></i>
                  </span>
                </footer>
              </article>
            ))}
          </div>

          {news.length === 0 && !loading && !error && (
            <div className="theme-card rounded-[3rem] shadow-sm p-20 text-center border border-dashed border-gray-200">
               <i className="fa-solid fa-inbox text-5xl theme-subtle mb-4"></i>
               <p className="text-xl theme-subtle font-medium">لا توجد أخبار منشورة حالياً.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}