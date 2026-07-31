import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const GLOSSARY_ITEMS = [
  {
    id: 1,
    term: "الساعات المعتمدة (Credit Hours)",
    definition:
      "نظام دراسي جامعي يعتمد على تقسيم المنهج إلى وحدات دراسية (ساعات). يُمنح الطالب الحرية في اختيار عدد المواد والساعات المسجلة في كل فصل دراسي، وتتطلب التخرج إنهاء عدد محدد من الساعات المعتمدة بنجاح."
  },
  {
    id: 2,
    term: "التنسيق الجغرافي (النطاق أ، ب، ج)",
    definition:
      "قواعد ملزمة تقسم الجامعات الحكومية بالنسبة لمحل سكن الطالب إلى مجموعات: النطاق (أ) وهي الجامعة الأقرب لمحافظة الطالب، والنطاق (ب) المحافظات المجاورة، والنطاق (ج) باقي محافظات الجمهوريه، لمنع الاغتراب غير المبرر."
  },
  {
    id: 3,
    term: "الشهادات المعادلة (عربية وأجنبية)",
    definition:
      "الشهادات الممنوحة للطلاب المصريين من خارج مصر (مثل الثانوية السعودية، الإمارتية، الكويتية) أو من مدارس أجنبية داخل مصر (مثل الدبلومة الأمريكية IG, SAT, IB). يتم التنسيق لها وفق قواعد وشروط خاصة يصدرها المجلس الأعلى للجامعات."
  },
  {
    id: 4,
    term: "البرامج الخاصة بمصروفات (البرامج المتميزة)",
    definition:
      "ساعات دراسية أو برامج تدريسية باللغة الإنجليزية أو بشراكات أجنبية داخل الكليات الحكومية. تكون بمصروفات أعلى من الدراسة العامة، وتتميز بأعداد طلاب أقل وتقنيات تعليمية حديثة."
  },
  {
    id: 5,
    term: "التنسيق الداخلي للكليات",
    definition:
      "نظام توزيع الطلاب المقبولين في الكلية على أقسامها المختلفة (مثل التوزيع على أقسام كلية الآداب أو العلوم أو الحاسبات) بناءً على درجات مواد معينة في الثانوية العامة أو اختبارات المقابلة الشخصية."
  },
  {
    id: 6,
    term: "اختبارات القدرات",
    definition:
      "امتحانات مهارية وفنية تُعقد عقب امتحانات الثانوية العامة وقبل إعلان التنسيق، وتُعد شرطاً أساسياً للقبول بكليات معينة مثل (الفنون التطبيقية، الفنون الجميلة، التربية الرياضية، والتربية الموسيقية)."
  },
  {
    id: 7,
    term: "الحد الأدنى للقبول (المجموع التكراري)",
    definition:
      "أقل مجموع درجات تم قبوله في كلية أو معهد معين خلال مرحلة تنسيقية محددة، ويتغير سنوياً بناءً على نسبة نجاح الطلاب وتوزيع الدرجات وأعداد الأماكن الشاغرة."
  },
  {
    id: 8,
    term: "الجامعات الأهلية",
    definition:
      "جامعات شبه حكومية غير هدفها الربح تُعاد استثمار أرباحها في تطوير التعليم والبحث العلمي، وتخضع لإشراف مباشر من وزارة التعليم العالي وبمصروفات أقل من الجامعات الخاصة."
  },
  {
    id: 9,
    term: "المعدل التراكمي (GPA)",
    definition:
      "مقياس رقمي يُستخدم في نظام الساعات المعتمدة لتقييم الأداء الأكاديمي الشامل للطالب طوال فترة دراسته من 4.00 أو من 5.00 نقاط."
  },
  {
    id: 10,
    term: "استنفاد الرغبات",
    definition:
      "حالة تحدث عندما يُسجل الطالب رغبات في موقع التنسيق بكليات يتجاوز حدها الأدنى مجموع الطالب الكلي، مما يؤدي لعدم ترشيحه لأي كلية حتى يتم فتح باب تدارك الرغبات."
  }
];

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = GLOSSARY_ITEMS.filter(
    (item) =>
      item.term.includes(searchTerm) || item.definition.includes(searchTerm)
  );

  return (
    <>
      <Helmet>
        <title>قاموس المصطلحات الجامعية والتنسيق | تنسيقي EGY</title>
        <meta
          name="description"
          content="دليل الشرح المفصل لأهم مصطلحات التنسيق والتعليم الجامعي في مصر: الساعات المعتمدة، GPA، التنسيق الجغرافي، الشهادات المعادلة، والبرامج الخاصة."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "الرئيسية",
                "item": "https://tansiqyegy.vercel.app/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "قاموس المصطلحات",
                "item": "https://tansiqyegy.vercel.app/glossary"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="bg-app-bg min-h-screen py-10 px-4 theme-page-pad md:px-8 lg:px-16" dir="rtl">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="theme-card w-10 h-10 flex items-center justify-center rounded-full shadow-sm theme-subtle hover:text-brand-600 transition-all"
            >
              <i className="fa-solid fa-house" />
            </Link>
            <div className="h-8 w-1 bg-brand-600 rounded-full" />
            <div>
              <h1 className="theme-heading text-2xl md:text-3xl font-black">قاموس المصطلحات الجامعية</h1>
              <p className="text-xs md:text-sm theme-subtle mt-0.5">
                دليلك المفصل لفهم مصطلحات نظام الدراسة والقبول في الجامعات المصرية
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="theme-card theme-elevated rounded-2xl p-4 flex items-center gap-3">
            <i className="fa-solid fa-book-bookmark text-brand-600 text-lg" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن المصطلح (مثل: الساعات المعتمدة، GPA، تقليل الاغتراب)..."
              className="bg-transparent flex-1 outline-none text-right text-sm text-(--theme-text)"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                إلغاء
              </button>
            )}
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="theme-card theme-elevated rounded-2xl p-6 flex flex-col justify-between border border-(--theme-border) hover:border-brand-500 transition-all"
                >
                  <div>
                    <span className="text-xs font-bold text-brand-600 bg-brand-50 dark:bg-brand-900/30 px-3 py-1 rounded-full inline-block mb-3">
                      مطلح رقم #{item.id}
                    </span>
                    <h3 className="text-lg font-bold text-(--theme-text) mb-2">
                      {item.term}
                    </h3>
                    <p className="text-sm theme-subtle leading-relaxed">
                      {item.definition}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full theme-card p-10 text-center rounded-2xl">
                <i className="fa-solid fa-magnifying-glass-minus text-4xl text-gray-300 mb-3" />
                <p className="text-lg font-bold text-(--theme-text)">لم نجد مصطلحاً مطابقاً لبحثك</p>
                <p className="text-sm theme-subtle mt-1">جرب البحث بكلمات أخرى أو تصفح القائمة كاملة.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
