import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function UniversityPage({ type = "university" }) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  
  // Extract all possible params from the route
  const { id, uniId, collegeId } = useParams();

  const [expanded, setExpanded] = useState(false);
  
  const isUni = type === "university";
  const isCollege = type === "college";
  const isDept = type === "department";

  async function getDetailsData() {
    try {
      setLoading(true);
      let apiUrl = "";
      
      // ✅ Updated URLs to work with the new Vite Proxy (/api/...)
      if (isUni) {
        apiUrl = `/api/Universities/${id}`;
      } else if (isCollege) {
        apiUrl = `/api/Universities/${uniId}/colleges`;
      } else if (isDept) {
        apiUrl = `/api/Colleges/${collegeId}/departments`; 
      }

      const { data } = await axios.get(apiUrl);

      if (isUni) {
        setDetails(data);
      } else {
        // Find the specific item (college or department) from the returned array
        // We use 'id' from useParams which represents the current item's ID
        const foundItem = data.find(item => item.id === parseInt(id));
        setDetails(foundItem);
      }
    }
    catch (error) {
      console.error("Error fetching details:", error);
      setDetails(null);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetailsData();
    // Reset expanded state when moving to a new page
    setExpanded(false);
    
    // Dependencies: trigger when ID or Type changes
  }, [id, uniId, collegeId, type]); 

  if (loading) return <Loading />;
  
  if (!details) return (
    <div className="text-center py-20 bg-[#f7fafd] min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-sm inline-block">
        <p className="text-gray-500 mb-4">البيانات غير متوفرة حالياً</p>
        <Link to="/" className="text-blue-600 underline">العودة للرئيسية</Link>
      </div>
    </div>
  );

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    details.nameAr + " " + (details.location || "")
  )}`;

  return (
    <div className="w-full min-h-screen bg-[#f7fafd] p-4 md:p-8 " dir="rtl">
      <div className="container mx-auto">
        
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200 flex gap-4 items-center">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-3xl shadow-sm border border-blue-100">
            {isUni ? "🎓" : isCollege ? "🏫" : "📚"} 
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-gray-800">
              {details.nameAr}
            </h1>
            <p className="text-gray-400 font-sans italic text-sm mt-1">{details.nameEn}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Right Column: Main Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
              <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-16 before:h-[3px] before:bg-blue-500 before:rounded-full">
                نبذة عن {isUni ? "الجامعة" : isCollege ? "الكلية" : "القسم"}
              </h2>
              <p className={`text-gray-600 leading-relaxed text-base transition-all duration-300 whitespace-pre-line ${expanded ? "" : "line-clamp-3"}`}>
                {details?.description || "لا يوجد وصف تفصيلي متاح حالياً."}
              </p>
              {details?.description && details.description.length > 150 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-blue-600 font-bold mt-3 hover:text-blue-800 transition cursor-pointer flex items-center gap-1"
                >
                  {expanded ? "عرض أقل ▲" : "عرض المزيد ▼"}
                </button>
              )}
            </div>

            {/* List Section (Colleges or Departments) */}
            {!isDept && (
              <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
                <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-16 before:h-[3px] before:bg-blue-500 before:rounded-full">
                  {isUni ? "الكليات المتاحة" : "الأقسام المتاحة"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {isUni ? (
                    details.colleges?.map((item, index) => (
                      <Link 
                        to={`/college/${details.id}/${item.id}`} 
                        key={index} 
                        className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <span className="font-medium group-hover:text-blue-700">{item.nameAr}</span>
                        <i className="fa-solid fa-chevron-left text-gray-300 group-hover:text-blue-500 transition-colors"></i>
                      </Link>
                    ))
                  ) : (
                    details.departments?.map((dept, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50 text-gray-700"
                      >
                        <div>
                          <p className="font-bold">{dept.nameAr}</p>
                          <p className="text-xs text-blue-500 mt-1">{dept.studyTypeAr}</p>
                        </div>
                        <i className="fa-solid fa-circle-check text-green-500"></i>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Left Column: Side Info */}
          <div className="space-y-6">
            
            {/* Costs & Admission */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-1">المصاريف السنوية</h3>
                <p className="text-2xl font-black text-green-600">
                  {details.fees ? `${details.fees.toLocaleString()} ج.م` : "غير محدد"}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-gray-400 text-sm mb-1">التنسيق / القبول</h3>
                <p className="text-lg font-bold text-gray-700">
                  {isUni ? "يختلف حسب الكلية" : (details.lastYearCoordination || details.minimumPercentage || "غير محدد")}
                   %
                </p>
              </div>
            </div>

            {/* Location & Contact */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
              <h2 className="text-lg font-bold mb-4">التواصل والموقع</h2>
              
              {details.location && (
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-3 flex items-start gap-2">
                    <i className="fa-solid fa-location-dot mt-1 text-red-500"></i>
                    {details.location}
                  </p>
                  <a href={mapSearchUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl w-full font-bold hover:bg-red-100 transition">
                    <i className="fa-solid fa-map-location-dot"></i>
                    فتح الخريطة
                  </a>
                </div>
              )}

              {details.officialWebsite && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-400 text-xs mb-2">الموقع الإلكتروني الرسمي:</p>
                  <a
                    href={details.officialWebsite.startsWith('http') ? details.officialWebsite : `https://${details.officialWebsite}`}  
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 font-medium break-all hover:underline flex items-center gap-2"
                  >
                    <i className="fa-solid fa-globe text-sm"></i>
                    زيارة الموقع
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}