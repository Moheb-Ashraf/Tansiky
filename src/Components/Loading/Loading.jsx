
const Loading = () => {
  return (
    // الخلفية مغبشة وتملأ الشاشة
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md">
      
      <div className="relative flex items-center justify-center">
        
        {/* الدائرة الخارجية */}
        <div className="absolute h-24 w-24 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600"></div>
        
        <div className="absolute h-16 w-16 animate-[spin_3s_linear_infinite_reverse] rounded-full border-4 border-brand-50 border-b-brand-500"></div>

        {/* أيقونة قبعة التخرج */}
        <div className="relative flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-white shadow-xl">
          <i className="fa-solid fa-graduation-cap text-2xl text-brand-600"></i>
        </div>
      </div>

      {/* منطقة النصوص */}
      <div className="mt-8 text-center">
        {/* اسم الموقع  */}
        <h2 className="animate-bounce font-sans text-2xl font-black tracking-tight text-brand-700">
          تنسيقي
        </h2>
        
        {/* شريط تحميل صغير تحت النص */}
        <div className="mt-2 h-1 w-24 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-full origin-left animate-[pulse_1.5s_ease-in-out_infinite] bg-linear-to-r from-brand-600 to-brand-500"></div>
        </div>
        
        <p className="mt-3 font-medium text-gray-500">
          جاري تجهيز مستقبلك...
        </p>
      </div>
    </div>
  );
};

export default Loading;