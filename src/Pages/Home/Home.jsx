import Cards_home from "../../Components/Cards_Home/Cards_home";
import { HomeHero } from "../../Components/HomeHero/HomeHero";
import { NewsSection } from "../../Components/NewsSection/NewsSection";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const TYPE_COLORS = [
  "bg-brand-800",
  "bg-gold-600",
  "bg-maroon-600",
  "bg-gold-500",
  "bg-brand-600",
  "bg-brand-500",
];

function Home() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/Universities/types")
      .then((res) => {
        if (!res.ok) throw new Error("فشل تحميل البيانات");
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((item, index) => ({
          name: item.typeNameAr,
          count: item.typeNameAr.includes("معاهد")
                ? `${item.totalUniversities} معهد`
                : `${item.totalUniversities} جامعة`,
          type: index + 1,
          color: TYPE_COLORS[index] ?? "bg-brand-600",
        }));
        setUniversities(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>تنسيقي ايجي | دليل تنسيق الجامعات والكليات والمعاهد المصرية</title>
        <meta name="description" content="تنسيقي ايجي هو دليلك الشامل لمعرفة تنسيق ومصاريف الجامعات الحكومية والخاصة والأهلية والمعاهد في مصر. ابحث عن الأقسام المتاحة ومعايير القبول." />
        <meta name="keywords" content="تنسيق الجامعات, تنسيق الكليات, مصاريف الجامعات, كليات مصر, تنسيقي ايجي" />
      </Helmet>

      <div className="bg-app-bg">
        <HomeHero />

        <div className="container mx-auto px-4 pt-10">
          <NewsSection />
        </div>

        <section className="container mx-auto px-4 pb-14 pt-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-black text-brand-900 md:text-3xl">
              تصفح حسب نوع المؤسسة
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-slate-600">
              اختر التصنيف المناسب للانتقال إلى القوائم والتفاصيل والتنسيق
            </p>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-linear-to-l from-gold-400 to-brand-600" />
          </div>

          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          <div className="grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-48 w-64 animate-pulse rounded-[2.5rem] bg-slate-200"
                  />
                ))
              : universities.map((item, index) => (
                  <Cards_home
                    key={item.type}
                    title={item.name}
                    count={item.count}
                    link={item.type === 4 ? `/Institutes` : `/Universities/${item.type}`}
                    color={item.color}
                    animationDelay={index * 70}
                  />
                ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;