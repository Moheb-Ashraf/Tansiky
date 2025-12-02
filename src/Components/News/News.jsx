import { Link } from "react-router-dom";

export function NewsSection() {
  return (
    <section className="my-8">
      <Link
        to="/ImportantNews"
        className="block bg-linear-to-br from-blue-300 to-blue-600 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 group"
      >
        <div className="flex items-center justify-between text-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <i className="fa-solid fa-newspaper text-white"></i>
            </div>
            <div>
              <h2 className="text-white mb-1 text-2xl md:text-xl">أحدث الأخبار</h2>
              <p className="text-blue-100 text-xl md:text-base">تابع آخر أخبار الجامعات والقبول</p>
            </div>
            
          </div>
                    <i className="fa-solid fa-arrow-left text-white group-hover:scale-125 transition-transform duration-300"></i>
        </div>
      </Link>
    </section>
  );
}
