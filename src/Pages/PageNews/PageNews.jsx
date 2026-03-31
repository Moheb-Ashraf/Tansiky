import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../lib/apiClient"; 
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
        const { data } = await api.get(`/api/News/${id}`);
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
    if (!newsItem?.title) return;
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
      <div className="text-center py-32 bg-app-bg min-h-screen">
        <div className="theme-card p-10 rounded-4xl shadow-sm inline-block border border-maroon-100">
          <i className="fa-solid fa-face-frown text-maroon-500 text-5xl mb-4"></i>
          <h2 className="theme-heading text-xl font-bold mb-4">عذراً، لم نتمكن من العثور على هذا الخبر.</h2>
          <button 
            onClick={() => navigate("/ImportantNews")}
            className="bg-brand-600 text-white px-6 py-2 rounded-xl hover:bg-brand-700 transition-all"
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

      <div className="bg-app-bg min-h-screen py-10 px-4 theme-page-pad md:px-8" dir="rtl">
        <div className="container mx-auto max-w-4xl">
          
          {/* Breadcrumbs / Back button */}
          <nav className="flex items-center gap-2 mb-8 text-sm font-medium">
            <Link to="/" className="theme-subtle hover:text-brand-600 transition-colors">الرئيسية</Link>
            <i className="fa-solid fa-chevron-left text-[10px] theme-subtle"></i>
            <Link to="/ImportantNews" className="theme-subtle hover:text-brand-600 transition-colors">الأخبار</Link>
            <i className="fa-solid fa-chevron-left text-[10px] theme-subtle"></i>
            <span className="text-brand-600 truncate max-w-[200px] md:max-w-md italic">تفاصيل الخبر</span>
          </nav>

          <div className="flex flex-col gap-6">
            
            {/* Main Article Card */}
            <article className="theme-card theme-elevated rounded-[2.5rem] shadow-sm overflow-hidden">
              
              {/* Card Header Info */}
              <div className="p-8 md:p-12 border-b border-(--theme-border) bg-linear-to-b from-brand-50/40 to-transparent">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-black uppercase tracking-widest shadow-md shadow-brand-100">
                    خبر عاجل
                  </span>
                  <div className="flex items-center gap-2 theme-subtle text-sm font-bold">
                    <i className="fa-regular fa-calendar-check text-brand-600"></i>
                    {formatDate(newsItem.date)}
                  </div>
                </div>
                
                <h1 className="theme-heading text-2xl theme-title-xl md:text-4xl font-black leading-tight md:leading-snug mb-6">
                  {newsItem.title}
                </h1>

                <div className="flex items-center gap-3 theme-subtle text-sm font-medium">
                   <div className="w-10 h-10 rounded-full bg-(--theme-muted) flex items-center justify-center theme-subtle">
                      <i className="fa-solid fa-user-pen"></i>
                   </div>
                   <span>بواسطة فريق تنسيقي ايجي</span>
                </div>
              </div>

              {/* Card Body: Content */}
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-brand-50 text-2xl rounded-2xl flex items-center justify-center text-brand-600 shadow-sm">
                    <i className="fa-solid fa-quote-right"></i>
                  </div>
                  <h2 className="theme-heading text-xl font-bold">التفاصيل الكاملة</h2>
                </div>

                <div className="space-y-6 theme-heading leading-loose text-lg text-justify font-medium">
                  <p className="whitespace-pre-wrap ">
                    {newsItem.description}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="mt-12 pt-8 border-t border-(--theme-border) flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <p className="theme-heading text-sm italic">
                    <i className="fa-solid fa-circle-info ml-1"></i>
                    تاريخ النشر الأصلي: {formatDate(newsItem.date)}
                  </p>
                  
                  {/* Share buttons functional */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm theme-subtle ml-2">مشاركة الخبر:</span>
                    
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
                      className={`cursor-pointer w-10 h-10 rounded-full transition-all shadow-md flex items-center justify-center ${copied ? 'bg-brand-600 text-white' : 'bg-(--theme-muted) theme-subtle hover:bg-gray-200'}`}
                    >
                      <i className={`fa-solid ${copied ? 'fa-check' : 'fa-link'}`}></i>
                    </button>
                    
                    {/* alert when copy */}
                    {copied && <span className="text-[10px] text-brand-600 font-bold animate-pulse">تم النسخ!</span>}
                  </div>
                </div>


              </div>
            </article>

            {/* Related Actions */}
            <div className="flex justify-center mt-6">
               <Link 
                to="/ImportantNews" 
                className="theme-card theme-elevated group flex items-center gap-3 px-8 py-4 rounded-2xl shadow-sm text-(--theme-text) font-bold hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-300"
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