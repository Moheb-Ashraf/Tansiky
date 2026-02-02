import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function InstitutesList() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  async function getInstitutes() {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/proxy?path=api/Universities/type/4`);
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
    <div className="w-full bg-[#fffcf5] min-h-screen p-6" dir="rtl">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="mb-10 border-r-8 border-amber-500 pr-4">
          <h1 className="text-3xl font-black text-gray-800 font-sans">دليل المعاهد العليا</h1>
          <p className="text-gray-500 font-medium mt-1">استكشف التخصصات المتاحة في المعاهد المعتمدة</p>
        </div>

        {/* Institutes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {institutes.map((inst) => (
            <Link to={`/InstituteDetails/${inst.id}`} key={inst.id} 
              className="group bg-white border border-gray-100 rounded-3xl shadow-sm p-6 hover:shadow-xl hover:border-amber-200 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-school"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {inst.nameAr}
                  </h3>
                  <div className="flex gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot"></i> {inst.governorateAr}</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 px-4 py-2 rounded-2xl text-center min-w-[100px]">
                <p className="text-[10px] text-amber-600 font-bold uppercase">التنسيق</p>
                <p className="text-2xl font-black text-amber-600 font-sans">{inst.lastYearCoordination}%</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}