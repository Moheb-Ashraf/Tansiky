import Cards_home from "../../Components/Cards_Home/Cards_home";
import { NewsSection } from "../../Components/NewsSection/NewsSection";
import { Helmet } from "react-helmet-async";


function Home() {

const Universities = [
    { name: "حكومية", type: 1, color: "bg-blue-500" },
    { name: "خاصة", type: 2, color: "bg-purple-500" },
    { name: "أهلية", type: 3, color: "bg-emerald-500" },
    { name: "معهد عالي", type: 4, color: "bg-orange-500" },
    { name: "أجنبية", type: 5, color: "bg-red-500" },
    { name: "تكنولوجية", type: 6, color: "bg-cyan-500" },
  ];


  return (
    <>

      {/* SEO Optimization for Home Page */}
      <Helmet>
        <title>تنسيقي ايجي | دليل تنسيق الجامعات والكليات والمعاهد المصرية</title>
        <meta name="description" content="تنسيقي ايجي هو دليلك الشامل لمعرفة تنسيق ومصاريف الجامعات الحكومية والخاصة والأهلية والمعاهد في مصر. ابحث عن الأقسام المتاحة ومعايير القبول." />
        <meta name="keywords" content="تنسيق الجامعات, تنسيق الكليات, مصاريف الجامعات, كليات مصر, تنسيقي ايجي" />
      </Helmet>


      <div className=" bg-[#f4f7fb]">
        <NewsSection />
      <div className="container mx-auto mt-10 pb-10
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 
      gap-10 justify-items-center">
        
              {
        Universities.map((item, index) => (
          <Cards_home
            key={index}
            title={item.name}
             link={item.type === 4 ? `/Institutes` : `/Universities/${item.type}`}
            color={item.color}
          />
        ))
      }

        
        

      </div>
      </div>
    </>
  );
}

export default Home;
