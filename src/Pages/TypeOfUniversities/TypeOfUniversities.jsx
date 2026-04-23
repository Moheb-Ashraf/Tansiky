import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Cards_home from "../../Components/Cards_Home/Cards_home";
import Loading from "../../Components/Loading/Loading";
import api from "../../lib/apiClient";

const TYPE_COLORS = [
  "bg-brand-800",
  "bg-gold-600",
  "bg-maroon-600",
  "bg-gold-500",
  "bg-brand-600",
  "bg-brand-500",
];

function TypeOfUniversities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const { data } = await api.get("/api/Universities/types");
        const mapped = data.map((item, index) => ({
          name: item.typeNameAr,
          count: `${item.totalUniversities} مؤسسة`,
          type: index + 1,
          color: TYPE_COLORS[index] ?? "bg-brand-600",
        }));
        setUniversities(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">خطأ في تحميل البيانات: {error}</div>;

  
    return <>
<div className="min-h-screen bg-app-bg py-10 px-4 md:px-8 lg:px-16 rtl">
    <div className="max-w-7xl mx-auto" >
    <div className="flex items-center  justify-between mb-8 ">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-500 hover:text-gray-800 transition">
              العودة للرئيسية
            </Link>
            <span className="theme-subtle">/</span>
            <h1 className="theme-heading text-xl md:text-2xl font-semibold flex items-center gap-3">
              
              <span className="theme-card inline-flex items-center justify-center w-9 h-9 rounded-lg shadow-sm">
                <i className="fa-solid fa-graduation-cap text-brand-600"></i>
              </span>
              <span>أنواع الجامعات </span>
            </h1>
          </div>

        </div>
</div>
<div className="container mx-auto my-10
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 
      gap-10 justify-items-center">
        
        {
        universities.map((item, index) => (
          <Cards_home
                    key={item.type}
                    title={item.name}
                    count={item.count}
                    link={item.type === 4 ? `/Institutes` : `/Universities/${item.type}`}
                    color={item.color}
                    animationDelay={index * 70}
                  />
        ))
      }
        

      </div>

</div>
    </>
}

export default TypeOfUniversities
