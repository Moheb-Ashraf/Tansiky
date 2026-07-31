import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>من نحن | تنسيقي EGY - مشروع دليلك الجامعي الأول في مصر</title>
        <meta
          name="description"
          content="تعرف على منصة تنسيقي EGY — تطوير نخبة من مهندسي الحاسبات والمعلومات لمساعدة طلاب الثانوية العامة في اختيار الكلية والجامعة المناسبة."
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
                "name": "من نحن",
                "item": "https://tansiqyegy.vercel.app/about"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="bg-app-bg min-h-screen py-10 px-4 theme-page-pad md:px-8 lg:px-16" dir="rtl">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link
              to="/"
              className="theme-card w-10 h-10 flex items-center justify-center rounded-full shadow-sm theme-subtle hover:text-brand-600 transition-all"
            >
              <i className="fa-solid fa-house" />
            </Link>
            <div className="h-8 w-1 bg-brand-600 rounded-full" />
            <h1 className="theme-heading text-2xl md:text-3xl font-black">من نحن — تنسيقي EGY</h1>
          </div>

          <article className="theme-card theme-elevated rounded-3xl p-6 md:p-10 space-y-6 text-(--theme-text) leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-brand-700 mb-3">عن منصة تنسيقي EGY</h2>
              <p className="theme-subtle">
                <strong className="text-(--theme-text)">تنسيقي EGY</strong> منصة إلكترونية مصرية متكاملة تهدف إلى مساعدة طلاب الثانوية العامة والشهادات المعادلة وذويهم في اتخاذ قرارات القبول الجامعي بثقة ووضوح. نوفر معلومات دقيقة وموثوقة عن كافة الجامعات الحكومية والخاصة والأهلية والتكنولوجية والمعاهد العليا في جمهورية مصر العربية.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-3">فريق العمل والخبرة التكنولوجية (E-E-A-T)</h2>
              <p className="theme-subtle mb-3">
                تأتي منصة «تنسيقي EGY» كنتاج متميز لمشروع تخرج صُمم وطُوّر بواسطة نخبة من طلاب وقادة كلية الهندسة  (قسم هندسة الحاسبات )، بالاستعانة بأحدث تقنيات الذكاء الاصطناعي وتحليل البيانات الضخمة لتنسيق السنوات السابقة.
              </p>
              <div className="bg-brand-50 dark:bg-brand-950/30 p-4 rounded-2xl border-r-4 border-brand-600 text-xs md:text-sm text-brand-900 dark:text-brand-200">
                <strong className="block mb-1 font-bold">🎯 هدفنا الأكاديمي والخدمي:</strong>
                تقديم نموذج وطني مجاني عالي الدقة يُيسّر على الأسرة المصرية فهم شروط القبول، المصروفات الدراسية، والتنسيق الجغرافي دون تعقيد.
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-3">توثيق البيانات والمصادر الرسمية</h2>
              <p className="theme-subtle">
                جميع بيانات الحدود الدنيا، التنسيق، والأقسام المتاحة بالموقع مستمدة مباشرة من التحديثات الرسمية الصادرة عن <strong className="text-(--theme-text)">وزارة التعليم العالي والبحث العلمي المصرية</strong> و <strong className="text-(--theme-text)">المجلس الأعلى للجامعات</strong>، ويتم تدقيقها وتحديثها بانتظام لتوفير أقصى درجات المصداقية.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-3">ما نقدمه للطلاب</h2>
              <ul className="theme-subtle space-y-2 list-disc list-inside">
                <li>دليل شامل وشجري لجميع الجامعات الكليات والمعاهد المصرية.</li>
                <li>حاسبة بحث متقدمة تناسب مجموعك وشعبتك والنطاق الجغرافي.</li>
                <li>قسم للأسئلة الشائعة وقاموس مصطلحات التعليم الجامعي.</li>
                <li>مساعد ذكي مدعوم بالذكاء الاصطناعي «بحر» للرد الفوري.</li>
              </ul>
            </section>

            <p className="text-sm theme-subtle pt-4 border-t border-(--theme-border)">
              لأي استفسار أو اقتراح، يمكنكم التواصل معنا عبر{" "}
              <Link to="/contact" className="text-brand-600 font-bold hover:underline">
                صفحة اتصل بنا
              </Link>
              .
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
