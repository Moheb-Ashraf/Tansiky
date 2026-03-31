import api from "../../lib/apiClient";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async"; 


export default function Universities() {
  const { type } = useParams();

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeName, setTypeName] = useState("");

  const getUniversities = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/api/Universities/type/${type}`
      );

      setUniversities(data);
      
      if (data.length > 0) {
        setTypeName(data[0].typeAr);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    getUniversities();
  }, [getUniversities]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>

    {/* SEO Optimization */}
    <Helmet>
        <title>{typeName} | تنسيقي ايجي</title>
        <meta name="description" content={`استكشف قائمة جميع ${typeName} في مصر، تعرف على الكليات المتاحة والمحافظات ومصاريف القبول.`} />
      </Helmet>

    <div className="w-full bg-app-bg min-h-screen p-6 theme-page-pad">

      {/* عنوان الصفحة */}
      <h1 className="theme-heading text-2xl theme-title-xl font-bold text-start mb-6">
        {typeName}
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

        {universities.map((u) => (
          <Link key={u.id} to={`/university/${u.id}`}>
            <div className="theme-card theme-elevated rounded-2xl shadow-sm p-5 hover:shadow-lg transition cursor-pointer">

              {/* عنوان الجامعة */}
              <div className="flex justify-between items-start">
                <h2 className="theme-heading text-lg font-bold line-clamp-2 ">
                  {u.nameAr} / {u.nameEn}
                </h2>

                <div className="bg-brand-50 text-brand-600 p-2 rounded-xl">
                  <i className="fa-solid fa-graduation-cap w-6 h-6"></i>
                </div>
              </div>

              {/* المحافظة */}
              <div className="flex items-center gap-1 theme-subtle mt-2 text-sm">
                <i className="fa-solid fa-map w-4 h-4"></i>
                {u.governorateAr}
              </div>

              {/* عدد الكليات */}
              <p className="text-brand-600 font-semibold mt-3 text-sm">
                {u.collegesCount} كلية
              </p>

            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
