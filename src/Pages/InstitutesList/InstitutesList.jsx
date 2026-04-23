import api from "../../lib/apiClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";

export default function InstitutesList() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
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
    
    {/* SEO */}
    <Helmet>
        <title>دليل المعاهد العليا المعتمدة | تنسيقي ايجي</title>
        <meta name="description" content="تصفح قائمة المعاهد العليا المعتمدة في مصر، تعرف على تنسيق العام الماضي، التخصصات المتاحة والمواقع الجغرافية لكل معهد." />
        <meta name="keywords" content="معاهد عليا، تنسيق المعاهد، معهد هندسة، معهد حاسبات، تنسيقي ايجي، معاهد معتمدة" />
      </Helmet>

    <div className="w-full bg-app-bg min-h-screen p-6" dir="rtl">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="mb-10 border-r-8 border-brand-600 pr-4">
          <h1 className="theme-heading text-3xl font-black font-sans">دليل المعاهد العليا</h1>
          <p className="theme-subtle font-medium mt-1">استكشف التخصصات المتاحة في المعاهد المعتمدة</p>
        </div>

        {/* Institutes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {institutes.map((inst) => (
            <Link to={`/InstituteDetails/${inst.id}`} key={inst.id} 
              className="theme-card group rounded-3xl shadow-sm p-6 hover:shadow-xl hover:border-brand-200 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-school"></i>
                </div>
                <div>
                  <h3 className="theme-heading text-xl font-bold group-hover:text-brand-600 transition-colors">
                    {inst.nameAr}
                  </h3>
                  <div className="flex gap-4 mt-2 text-sm theme-subtle">
                    <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot"></i> {inst.governorateAr}</span>
                  </div>
                </div>
              </div>

              <div className="w-8 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}