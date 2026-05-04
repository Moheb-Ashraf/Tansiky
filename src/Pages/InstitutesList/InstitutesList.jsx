import api from "../../lib/apiClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";

export default function InstitutesList() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getInstitutes() {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/Universities/type/4`);
      setInstitutes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getInstitutes(); }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>دليل المعاهد العليا المعتمدة | تنسيقي ايجي</title>
        <meta name="description" content="تصفح قائمة المعاهد العليا المعتمدة في مصر، تعرف على تنسيق العام الماضي، التخصصات المتاحة والمواقع الجغرافية لكل معهد." />
        <meta name="keywords" content="معاهد عليا، تنسيق المعاهد، معهد هندسة، معهد حاسبات، تنسيقي ايجي، معاهد معتمدة" />
      </Helmet>

      <div className="w-full bg-app-bg min-h-screen" dir="rtl">
        <div className="container mx-auto px-6 py-10">

          <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="border-r-4 border-brand-600 pr-4">
              <h1 className="theme-heading text-3xl font-black">دليل المعاهد العليا</h1>
              <p className="theme-subtle font-medium mt-1">
                استكشف التخصصات المتاحة في المعاهد المعتمدة
              </p>
            </div>
            <span className="self-start sm:self-auto text-sm font-semibold px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 border border-brand-100">
              {institutes.length} معهد
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {institutes.map((inst, index) => (
              <Link
                to={`/InstituteDetails/${inst.id}`}
                key={inst.id}
                className="theme-card group rounded-2xl border border-transparent hover:border-brand-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-4"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-2xl group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                  <i className="fa-solid fa-school" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="theme-heading text-base font-bold leading-snug group-hover:text-brand-600 transition-colors duration-200 line-clamp-3">
                    {inst.nameAr}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs theme-subtle font-medium">
                    <i className="fa-solid fa-location-dot text-brand-400" />
                    {inst.governorateAr}
                  </span>
                </div>

                <div className="shrink-0 w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                  <i className="fa-solid fa-arrow-left text-sm" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}