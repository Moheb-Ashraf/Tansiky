import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LAST_UPDATED = "26 يوليو 2026";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>شروط الاستخدام | تنسيقي EGY</title>
        <meta
          name="description"
          content="شروط وقواعد استخدام موقع تنسيقي EGY وحقوق الملكية وإخلاء المسؤولية القانونية."
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
            <h1 className="theme-heading text-2xl md:text-3xl font-black">شروط الاستخدام</h1>
          </div>

          <article className="theme-card theme-elevated rounded-3xl p-6 md:p-10 space-y-6 text-(--theme-text) leading-relaxed">
            <p className="text-sm theme-subtle">آخر تحديث: {LAST_UPDATED}</p>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">1. القبول بالشروط</h2>
              <p className="theme-subtle">
                بوصولك واستخدامك لموقع <strong className="text-(--theme-text)">تنسيقي EGY</strong> (tansiqyegy.vercel.app)، فإنك توافق التام والشامل على الالتزام بشروط الاستخدام هذه وكافة القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، يُرجى عدم استخدام الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">2. طبيعة الخدمات والمعلومات</h2>
              <p className="theme-subtle">
                يقدم موقع «تنسيقي EGY» خدمات استرشادية وتحليلية مساعدة للطلاب للتعرف على الجامعات، الكليات، المعاهد، والحدود الدنيا للتنسيق الأعوام السابقة والحالية. المعلومات المتاحة بالموقع هي لأغراض تعليمية واسترشادية فقط، والموقع الرسمي للتنسيق الحكومي التابع لوزارة التعليم العالي المصرية هو الجهة الرسمية المعتمدة نهائياً لتسجيل الرغبات.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">3. الملكية الفكرية</h2>
              <p className="theme-subtle">
                جميع المحتويات، التصاميم، الشعارات، البرمجيات، وقواعد البيانات المتاحة على هذا الموقع هي ملك حصري لمشروع «تنسيقي EGY» ومحمية بموجب قوانين حقوق الملكية الفكرية. يُحظر نسخ، إعادة توزيع، أو استخدام محتوى الموقع لأغراض تجارية دون موافقة كتابية مسبقة.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">4. الاستخدام المقبول</h2>
              <ul className="theme-subtle space-y-2 list-disc list-inside">
                <li>الالتزام باستخدام الموقع للأغراض المشروعة والشخصية فقط.</li>
                <li>عدم محاولة إلحاق الضرر بالموقع أو خوادمه، أو اختراق قواعد البيانات، أو تعطيل أي من الخدمات المقدمة.</li>
                <li>عدم استخراج البيانات تلقائياً (Web Scraping) دون إذن صريح.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">5. إخلاء المسؤولية القانونية</h2>
              <p className="theme-subtle">
                يبذل فريق «تنسيقي EGY» أقصى جهده لضمان صحة ودقة البيانات المعروضة بالموقع. ومع ذلك، لا نتحمل أي مسؤولية قانونية عن أي خطأ غير مقصود أو تغيير طارئ في قرارات وزارة التعليم العالي أو الحدود الدنيا للقبول، وعلى الطالب دائماً التأكد من موقع التنسيق الحكومي الرسمي عند تسجيل رغباته النهائية.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">6. روابط وشراكات الأطراف الثالثة</h2>
              <p className="theme-subtle">
                قد يحتوي الموقع على روابط لمواقع خارجية أو إعلانات مقدمة من شبكات إعلانية مثل Google AdSense. لا نتحمل المسؤولية عن محتوى أو سياسات الخصوصية الخاصة بهذه المواقع الخارجية.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">7. تعديل الشروط</h2>
              <p className="theme-subtle">
                نحتفظ بالحق في تعديل أو تحديث شروط الاستخدام هذه في أي وقت دون إشعار مسبق. يصبح التعديل سارياً فور نشره على هذه الصفحة.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">8. التواصل للتفسيرات</h2>
              <p className="theme-subtle">
                لأي استفسار بشأن شروط الاستخدام، يمكنك التواصل معنا عبر البريد الإلكتروني:{" "}
                <a
                  href="mailto:tansiqyegy@gmail.com"
                  className="text-brand-600 font-bold hover:underline"
                  dir="ltr"
                >
                  tansiqyegy@gmail.com
                </a>
              </p>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
