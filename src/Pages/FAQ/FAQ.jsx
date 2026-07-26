import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const FAQ_DATA = [
  {
    id: 1,
    category: "التنسيق",
    question: "كيف يتم حساب المجموع الاعتباري لتنسيق الثانوية العامة؟",
    answer:
      "يتم حساب المجموع الاعتباري بنسبة المجموع الكلي للطالب في شهادة الثانوية العامة، مع إضافة درجات الحافز الرياضي (إن وُجد) والمواد المؤهلة لبعض الكليات والقطاعات الخاصة وفق التحديثات الرسمية لوزارة التعليم العالي."
  },
  {
    id: 2,
    category: "الجامعات",
    question: "ما الفرق بين الجامعات الحكومية والأهلية والخاصة في مصر؟",
    answer:
      "الجامعات الحكومية مجانية أو بمصروفات رمزية وتخضع لتنسيق حكومي مباشر. أما الجامعات الأهلية فهي جامعات غير هدفها الربح تحت إشراف وزارة التعليم العالي وبمصروفات متوسطة وتنسيق أقل قليلاً. والجامعات الخاصة تدار بشركات ومؤسسات خاصة بمصروفات دراسية مستقلة."
  },
  {
    id: 3,
    category: "التنسيق",
    question: "كيف أستفيد من ميزة التنسيق الذكي وتوصيات الكليات في موقعنا؟",
    answer:
      "يمكنك الانتقال لصفحة «بحث مخصص لك» في الموقع وإدخال مجموعك وشعبتك (علمي علوم / علمي رياضة / أدبي)، وسيقوم النظام الذكي باقتراح الكليات والمعاهد المناسبة لمجموعك بناءً على نتائج التنسيق التاريخية والحالية."
  },
  {
    id: 4,
    category: "التحويلات",
    question: "ما هي قواعد تقليل الاغتراب والتحويل بين الكليات؟",
    answer:
      "يتم فتح باب تقليل الاغتراب عقب إعلان نتائج المرحلة الأولى والثانية، ويهدف لتقليل اغتراب الطالب بحيث يحول لكليته في المنظومة الجغرافية (أ) بشرط استيفاء الحد الأدنى للقطاع أو الكلية وفي حدود نسبة 10% المقررة من المجلس الأعلى للجامعات."
  },
  {
    id: 5,
    category: "القدرات",
    question: "ما هي الكليات التي تتطلب أداء اختبارات قدرات قبل التنسيق؟",
    answer:
      "تشمل كليات الفنون الجميلة، الفنون التطبيقية، التربية الرياضية، التربية الموسيقية، وبعض الكليات التكنولوجية. يتم التسجيل لها إلكترونياً عبر موقع التنسيق الإلكتروني الرسمي في المواعيد المحددة."
  },
  {
    id: 6,
    category: "عام",
    question: "هل المعلومات الواردة في موقع «تنسيقي EGY» رسمية؟",
    answer:
      "نعم، يستند موقع تنسيقي EGY إلى أحدث البيانات والحدود الدنيا المعلنة رسمياً من وزارة التعليم العالي والمجلس الأعلى للجامعات المصرية مع تحديثها دورياً لتوفير أعلى دقة للطلاب."
  },
  {
    id: 7,
    category: "التنسيق",
    question: "كم عدد الرغبات المسموح بتسجيلها في موقع التنسيق الرسمي؟",
    answer:
      "يسمح موقع التنسيق الحكومي للطلاب بتسجيل حتى 75 رغبة مختلفة، ويُنصح بملء كافة الرغبات بترتيب منطقي وفقاً للمجموع والنطاق الجغرافي لتجنب النفاذ واستنفاد الرغبات."
  },
  {
    id: 8,
    category: "الجامعات",
    question: "هل المعاهد العالية الخاصة معتمدة من وزارة التعليم العالي؟",
    answer:
      "نعم، جميع المعاهد العالية المدرجة في قسم المعاهد بموقعنا هي معاهد معتمدة من وزارة التعليم العالي وتمنح درجة البكالوريوس أو الليسانس المعادلة من المجلس الأعلى للجامعات."
  },
  {
    id: 9,
    category: "عام",
    question: "كيف يمكنني استخدام المساعد الذكي «بحر» في الموقع؟",
    answer:
      "يمكنك الضغط على أيقونة الشات في أسفل الشاشة والتحدث مع المساعد الذكي «بحر» للحصول على إجابات فورية واستشارات سريعة حول التنسيق، الكليات، ومواعيد المراحل المختلفة."
  },
  {
    id: 10,
    category: "التنسيق",
    question: "ماذا يعني «استنفاد الرغبات» وكيف يمكن تجنبه؟",
    answer:
      "يحدث استنفاد الرغبات عندما يكتب الطالب كليات أو معاهد بالكامل أعلى من حدها الأدنى لمجموعه. لتجنب ذلك، يجب وضع كليات ذات حد أدنى يقارب أو يقل عن مجموعك في أواخر قاع قائمة الرغبات."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState(1);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["الكل", "التنسيق", "الجامعات", "التحويلات", "القدرات", "عام"];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory =
      activeCategory === "الكل" || item.category === activeCategory;
    const matchesSearch =
      item.question.includes(searchQuery) || item.answer.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>الأسئلة الشائعة | تنسيقي EGY</title>
        <meta
          name="description"
          content="دليل الإجابات الشامل لجميع استفسارات تنسيق الجامعات المصرية، الحدود الدنيا، تقليل الاغتراب، واختبارات القدرات."
        />
      </Helmet>

      <div className="bg-app-bg min-h-screen py-10 px-4 theme-page-pad md:px-8 lg:px-16" dir="rtl">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="theme-card w-10 h-10 flex items-center justify-center rounded-full shadow-sm theme-subtle hover:text-brand-600 transition-all"
              >
                <i className="fa-solid fa-house" />
              </Link>
              <div className="h-8 w-1 bg-brand-600 rounded-full" />
              <div>
                <h1 className="theme-heading text-2xl md:text-3xl font-black">الأسئلة الشائعة</h1>
                <p className="text-xs md:text-sm theme-subtle mt-0.5">
                  إجابات شاملة ودقيقة لكل ما يتعلق بتنسيق الجامعات المصرية والقبول الجامعي
                </p>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="theme-card theme-elevated rounded-2xl p-4 flex items-center gap-3">
            <i className="fa-solid fa-magnifying-glass text-brand-600 text-lg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن سؤالك هنا (مثل: تقليل الاغتراب، التنسيق الأهلي...)..."
              className="bg-transparent flex-1 outline-none text-right text-sm text-(--theme-text)"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                إلغاء
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                    : "theme-card text-(--theme-text) hover:bg-brand-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="theme-card theme-elevated rounded-2xl overflow-hidden transition-all duration-300 border border-(--theme-border)"
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full p-5 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-(--theme-muted)/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {faq.id}
                        </span>
                        <span className="font-bold text-base md:text-lg text-(--theme-text)">
                          {faq.question}
                        </span>
                      </div>
                      <i
                        className={`fa-solid fa-chevron-down text-brand-600 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-sm md:text-base theme-subtle border-t border-(--theme-border)/50 leading-relaxed animate-fade-in">
                        <p className="bg-(--theme-muted)/30 p-4 rounded-xl border-r-4 border-brand-600">
                          {faq.answer}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                          <span>التصنيف: {faq.category}</span>
                          <Link to="/advanced-search" className="text-brand-600 font-semibold hover:underline">
                            جرب البحث المخصص لمجموعك ←
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="theme-card p-10 text-center rounded-2xl">
                <i className="fa-solid fa-circle-question text-4xl text-gray-300 mb-3" />
                <p className="text-lg font-bold text-(--theme-text)">لم نجد نتائج مطابقة لبحثك</p>
                <p className="text-sm theme-subtle mt-1">جرب البحث بكلمات مختلفة أو اختر تصنيفاً آخر.</p>
              </div>
            )}
          </div>

          {/* Need help banner */}
          <div className="theme-card bg-gradient-to-r from-brand-600 to-brand-800 text-white rounded-3xl p-6 md:p-8 text-center md:text-right flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-xl font-bold mb-1">لم تجد إجابة لسؤالك؟</h3>
              <p className="text-sm text-brand-100">
                يمكنك التحدث مع المساعد الذكي «بحر» في أسفل الشاشة أو مراسلتنا مباشرة.
              </p>
            </div>
            <Link
              to="/contact"
              className="bg-gold-500 text-brand-950 px-6 py-3 rounded-full font-bold text-sm hover:bg-gold-400 transition-all shrink-0 shadow-lg"
            >
              تواصل معنا الآن
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
