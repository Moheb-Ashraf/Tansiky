import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios"; 
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async"; 

function PageNews() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/News/${id}`);
        setNewsItem(data);
        setError(false);
      } catch (err) {
        console.error("Error fetching news item:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  // facebook
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  // whatsapp
  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(newsItem.title);
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
  };

  //copy link
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    });
  };

  if (loading) return <Loading />;

  if (error || !newsItem) {
    return (
      <div className="text-center py-32 bg-[#F4F7FB] min-h-screen">
        <div className="bg-white p-10 rounded-[2rem] shadow-sm inline-block border border-red-100">
          <i className="fa-solid fa-face-frown text-red-400 text-5xl mb-4"></i>
          <h2 className="text-xl font-bold text-gray-800 mb-4">عذراً، لم نتمكن من العثور على هذا الخبر.</h2>
          <button 
            onClick={() => navigate("/ImportantNews")}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all"
          >
            العودة لقائمة الأخبار
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{newsItem.title} | تنسيقي ايجي</title>
        <meta name="description" content={newsItem.description?.substring(0, 160)} />
        <meta property="og:title" content={newsItem.title} />
        <meta property="og:description" content={newsItem.description?.substring(0, 160)} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="bg-[#F4F7FB] min-h-screen py-10 px-4 md:px-8" dir="rtl">
        <div className="container mx-auto max-w-4xl">
          
          {/* Breadcrumbs / Back button */}
          <nav className="flex items-center gap-2 mb-8 text-sm font-medium">
            <Link to="/" className="text-gray-400 hover:text-blue-600 transition-colors">الرئيسية</Link>
            <i className="fa-solid fa-chevron-left text-[10px] text-gray-300"></i>
            <Link to="/ImportantNews" className="text-gray-400 hover:text-blue-600 transition-colors">الأخبار</Link>
            <i className="fa-solid fa-chevron-left text-[10px] text-gray-300"></i>
            <span className="text-blue-600 truncate max-w-[200px] md:max-w-md italic">تفاصيل الخبر</span>
          </nav>

          <div className="flex flex-col gap-6">
            
            {/* Main Article Card */}
            <article className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              
              {/* Card Header Info */}
              <div className="p-8 md:p-12 border-b border-gray-50 bg-gradient-to-b from-blue-50/30 to-white">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-md shadow-blue-200">
                    خبر عاجل
                  </span>
                  <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                    <i className="fa-regular fa-calendar-check text-blue-500"></i>
                    {formatDate(newsItem.date)}
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-4xl font-black text-gray-800 leading-tight md:leading-snug mb-6">
                  {newsItem.title}
                </h1>

                <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                   <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <i className="fa-solid fa-user-pen"></i>
                   </div>
                   <span>بواسطة فريق تنسيقي ايجي</span>
                </div>
              </div>

              {/* Card Body: Content */}
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-blue-50 text-2xl rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                    <i className="fa-solid fa-quote-right"></i>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">التفاصيل الكاملة</h2>
                </div>

                <div className="space-y-6 text-gray-700 leading-loose text-lg text-justify font-medium">
                  <p className="whitespace-pre-wrap ">
                    {newsItem.description}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <p className="text-gray-800 text-sm italic">
                    <i className="fa-solid fa-circle-info ml-1"></i>
                    تاريخ النشر الأصلي: {formatDate(newsItem.date)}
                  </p>
                  
                  {/* Share buttons functional */}
                  <div className="flex items-center gap-3">
                    <span className="text-ml text-gray-400 ml-2">مشاركة الخبر:</span>
                    
                    {/* Facebook */}
                    <button 
                      onClick={shareOnFacebook}
                      title="مشاركة على فيسبوك"
                      className="cursor-pointer w-10 h-10 rounded-full bg-[#1877F2] text-white hover:scale-110 transition-all shadow-md flex items-center justify-center"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </button>
                    
                    {/* WhatsApp */}
                    <button 
                      onClick={shareOnWhatsApp}
                      title="مشاركة على واتساب"
                      className="cursor-pointer w-10 h-10 rounded-full bg-[#25D366] text-white hover:scale-110 transition-all shadow-md flex items-center justify-center"
                    >
                      <i className="fa-brands fa-whatsapp text-lg"></i>
                    </button>
                    
                    {/* Copy Link */}
                    <button 
                      onClick={copyLink}
                      title="نسخ الرابط"
                      className={`cursor-pointer w-10 h-10 rounded-full transition-all shadow-md flex items-center justify-center ${copied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      <i className={`fa-solid ${copied ? 'fa-check' : 'fa-link'}`}></i>
                    </button>
                    
                    {/* alert when copy */}
                    {copied && <span className="text-[10px] text-green-500 font-bold animate-pulse">تم النسخ!</span>}
                  </div>
                </div>


              </div>
            </article>

            {/* Related Actions */}
            <div className="flex justify-center mt-6">
               <Link 
                to="/ImportantNews" 
                className="group flex items-center gap-3 bg-white px-8 py-4 rounded-2xl shadow-sm border border-gray-200 text-gray-700 font-bold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
               >
                 <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                 <span>تصفح المزيد من الأخبار الهامة</span>
               </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default PageNews;