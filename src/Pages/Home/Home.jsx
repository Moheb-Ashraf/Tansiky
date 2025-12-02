import Cards_home from "../../Components/Cards_Home/Cards_home";
import { NewsSection } from "../../Components/News/News";

function Home() {
  return (
    <>
      <div className="min-h-screen bg-[#f4f7fb]">
        <NewsSection />
      <div className="container mx-auto mt-10 pb-10
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 
      gap-10 justify-items-center">
        
        <Cards_home />
        <Cards_home />
        <Cards_home />
        <Cards_home />
        <Cards_home />
        

      </div>
      </div>
    </>
  );
}

export default Home;
