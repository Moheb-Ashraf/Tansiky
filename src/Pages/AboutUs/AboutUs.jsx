import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>من نحن | تنسيقي ايجي</title>
        <meta
          name="description"
          content="تعرف على موقع تنسيقي ايجي — منصة مصرية متخصصة في دليل تنسيق الجامعات والكليات والمعاهد العليا."
        />
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
            <h1 className="theme-heading text-2xl md:text-3xl font-black">من نحن</h1>
          </div>

          <article className="theme-card theme-elevated rounded-3xl p-6 md:p-10 space-y-6 text-(--theme-text) leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-brand-700 mb-3">تنسيقي EGY</h2>
              <p className="theme-subtle">
                <strong className="text-(--theme-text)">تنسيقي ايجي</strong> منصة إلكترونية مصرية
                تهدف إلى مساعدة طلاب الثانوية العامة وذويهم في اتخاذ قرارات التنسيق الجامعي بثقة
                ووضوح. نوفر معلومات موثوقة عن الجامعات الحكومية والخاصة والأهلية والتكنولوجية
                والأجنبية، بالإضافة إلى المعاهد العليا في جمهورية مصر العربية.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-3">رؤيتنا</h2>
              <p className="theme-subtle">
                أن نكون المرجع الأول للطلاب المصريين في رحلة البحث عن الكلية والجامعة المناسبة،
                من خلال أدوات بحث ذكية ومحتوى محدّث يُسهّل فهم خيارات التنسيق.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-3">ما نقدمه</h2>
              <ul className="theme-subtle space-y-2 list-disc list-inside">
                <li>دليل شامل لأنواع الجامعات والكليات والمعاهد المصرية</li>
                <li>بحث متقدم حسب المجموع، المصاريف، المحافظة، ونوع الدراسة</li>
                <li>أخبار وتحديثات متعلقة بالتنسيق والقبول الجامعي</li>
                <li>مساعد ذكي «بحر» للإجابة عن استفسارات التنسيق والقبول</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-3">التزامنا</h2>
              <p className="theme-subtle">
                نحرص على تقديم المعلومات بدقة ووضوح، مع التنويه بأن قرارات التنسيق الرسمية
                تصدر عن وزارة التعليم العالي والجهات المعنية. ننصح دائماً بالتحقق من المصادر
                الرسمية قبل اتخاذ أي قرار نهائي.
              </p>
            </section>

            <p className="text-sm theme-subtle pt-4 border-t border-(--theme-border)">
              لأي استفسار، يمكنك زيارة{" "}
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
