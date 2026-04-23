import api from "../../lib/apiClient";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";

export default function InstituteDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  // State for sub-departments data
  const [allDepartments, setAllDepartments] = useState({}); 

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      
      const res = await api.get(`/api/Universities/${id}`);
      const instituteData = res.data;
      setDetails(instituteData);

      if (instituteData.colleges && instituteData.colleges.length > 0) {
        const deptPromises = instituteData.colleges.map((col) =>
          api.get(`/api/Colleges/${col.id}`).catch(() => null)
        );

        const responses = await Promise.all(deptPromises);
        const departmentsMap = {};

        responses.forEach((res) => {
          if (res && res.data) {
            departmentsMap[res.data.id] = res.data.departments;
          }
        });

        setAllDepartments(departmentsMap);
      } else {
        setAllDepartments({});
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { 
    getData(); 
  }, [getData]);

  if (loading) return <Loading />;
  if (!details) return <div className="text-center py-20 font-sans bg-app-bg min-h-screen theme-subtle">لا توجد بيانات لهذا المعهد.</div>;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.nameAr + " " + (details.location || ""))}`;

  return (
    <>

    <Helmet>
        <title>{details.nameAr} | تنسيقي ايجي</title>
        <meta name="description" content={`تعرف على أقسام، مصاريف، وتنسيق ${details.nameAr}. معلومات شاملة عن نظام الدراسة والموقع الجغرافي.`} />
        <meta name="keywords" content={`${details.nameAr}, تنسيق المعاهد، مصاريف المعهد، أقسام المعهد، تنسيقي ايجي`} />
      </Helmet>
    
    <div className="w-full min-h-screen bg-app-bg pb-20 font-sans text-right theme-page-pad" dir="rtl">
      
      {/* Header Section */}
      <div className="bg-linear-to-l from-brand-600 to-brand-800 pt-10 pb-24 px-4 shadow-lg">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-8 text-white">
            <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-2xl text-brand-600">
               🏫
            </div>
            <div className="text-center md:text-right flex-1">
               <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-white/10">
                {details.typeAr || "معهد عالي"}
               </span>
              <h1 className="text-3xl theme-title-xl md:text-4xl font-black mt-3 leading-tight">{details.nameAr}</h1>
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
            <div className="w-2 h-8 bg-brand-600 rounded-full"></div>
            <h2 className="theme-heading text-2xl font-black tracking-tight">التخصصات والأقسام المتاحة</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {details.colleges?.map((item) => (
              <div key={item.id} className="theme-card theme-elevated rounded-4xl p-6 shadow-sm border border-brand-100 flex flex-col hover:shadow-xl hover:border-brand-300 transition-all duration-300">
                
                {/* College Info */}
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-brand-50 text-brand-600 p-3 rounded-2xl">
                    <i className="fa-solid fa-layer-group text-xl"></i>
                  </div>
                  <span className="text-[10px] font-black bg-(--theme-muted) px-3 py-1 rounded-full theme-subtle italic font-sans">ID: {item.id}</span>
                </div>

                <h3 className="theme-heading text-2xl font-bold mb-4">{item.nameAr}</h3>
                
                {/*  Departments  */}
                <div className="mb-6 space-y-2">
                   <p className="text-sm font-black text-brand-700 uppercase tracking-widest mb-3 border-b border-brand-50 pb-2">
                     <i className="fa-solid fa-tags"></i> الأقسام الفرعية:
                   </p>
                   <div className="flex flex-wrap gap-2">
                      {allDepartments[item.id] && allDepartments[item.id].length > 0 ? (
                        allDepartments[item.id].map(dept => (
                          <span key={dept.id} className="bg-brand-50 text-brand-800 text-sm px-3 py-1.5 rounded-xl font-bold border border-brand-100 flex items-center gap-1">
                             <span className="w-1 h-1 bg-brand-500 rounded-full"></span>
                             {dept.nameAr}
                          </span>
                        ))
                      ) : (
                        <p className="text-xs theme-subtle italic">لا توجد أقسام مسجلة لهذه الشعبة</p>
                      )}
                   </div>
                </div>
                
                {/* Fees and Coordination Footer */}
                <div className="mt-auto grid grid-cols-2 gap-3 pt-5 border-t border-(--theme-border) font-sans">
                   <div className="bg-(--theme-muted) p-3 rounded-2xl flex flex-col items-center">
                      <p className="text-[10px] theme-subtle font-bold mb-1 uppercase">المصاريف</p>
                      <p className="text-lg font-black text-brand-700">{item.fees?.toLocaleString()} ج.م</p>
                   </div>
                   <div className="bg-(--theme-muted) p-3 rounded-2xl flex flex-col items-center">
                      <p className="text-[10px] theme-subtle font-bold mb-1 uppercase">تنسيق العام الماضي</p>
                      <p className="text-lg font-black text-brand-700">{item.lastYearCoordination || details.lastYearCoordination}%</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Description */}
        <div className="theme-card theme-elevated rounded-[2.5rem] p-8 md:p-12 mb-10 shadow-sm">
           <h2 className="theme-heading text-xl font-black mb-6 flex items-center gap-2">
             <i className="fa-solid fa-circle-info text-brand-600"></i> نظام الدراسة والمؤهلات
           </h2>
           <div>
              <p
                className={`theme-subtle leading-relaxed text-base transition-all duration-300 whitespace-pre-line ${
                  expanded ? "" : "line-clamp-3"
                }`}
              >
                {details?.description || "لا يوجد وصف تفصيلي متاح حالياً."}
              </p>

              {details?.description && details.description.length > 150 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-brand-600 font-bold mt-2 hover:underline cursor-pointer"
                >
                  {expanded ? "عرض أقل" : "عرض المزيد"}
                </button>
              )}
            </div>
        </div>

        {/* Contact and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="theme-glass border rounded-[2.5rem] p-8  flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-brand-600">
                  <i className="fa-solid fa-globe text-brand-400"></i> الموقع الإلكتروني
                </h3>
                <p className="text-slate-800 text-sm mb-6 font-sans italic">{details.officialWebsite || "غير متوفر"}</p>
              </div>
              <a href={details.officialWebsite ? (details.officialWebsite.startsWith('http') ? details.officialWebsite : `https://${details.officialWebsite}`) : "#"} 
                 target="_blank" rel="noreferrer" 
                 className="block text-center bg-white text-brand-600 py-4 rounded-2xl font-bold hover:bg-brand-600 hover:text-white transition-all z-10">
                 زيارة الموقع الرسمي
              </a>
              <i className="fa-solid fa-link absolute -bottom-10 -left-10 text-[10rem] text-white/5 opacity-10"></i>
           </div>

           <div className="theme-card theme-elevated rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="theme-heading text-xl font-bold mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-map-location-dot text-brand-600"></i> خريطة الوصول
                </h3>
                <p className="theme-subtle text-sm mb-6 italic">{details.governorateAr} - {details.location}</p>
              </div>
              <a href={mapUrl} target="_blank" rel="noreferrer" className="block text-center border-2 border-brand-700 text-brand-800 hover:bg-brand-700 hover:text-white py-4 rounded-2xl font-bold transition-all uppercase tracking-widest text-xs">
                 فتح الخريطة
              </a>
           </div>
        </div>

      </div>
    </div>
    </>
  );
}