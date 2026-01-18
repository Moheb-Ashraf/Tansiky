import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function UniversityPage({ type = "university" }) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  
  const { id, uniId, collegeId } = useParams(); 

  // type 
  const isUni = type === "university";
  const isCollege = type === "college";
  const isDept = type === "department";

  async function getDetailsData() {
    try {
      setLoading(true);
      let apiUrl = "";
      
      if (isUni) apiUrl = `http://tansiqy.runasp.net/api/Universities/${id}`;
      else if (isCollege) apiUrl = `http://tansiqy.runasp.net/api/Universities/${uniId}/colleges`;
      else if (isDept) apiUrl = `http://tansiqy.runasp.net/api/Colleges/${collegeId}/departments`; 

      const { data } = await axios.get(apiUrl);

      if (isUni) {
        setDetails(data);
      } else {
        // البحث داخل المصفوفة
        const foundItem = data.find(item => item.id === parseInt(id));
        setDetails(foundItem);
      }
    }
    catch (error) {
      console.error("Error:", error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetailsData();
  }, [id, type]);

  if (loading) return <Loading />;
  if (!details) return <div className="text-center py-10">البيانات غير متوفرة حالياً</div>;

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    details.nameAr + " " + (details.location || "")
  )}`;

  return (
    <div className="w-full min-h-screen bg-[#f7fafd] p-4 md:p-8 " dir="rtl">
      <div className="container mx-auto">
        
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200 flex gap-3 items-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-4xl">
            {isUni ? "🎓" : isCollege ? "🏫" : "📚"} 
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{details.nameAr}</h1>
            <p className="text-gray-500 mt-2 text-sm">
              {isUni && `${details.collegesCount} كلية متاحة`}
              {isCollege && `${details.departmentsCount || 0} قسم متاح`}
              {isDept && `تفاصيل القسم التخصصي`}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200">
          <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-full before:h-[3px] before:bg-blue-500 before:rounded-full">
            نبذة عن {isUni ? "الجامعة" : isCollege ? "الكلية" : "القسم"}
          </h2>
          <p className="text-gray-600 leading-relaxed text-base">
            {details.description || "لا يوجد وصف تفصيلي متاح حالياً."}
          </p>
        </div>

        {/* Categories Section */}
        {!isDept && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200">
            <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-full before:h-[3px] before:bg-blue-500 before:rounded-full">
              {isUni ? "الكليات المتاحة" : "الأقسام المتاحة"}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {isUni ? (
                // من جامعة إلى كلية
                details.colleges?.map((item, index) => (
                  <Link to={`/college/${details.id}/${item.id}`} key={index} className="flex items-center justify-between p-3 border rounded-xl bg-gray-50 text-gray-700 hover:bg-blue-50 transition">
                    {item.nameAr}
                    <span className="text-blue-500 text-xl">←</span>
                  </Link>
                ))
              ) : (
                // من كلية إلى قسم
                details.departments?.map((dept, index) => (
                  <Link to={`/department/${details.id}/${dept.id}`} key={index} className="flex items-center justify-between p-3 border rounded-xl bg-gray-50 text-gray-700 hover:bg-green-50 transition">
                    <div>
                      <p className="font-bold">{dept.nameAr}</p>
                      <p className="text-xs text-gray-400">{dept.studyType === "Literary" ? "أدبي" : "علمي"}</p>
                    </div>
                    <span className="text-green-500 text-xl">←</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}

        {/* Costs & Admission */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-full before:h-[3px] before:bg-blue-500 before:rounded-full">المصاريف</h2>
            <p className="text-gray-700 font-bold text-green-600">{details.fees?.toLocaleString() || "غير محدد"} جنيه</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
            <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-full before:h-[3px] before:bg-blue-500 before:rounded-full">التنسيق</h2>
            <p className="text-gray-700">
              {isUni ? "يختلف حسب الكلية." : `تنسيق العام الماضي: ${details.lastYearCoordination || details.minimumPercentage || "غير محدد"}`}
            </p>
          </div>
        </div>

        {/* Location & Website */}
        {(details.location || details.officialWebsite) && (
          <div className="grid md:grid-cols-2 gap-6 mt-6 pb-10">
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
              <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-full before:h-[3px] before:bg-blue-500 before:rounded-full">الموقع</h2>
              <p className="text-red-600 text-sm mb-2">{details.location} </p>
              <a href={mapSearchUrl} target="_blank" rel="noopener noreferrer" className="block text-center bg-red-50 text-red-600 px-4 py-3 rounded-xl w-full font-bold">عرض على الخريطة</a>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
              <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-full before:h-[3px] before:bg-blue-500 before:rounded-full">الموقع الرسمي</h2>
              <a href={`https://${details.officialWebsite}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all"> {details.officialWebsite || "زيارة الرابط"}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}