import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

function PageNews() {
  const { id } = useParams(); 
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/News/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNewsItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news item:", error);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

   if (loading) return <Loading />;

  if (!newsItem) {
    return <div className="text-center py-20 text-red-500">عذراً، الخبر غير موجود.</div>;
  }

  return (
    <div className="bg-[#F4F7FB] py-10 px-4" dir="rtl">
      <div className="container mx-auto">
        <Link
          to="/ImportantNews" 
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-8"
        >
          <i className="fa-solid fa-arrow-right"></i> 
          <span>العودة للأخبار</span>
        </Link>

        <div className="flex flex-col items-center">
          {/* Card: Summary */}
          <div className="w-full max-w-4xl bg-white rounded-3xl border border-gray-200 shadow-sm p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-md">
                أخبار عامة
              </span>

              <span className="text-gray-400 text-md flex items-center gap-2">
                <i className="fa-regular fa-calendar"></i>
                {formatDate(newsItem.date)}
              </span>
            </div>
            <h2 className="text-xl text-gray-800 font-semibold mb-3">
              {newsItem.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg border-r-4 border-blue-500 pr-4">
              ملخص: {newsItem.title}
            </p>
          </div>

          {/* Main Card: Content */}
          <div className="bg-white w-full max-w-4xl rounded-3xl mb-10 shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-100 text-2xl rounded-xl flex items-center justify-center text-blue-600">
                  <i className="fa-solid fa-newspaper"></i>
                </div>
                <h2 className="text-lg font-bold text-gray-800">تفاصيل الخبر</h2>
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed text-md">
                <p className="whitespace-pre-wrap">
                  {newsItem.description}
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-gray-500 italic text-sm">
                  تم نشر هذا الخبر بتاريخ {formatDate(newsItem.date)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNews;