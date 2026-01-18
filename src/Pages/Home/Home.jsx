import Cards_home from "../../Components/Cards_Home/Cards_home";
import { NewsSection } from "../../Components/NewsSection/NewsSection";

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
            link={`/Universities/${item.type}`}
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
