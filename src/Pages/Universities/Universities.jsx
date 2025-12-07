import { Link } from "react-router-dom";

export default function Universities() {
  const universities = [
    { name: "جامعة القاهرة", city: "الجيزة", colleges: 22 },
    { name: "جامعة الإسكندرية", city: "الإسكندرية", colleges: 21 },
    { name: "جامعة عين شمس", city: "القاهرة", colleges: 15 },
    { name: "جامعة أسيوط", city: "أسيوط", colleges: 16 },
    { name: "جامعة المنصورة", city: "الدقهلية", colleges: 17 },
    { name: "جامعة طنطا", city: "الغربية", colleges: 13 },
    { name: "جامعة الزقازيق", city: "الشرقية", colleges: 19 },
    { name: "جامعة حلوان", city: "القاهرة", colleges: 18 },
    { name: "جامعة قناة السويس", city: "الإسماعيلية", colleges: 11 },
    { name: "جامعة جنوب الوادي", city: "قنا", colleges: 12 },
    { name: "جامعة المنوفية", city: "المنوفية", colleges: 14 },
    { name: "جامعة المنيا", city: "المنيا", colleges: 16 },
    { name: "جامعة بني سويف", city: "بني سويف", colleges: 11 },
    { name: "جامعة كفر الشيخ", city: "كفر الشيخ", colleges: 12 },
    { name: "جامعة الفيوم", city: "الفيوم", colleges: 17 },
    { name: "جامعة بنها", city: "القليوبية", colleges: 13 },
    { name: "جامعة دمنهور", city: "البحيرة", colleges: 14 },
    { name: "جامعة بورسعيد", city: "بورسعيد", colleges: 8 },
    { name: "جامعة أسوان", city: "أسوان", colleges: 9 },
    { name: "جامعة سوهاج", city: "سوهاج", colleges: 10 },
    { name: "جامعة دمياط", city: "دمياط", colleges: 9 },
    { name: "جامعة مطروح", city: "مطروح", colleges: 5 },
    { name: "جامعة الوادي الجديد", city: "الوادي الجديد", colleges: 6 },
    { name: "جامعة السويس", city: "السويس", colleges: 7 },
    { name: "جامعة العريش", city: "شمال سيناء", colleges: 8 },
    { name: "جامعة البحر الأحمر", city: "الغردقة", colleges: 6 },
    { name: "جامعة الأقصر", city: "الأقصر", colleges: 7 },
    { name: "جامعة مدينة السادات", city: "المنوفية", colleges: 6 },
  ];

  return (
    <div className="w-full bg-[#f7f9fc] min-h-screen p-6">

      <Link to="/UniversityPage">
      {/* عنوان الصفحة */}
      <h1 className="text-2xl font-bold text-start text-gray-800 mb-6 ">
        الجامعات الحكومية
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

        {universities.map((u, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition cursor-pointer"
          >
            
            {/* عنوان الجامعة */}
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-bold text-gray-800">{u.name}</h2>

              <div className="bg-green-100 text-green-600 p-2 rounded-xl">
                <i className="fa-solid fa-graduation-cap w-6 h-6 "></i>
              </div>
            </div>

            {/* المحافظة */}
            <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
              <i className="fa-solid fa-map w-4 h-4 "></i>
              {u.city}
            </div>

            {/* عدد الكليات */}
            <p className="text-green-600 font-semibold mt-3 text-sm">
              {u.colleges} كلية
            </p>

          </div>
        ))}
      </div>

      
      </Link>
    </div>
  );
}
