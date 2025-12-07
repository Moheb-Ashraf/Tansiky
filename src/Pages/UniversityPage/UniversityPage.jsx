
export default function UniversityPage() {
  return (
    <div className="w-full min-h-screen bg-[#f7fafd] p-4 md:p-8 ">
      <div className="container mx-auto">
        {/* Header Card */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200 flex gap-3 items-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-4xl">🎓</div>
        <div >
          <h1 className="text-2xl font-bold text-gray-800">جامعة القاهرة</h1>
        <p className="text-gray-500 mt-2 text-sm">22 كلية متاحة</p>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200">
        <h2 className="relative text-xl font-bold pb-2 mb-4
          before:content-[''] before:absolute before:right-0 before:-bottom-0.5
          before:w-full before:h-[3px] before:bg-blue-500 before:rounded-full">
          نبذة عن الجامعة
        </h2>
        <p className="text-gray-600 leading-relaxed text-base">
          تعد جامعة القاهرة واحدة من أعرق الجامعات المصرية والعربية... (نص تجريبي)
        </p>
      </div>

      {/* Categories Section */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200">
        <h2 className="relative text-xl font-bold pb-2 mb-4
          before:content-[''] before:absolute before:right-0 before:-bottom-0.5
          before:w-full before:h-[3px] before:bg-blue-500 before:rounded-full">
          التخصصات المتاحة
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {["طب الأسنان","الصيدلة","العلوم","الهندسة","الإعلام","الاقتصاد","الحقوق","التجارة","الآثار","الرياضة","التخطيط العمراني","الحاسبات والمعلومات"]
            .map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-xl bg-gray-50 text-gray-700">
                {item}
                <span className="text-green-500 text-xl">➕</span>
              </div>
            ))}
        </div>
      </div>

      {/* Costs & Admission */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Costs */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-full before:h-[3px] before:bg-blue-500 before:rounded-full">
            المصاريف
          </h2>
          <p className="text-gray-700">مصروفات الجامعة تقريبية: 1000 - 2000 جنيه</p>
        </div>

        {/* Admission */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-full before:h-[3px] before:bg-blue-500 before:rounded-full">
            التنسيق
          </h2>
          <p className="text-gray-700 leading-relaxed">
            يختلف تنسيق الكلية من 65% إلى 75% حسب النظام.
          </p>
        </div>
      </div>

      {/* Location & Website */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Location */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-full before:h-[3px] before:bg-blue-500 before:rounded-full">
            الموقع الجغرافي
          </h2>
          <p className="text-red-600">شارع جامعة القاهرة - الجيزة</p>
          <button className="mt-3 bg-red-100 text-red-600 px-4 py-2 rounded-xl w-full">عرض على الخريطة</button>
        </div>

        {/* Website */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          <h2 className="relative text-xl font-bold pb-2 mb-4 before:content-[''] before:absolute before:right-0 before:-bottom-0.5 before:w-full before:h-[3px] before:bg-blue-500 before:rounded-full">
            الموقع الإلكتروني
          </h2>
          <a href="#" className="text-blue-600 text-lg underline">https://cu.edu.eg</a>
        </div>
      </div>
      </div>
    </div>
  );
}
