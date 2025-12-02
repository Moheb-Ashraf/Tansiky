
import { Link } from "react-router-dom";

export default function ImportantNews() {
  const cards = [
    {
      tag: "أخبار الجامعات",
      title: "افتتاح جامعة تكنولوجية جديدة في القاهرة",
      desc: "تم افتتاح جامعة تكنولوجية حديثة مجهزة بأحدث المعامل والتقنيات التعليمية",
      date: "٢٠ نوفمبر ٢٠٢٥",
    },
    {
      tag: "منح دراسية",
      title: "منح دراسية جديدة متاحة للطلاب المتفوقين",
      desc: "تم الإعلان عن 500 منحة دراسية كاملة للطلاب الحاصلين على أعلى الدرجات",
      date: "٢٣ نوفمبر ٢٠٢٥",
    },
    {
      tag: "قبول وتسجيل",
      title: "فتح باب التقديم للجامعات الحكومية للعام الدراسي الجديد",
      desc: "أعلنت وزارة التعليم العالي عن فتح باب التقديم للجامعات الحكومية بداية من الأسبوع القادم",
      date: "٢٥ نوفمبر ٢٠٢٥",
    },
  ];



  return (
    <div className="min-h-screen bg-[#f4f7fb] py-10 px-4 md:px-8 lg:px-16 rtl">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="flex items-center  justify-between mb-8 ">
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
          {cards.map((c, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col justify-between"
            >
              <header className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-blue-600">
                    <i className="fa-solid fa-file-lines"></i>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                    {c.tag}
                  </span>
                </div>
                {/* date icon on top-left */}
                <div className="text-gray-400 text-sm flex items-center gap-2">
                  <i className="fa-regular fa-calendar"></i>
                  <span className="hidden sm:inline">{c.date}</span>
                </div>
              </header>

              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800 leading-relaxed mb-2">
                  {c.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>

              <footer className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  to="/ImportantNews/PageNews"
                  className="text-blue-600 font-medium hover:underline inline-flex items-center gap-2"
                >
                  <span>اقرأ المزيد</span>
                  <i className="fa-solid fa-arrow-left text-sm"></i>
                </Link>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
