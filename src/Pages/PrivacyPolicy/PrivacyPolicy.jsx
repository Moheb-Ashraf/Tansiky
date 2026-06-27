import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LAST_UPDATED = "23 مايو 2026";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>سياسة الخصوصية | تنسيقي ايجي</title>
        <meta
          name="description"
          content="سياسة الخصوصية لموقع تنسيقي ايجي — كيفية جمع واستخدام وحماية بيانات الزوار."
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
            <h1 className="theme-heading text-2xl md:text-3xl font-black">سياسة الخصوصية</h1>
          </div>

          <article className="theme-card theme-elevated rounded-3xl p-6 md:p-10 space-y-6 text-(--theme-text) leading-relaxed">
            <p className="text-sm theme-subtle">آخر تحديث: {LAST_UPDATED}</p>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">1. مقدمة</h2>
              <p className="theme-subtle">
                يرحّب بكم موقع <strong className="text-(--theme-text)">تنسيقي ايجي</strong>{" "}
                (tansiqyegy.vercel.app). نلتزم بحماية خصوصيتكم وشفافية التعامل مع بياناتكم
                عند استخدام الموقع وخدماته.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">2. البيانات التي نجمعها</h2>
              <ul className="theme-subtle space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-(--theme-text)">بيانات الاستخدام:</strong> صفحات
                  تزورها، نوع المتصفح، ووقت الزيارة (عبر أدوات التحليل والإعلانات).
                </li>
                <li>
                  <strong className="text-(--theme-text)">بيانات المحادثة:</strong> رسائل
                  المساعد الذكي «بحر» تُرسل لمعالجة استفسارك ولا تُستخدم لأغراض تسويقية.
                </li>
                <li>
                  <strong className="text-(--theme-text)">التفضيلات المحلية:</strong> مثل
                  اختيار الوضع الفاتح/الداكن يُحفظ في متصفحك (localStorage).
                </li>
                <li>
                  <strong className="text-(--theme-text)">بيانات التواصل:</strong> عند
                  مراسلتنا عبر البريد أو الهاتف، نستخدمها للرد على استفسارك فقط.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">3. كيف نستخدم البيانات</h2>
              <ul className="theme-subtle space-y-2 list-disc list-inside">
                <li>تشغيل الموقع وتحسين تجربة المستخدم</li>
                <li>تقديم نتائج البحث والمساعدة عبر المساعد الذكي</li>
                <li>تحليل أداء الموقع وإصلاح الأخطاء</li>
                <li>عرض إعلانات ذات صلة (عند تفعيل Google AdSense)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">4. Google AdSense والإعلانات</h2>
              <p className="theme-subtle mb-2">
                قد يستخدم موقعنا Google AdSense لعرض إعلانات. تستخدم Google ملفات تعريف
                الارتباط (Cookies) لعرض إعلانات بناءً على زياراتك السابقة لهذا الموقع
                أو مواقع أخرى.
              </p>
              <p className="theme-subtle">
                يمكنك إيقاف الإعلانات المخصصة من{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 font-bold hover:underline"
                >
                  إعدادات إعلانات Google
                </a>
                . لمزيد من المعلومات، راجع{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 font-bold hover:underline"
                >
                  سياسة خصوصية Google
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">5. ملفات تعريف الارتباط (Cookies)</h2>
              <p className="theme-subtle">
                نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح، حفظ تفضيلاتك، وقياس
                استخدام الموقع. يمكنك التحكم في ملفات تعريف الارتباط من إعدادات متصفحك،
                مع العلم أن تعطيل بعضها قد يؤثر على عمل بعض الميزات.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">6. مشاركة البيانات مع أطراف ثالثة</h2>
              <p className="theme-subtle">
                لا نبيع بياناتكم الشخصية. قد نشارك بيانات محدودة مع مزودي خدمات موثوقين
                (مثل Google للإعلانات والتحليلات، ومزود المساعد الذكي) وفقاً لسياساتهم
                وبالحد الأدنى اللازم لتشغيل الخدمة.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">7. أمان البيانات</h2>
              <p className="theme-subtle">
                نتخذ إجراءات معقولة لحماية بياناتكم من الوصول غير المصرح به، لكن لا
                يمكن ضمان أمان مطلق لأي نقل عبر الإنترنت.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">8. حقوقك</h2>
              <p className="theme-subtle">
                يحق لك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها. للتواصل بخصوص
                الخصوصية، راجع{" "}
                <Link to="/contact" className="text-brand-600 font-bold hover:underline">
                  صفحة اتصل بنا
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">9. تحديثات السياسة</h2>
              <p className="theme-subtle">
                قد نحدّث هذه السياسة من وقت لآخر. سيتم نشر أي تغيير على هذه الصفحة
                مع تاريخ التحديث.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-700 mb-2">10. التواصل</h2>
              <p className="theme-subtle">
                للاستفسارات المتعلقة بسياسة الخصوصية:{" "}
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
