/* eslint-disable react/prop-types */
import api from "../../lib/apiClient";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";

export default function UniversityPage({ type = "university" }) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [expanded, setExpanded] = useState(false);

  // Route params mapping:
  // /university/:id            → id = university ID
  // /college/:uniId/:id        → uniId = university ID, id = college ID
  // /department/:collegeId/:id → collegeId = college ID, id = department ID
  const { id, uniId, collegeId } = useParams();

  const isUni     = type === "university";
  const isCollege = type === "college";
  const isDept    = type === "department";

  const getDetailsData = useCallback(async () => {
    try {
      setLoading(true);
      let apiUrl = "";

      if (isUni) {
        // GET /api/Universities/:id
        apiUrl = `/api/Universities/${id}`;
      } else if (isCollege) {
        // GET /api/Universities/colleges/:id
        // :id here is the college ID coming from /college/:uniId/:id
        apiUrl = `/api/Universities/colleges/${id}`;
      } else if (isDept) {
        // GET /api/Universities/departments/:id
        // :id here is the department ID coming from /department/:collegeId/:id
        apiUrl = `/api/Universities/departments/${id}`;
      }

      const { data } = await api.get(apiUrl);

      // All three endpoints return a single object directly — no .find() needed
      setDetails(data);

    } catch (error) {
      console.error("Error fetching details:", error);
      setDetails(null);
    } finally {
      setLoading(false);
    }
  }, [id, uniId, collegeId, isUni, isCollege, isDept]);

  useEffect(() => {
    getDetailsData();
    setExpanded(false);
  }, [getDetailsData]);

  // ── Early Returns ───────────────────────────────────────────────────────────

  if (loading) return <Loading />;

  if (!details) return (
    <div className="text-center py-20 bg-app-bg min-h-screen">
      <div className="theme-card p-8 rounded-2xl shadow-sm inline-block">
        <p className="theme-subtle mb-4">البيانات غير متوفرة حالياً</p>
        <Link to="/" className="text-brand-600 underline">العودة للرئيسية</Link>
      </div>
    </div>
  );

  // Build Google Maps search URL from entity name + location
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    details.nameAr + " " + (details.location || "")
  )}`;

  // ── Main Render ─────────────────────────────────────────────────────────────
  return (
    <>
      {/* Dynamic page title and meta description for SEO */}
      {details && (
        <Helmet>
          <title>{details.nameAr} | تنسيقي ايجي</title>
          <meta
            name="description"
            content={`تعرف على تنسيق ومصاريف وأقسام ${details.nameAr} ومعلومات القبول الرسمية.`}
          />
        </Helmet>
      )}

      <div className="w-full min-h-screen bg-app-bg p-4 md:p-8" dir="rtl">
        <div className="container mx-auto">

          {/* ── Header Card ─────────────────────────────────────────────────── */}
          <div className="theme-card rounded-2xl shadow p-6 mb-6 flex gap-4 items-center">
            <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center text-3xl shadow-sm border border-brand-100">
              {isUni ? "🎓" : isCollege ? "🏫" : "📚"}
            </div>
            <div>
              <h1 className="theme-heading text-xl md:text-2xl font-black">
                {details.nameAr}
              </h1>
              <p className="theme-subtle font-sans italic text-sm mt-1">
                {details.nameEn}
              </p>
            </div>
          </div>

          {/* ── Content Grid ────────────────────────────────────────────────── */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">

              {/* About / Description */}
              <div className="theme-card rounded-2xl shadow p-6">
                <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-16 before:h-[3px] before:bg-brand-600 before:rounded-full">
                  نبذة عن {isUni ? "الجامعة" : isCollege ? "الكلية" : "القسم"}
                </h2>
                <p
                  className={`theme-subtle leading-relaxed text-base transition-all duration-300 whitespace-pre-line ${
                    expanded ? "" : "line-clamp-3"
                  }`}
                >
                  {details?.description || "لا يوجد وصف تفصيلي متاح حالياً."}
                </p>

                {/* Show expand/collapse toggle only when text is long enough */}
                {details?.description && details.description.length > 150 && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-brand-600 font-bold mt-3 hover:text-brand-800 transition cursor-pointer flex items-center gap-1"
                  >
                    {expanded ? "عرض أقل ▲" : "عرض المزيد ▼"}
                  </button>
                )}
              </div>

              {/* Colleges list (university view) or Departments list (college view) */}
              {!isDept && (
                <div className="theme-card rounded-2xl shadow p-6">
                  <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-16 before:h-[3px] before:bg-brand-600 before:rounded-full">
                    {isUni ? "الكليات المتاحة" : "الأقسام المتاحة"}
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {isUni ? (
                      // Each college links to /college/:uniId/:collegeId
                      details.colleges?.map((item, index) => (
                        <Link
                          to={`/college/${details.id}/${item.id}`}
                          key={index}
                          className="flex items-center justify-between p-4 border border-(--theme-border) rounded-xl bg-(--theme-muted) theme-heading hover:border-brand-300 hover:bg-brand-50 transition-all group"
                        >
                          <span className="font-medium group-hover:text-brand-700">
                            {item.nameAr}
                          </span>
                          <i className="fa-solid fa-chevron-left theme-subtle group-hover:text-brand-500 transition-colors"></i>
                        </Link>
                      ))
                    ) : (
                      // Departments are display-only (no navigation)
                      details.departments?.map((dept, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-(--theme-border) rounded-xl bg-(--theme-muted) theme-heading"
                        >
                          <div>
                            <p className="font-bold">{dept.nameAr}</p>
                            <p className="text-xs text-brand-600 mt-1">
                              {dept.studyTypeAr}
                            </p>
                          </div>
                          <i className="fa-solid fa-circle-check text-brand-600"></i>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">

              {/* Fees & Coordination — colleges and departments only */}
              {!isUni && (
                <div className="theme-card rounded-2xl shadow p-6">

                  {/* Annual fees */}
                  <div className="mb-6">
                    <h3 className="theme-subtle text-sm mb-1">المصاريف السنوية</h3>
                    <p className="text-2xl font-black text-brand-700">
                      {details?.fees
                        ? `${Number(details.fees).toLocaleString()} ج.م`
                        : "غير محدد"}
                    </p>
                  </div>

                  {/* Minimum coordination/admission percentage */}
                  <div className="pt-4 border-t border-(--theme-border)">
                    <h3 className="theme-subtle text-sm mb-1">التنسيق / القبول</h3>
                    <p className="text-lg font-bold theme-heading">
                      {(() => {
                        const value =
                          details?.lastYearCoordination ?? details?.minimumPercentage;
                        return value ? `${value} %` : "غير محدد";
                      })()}
                    </p>
                  </div>
                </div>
              )}

              {/* Location & Contact */}
              <div className="theme-card rounded-2xl shadow p-6">
                <h2 className="theme-heading text-lg font-bold mb-4">
                  التواصل والموقع
                </h2>

                {details.location && (
                  <div className="mb-4">
                    <p className="theme-subtle text-sm mb-3 flex items-start gap-2">
                      <i className="fa-solid fa-location-dot mt-1 text-brand-600"></i>
                      {details.location}
                    </p>
                    {/* Open location in Google Maps */}
                    <a
                      href={mapSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-brand-50 text-brand-700 py-3 rounded-xl w-full font-bold hover:bg-brand-100 transition"
                    >
                      <i className="fa-solid fa-map-location-dot"></i>
                      فتح الخريطة
                    </a>
                  </div>
                )}

                {details.officialWebsite && (
                  <div className="pt-4 border-t border-(--theme-border)">
                    <p className="theme-subtle text-xs mb-2">
                      الموقع الإلكتروني الرسمي:
                    </p>
                    {/* Ensure URL always has a valid protocol prefix */}
                    <a
                      href={
                        details.officialWebsite.startsWith("http")
                          ? details.officialWebsite
                          : `https://${details.officialWebsite}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 font-medium break-all hover:underline flex items-center gap-2"
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
    </>
  );
}