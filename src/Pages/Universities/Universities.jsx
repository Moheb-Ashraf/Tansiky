import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function Universities() {
  const { type } = useParams();

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeName, setTypeName] = useState("");

  async function getUniversities() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://tansiqy.runasp.net/api/Universities/type/${type}`
      );

      setUniversities(data);

      // الحصول علي نوع الجامعة
      if (data.length > 0) {
        setTypeName(data[0].type);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUniversities();
  }, [type]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full bg-[#f7f9fc] min-h-screen p-6">

      {/* عنوان الصفحة */}
      <h1 className="text-2xl font-bold text-start text-gray-800 mb-6">
        {typeName}
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

        {universities.map((u) => (
          <Link key={u.id} to={`/university/${u.id}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition cursor-pointer">

              {/* عنوان الجامعة */}
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold text-gray-800">
                  {u.nameAr}
                </h2>

                <div className="bg-green-100 text-green-600 p-2 rounded-xl">
                  <i className="fa-solid fa-graduation-cap w-6 h-6"></i>
                </div>
              </div>

              {/* المحافظة */}
              <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                <i className="fa-solid fa-map w-4 h-4"></i>
                {u.governorate}
              </div>

              {/* عدد الكليات */}
              <p className="text-green-600 font-semibold mt-3 text-sm">
                {u.collegesCount} كلية
              </p>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
