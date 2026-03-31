import Cards_home from "../../Components/Cards_Home/Cards_home";
import { HomeHero } from "../../Components/HomeHero/HomeHero";
import { NewsSection } from "../../Components/NewsSection/NewsSection";
import { Helmet } from "react-helmet-async";


function Home() {

const Universities = [
    { name: "حكومية", type: 1, color: "bg-brand-800" },
    { name: "خاصة", type: 2, color: "bg-gold-600" },
    { name: "أهلية", type: 3, color: "bg-maroon-600" },
    { name: "معهد عالي", type: 4, color: "bg-gold-500" },
    { name: "أجنبية", type: 5, color: "bg-brand-600" },
    { name: "تكنولوجية", type: 6, color: "bg-brand-500" },
  ];


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

          <div
            className="grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
          >
            {Universities.map((item, index) => (
              <Cards_home
                key={index}
                title={item.name}
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
