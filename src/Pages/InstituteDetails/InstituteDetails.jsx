import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function InstituteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  
  // State for sub-departments data
  const [allDepartments, setAllDepartments] = useState({}); 

  // Main Fetch Function
  async function getData() {
    try {
      setLoading(true);
      
      // 1. Get main institute data
      const res = await axios.get(`http://tansiqy.runasp.net/api/Universities/${id}`);
      const instituteData = res.data;
      setDetails(instituteData);

      // 2. Fetch departments for each college automatically
      if (instituteData.colleges && instituteData.colleges.length > 0) {
        const deptPromises = instituteData.colleges.map((col) =>
          axios.get(`http://tansiqy.runasp.net/api/Colleges/${col.id}`).catch(() => null)
        );

        const responses = await Promise.all(deptPromises);
        const departmentsMap = {};

        responses.forEach((res) => {
          if (res && res.data) {
            // Map departments to their college ID
            departmentsMap[res.data.id] = res.data.departments;
          }
        });

        setAllDepartments(departmentsMap);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getData(); }, [id]);

  if (loading) return <Loading />;
  if (!details) return <div className="text-center py-20 font-sans">No data found</div>;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.nameAr + " " + (details.location || ""))}`;

  return (
    <div className="w-full min-h-screen bg-[#fffcf5] pb-20 font-sans text-right" dir="rtl">
      
      {/* Header Section */}
      <div className="bg-linear-to-r from-amber-500 to-orange-600 pt-10 pb-24 px-4 shadow-lg">
        <div className="container mx-auto max-w-5xl">
          <button onClick={() => navigate(-1)} className="text-white/90 hover:text-white mb-6 flex items-center gap-2 font-bold cursor-pointer">
            <i className="fa-solid fa-arrow-right"></i> العودة للقائمة
          </button>
          
          <div className="flex flex-col md:flex-row items-center gap-8 text-white">
            <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-2xl text-amber-500">
               🏫
            </div>
            <div className="text-center md:text-right flex-1">
               <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-white/10">
                {details.typeAr || "معهد عالي"}
               </span>
               <h1 className="text-3xl md:text-4xl font-black mt-3 leading-tight">{details.nameAr}</h1>
               <p className="flex items-center justify-center md:justify-start gap-2 mt-4 text-white/80 text-sm italic">
                 <i className="fa-solid fa-location-dot"></i> {details.location}
               </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 -mt-12">
        
        {/* Specializations Grid */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-2 h-8 bg-amber-500 rounded-full"></div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">التخصصات والأقسام المتاحة</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {details.colleges?.map((item) => (
              <div key={item.id} className="bg-white rounded-4xl p-6 shadow-sm border border-amber-100 flex flex-col hover:shadow-xl hover:border-amber-400 transition-all duration-300">
                
                {/* College Info */}
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-amber-50 text-amber-600 p-3 rounded-2xl">
                    <i className="fa-solid fa-layer-group text-xl"></i>
                  </div>
                  <span className="text-[10px] font-black bg-slate-50 px-3 py-1 rounded-full text-slate-400 italic font-sans">ID: {item.id}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-4">{item.nameAr}</h3>
                
                {/*  Departments  */}
                <div className="mb-6 space-y-2">
                   <p className="text-sm font-black text-amber-600 uppercase tracking-widest mb-3 border-b border-amber-50 pb-2">
                     <i className="fa-solid fa-tags"></i> الأقسام الفرعية:
                   </p>
                   <div className="flex flex-wrap gap-2">
                      {allDepartments[item.id] && allDepartments[item.id].length > 0 ? (
                        allDepartments[item.id].map(dept => (
                          <span key={dept.id} className="bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-xl font-bold border border-blue-100 flex items-center gap-1">
                             <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                             {dept.nameAr}
                          </span>
                        ))
                      ) : (
                        <p className="text-xs text-slate-300 italic">لا توجد أقسام مسجلة لهذه الشعبة</p>
                      )}
                   </div>
                </div>
                
                {/* Fees and Coordination Footer */}
                <div className="mt-auto grid grid-cols-2 gap-3 pt-5 border-t border-slate-50 font-sans">
                   <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center">
                      <p className="text-sm text-slate-400 font-bold mb-1 uppercase"> المصاريف للعام الماضي</p>
                      <p className="text-lg font-black text-emerald-600">{item.fees?.toLocaleString()} ج.م</p>
                   </div>
                   <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center">
                      <p className="text-sm text-slate-400 font-bold mb-1 uppercase">التنسيق بالنسبة للعام الماضي </p>
                      <p className="text-lg font-black text-amber-600">{item.lastYearCoordination || details.lastYearCoordination}%</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Description */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 mb-10 shadow-sm border border-slate-100">
           <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
             <i className="fa-solid fa-circle-info text-amber-500"></i> نظام الدراسة والمؤهلات
           </h2>
           <div>
              <p
                className={`text-gray-600 leading-relaxed text-base transition-all duration-300 whitespace-pre-line ${
                  expanded ? "" : "line-clamp-3"
                }`}
              >
                {details?.description || "لا يوجد وصف تفصيلي متاح حالياً."}
              </p>

              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 font-semibold mt-1 hover:underline cursor-pointer"
              >
                {expanded ? "عرض أقل" : "عرض المزيد"}
              </button>
            </div>
        </div>

        {/* Contact and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-globe text-blue-400"></i> الموقع الإلكتروني
                </h3>
                <p className="text-slate-400 text-sm mb-6 font-sans italic">{details.officialWebsite || "Not available"}</p>
              </div>
              <a href={details.officialWebsite?.startsWith('http') ? details.officialWebsite : `https://${details.officialWebsite}`} 
                 target="_blank" rel="noreferrer" 
                 className="block text-center bg-white text-slate-900 py-4 rounded-2xl font-bold hover:bg-amber-500 hover:text-white transition-all z-10">
                 زيارة الموقع الرسمي
              </a>
              <i className="fa-solid fa-link absolute -bottom-10 -left-10 text-[10rem] text-white/5 opacity-10"></i>
           </div>

           <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-map-location-dot text-red-500"></i> خريطة الوصول
                </h3>
                <p className="text-slate-500 text-sm mb-6 italic">{details.governorateAr} - {details.location}</p>
              </div>
              <a href={mapUrl} target="_blank" rel="noreferrer" className="block text-center border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white py-4 rounded-2xl font-bold transition-all uppercase tracking-widest text-xs">
                 Open Map
              </a>
           </div>
        </div>

      </div>
    </div>
  );
}