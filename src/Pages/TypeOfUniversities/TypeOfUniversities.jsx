import { Link } from "react-router-dom"
import Cards_home from "../../Components/Cards_Home/Cards_home"

function TypeOfUniversities() {
    return <>
<div className="min-h-screen bg-[#f4f7fb] py-10 px-4 md:px-8 lg:px-16 rtl">
    <div className="max-w-7xl mx-auto" >
    <div className="flex items-center  justify-between mb-8 ">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-500 hover:text-gray-800 transition">
              العودة للرئيسية
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-3">
              
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white shadow-sm">
                <i className="fa-solid fa-graduation-cap text-blue-600"></i>
              </span>
              <span>أنواع الجامعات </span>
            </h1>
          </div>

        </div>
</div>
<div className="container mx-auto my-10
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 
      gap-10 justify-items-center">
        
        <Cards_home></Cards_home>
        

      </div>

</div>
    </>
}

export default TypeOfUniversities
