import { Link } from "react-router-dom";

function PageNews() {
    return <>
    
    <div className=" bg-[#F4F7FB] py-10 px-4">
        <div className=" container mx-auto   ">
<Link
    to="/"
    className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-8"
  >
    <span>العودة للرئيسية</span>
    <i className="fa-solid fa-arrow-left"></i>
  </Link>


        <div className=" flex flex-col items-center">

  

  {/* card */}
  <div className="w-full max-w-4xl bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

    {/* title*/}
    <div className="flex items-center gap-3 mb-4">
      <span className="px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-md">
        قبول وتسجيل
      </span>

      <span className="text-gray-400 text-md flex items-center gap-2">
        <i className="fa-regular fa-calendar"></i>
        ٢٥ نوفمبر ٢٠٢٥
      </span>
    </div>
    <h2 className="text-xl text-gray-800 font-semibold mb-3">
      فتح باب التقديم للجامعات الحكومية للعام الدراسي الجديد
    </h2>
    <p className="text-gray-600 leading-relaxed text-lg border-r-4 border-blue-500 pr-4">
      أعلنت وزارة التعليم العالي عن فتح باب التقديم للجامعات الحكومية بداية من
      الأسبوع القادم
    </p>
  </div>

{/* main card*/}
      <div className="bg-white w-full max-w-4xl rounded-3xl my-10 shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 md:p-10">
          
          <div className="flex items-center  gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-100 text-2xl rounded-xl flex items-center justify-center text-blue-600">
              <i className="fa-solid fa-newspaper"></i>
            </div>

            <h2 className="text-lg font-bold text-gray-800">تفاصيل الخبر</h2>
            
          </div>

          <div className="space-y-4 text-gray-600 leading-relaxed text-md">
            <p>
              أعلنت وزارة التعليم العالي والبحث العلمي عن فتح باب التقديم الإلكتروني للجامعات الحكومية للعام الدراسي الجديد 2025-2026، وذلك بداية من الأسبوع القادم.
            </p>
            <p>
              وأكد الدكتور وزير التعليم العالي أن عملية التقديم ستكون متاحة لجميع الطلاب الحاصلين على شهادة الثانوية العامة أو ما يعادلها، من خلال بوابة التنسيق الإلكتروني الرسمية.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">شروط التقديم</h3>
            <ul className="space-y-2 text-gray-600 text-md">
              <li className="flex items-start gap-2">
                <span>الحصول على شهادة الثانوية العامة أو ما يعادلها</span>
              </li>
              <li className="flex items-start gap-2">
                <span>استيفاء الحد الأدنى للقبول بالكليات المطلوبة</span>
              </li>
              <li className="flex items-start gap-2">
                <span>تسجيل البيانات إلكترونياً على موقع التنسيق</span>
              </li>
              <li className="flex items-start gap-2">
                <span>دفع الرسوم المقررة للتقديم</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">المواعيد المهمة</h3>
            <div className="space-y-2 text-gray-600 text-md">
              <div className="flex gap-2">
                <span className="font-medium text-gray-700">بداية التقديم:</span>
                <span>1 ديسمبر 2025</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-gray-700">نهاية التقديم:</span>
                <span>15 ديسمبر 2025</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-gray-700">إعلان نتائج المرحلة الأولى:</span>
                <span>25 ديسمبر 2025</span>
              </div>
            </div>
          </div>
          <div className="mt-8 text-gray-600 leading-relaxed text-lg">
            <p>
              ودعا الوزير جميع الطلاب إلى الاطلاع على دليل التنسيق المتاح على الموقع الإلكتروني، والذي يتضمن كافة التفاصيل المتعلقة بالقبول والتخصصات المتاحة في كل جامعة.
            </p>
          </div>

        </div>
      </div>




</div>




    </div>
    </div>

    </>
}

export default PageNews






