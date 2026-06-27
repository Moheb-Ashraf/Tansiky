import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CONTACT = {
  phone: "01006448913",
  email: "tansiqyegy@gmail.com",
  facebook: "https://www.facebook.com/share/18Ws3Z4aVQ/",
  instagram: "https://www.instagram.com/tansiqyegy?igsh=MWZyZHprOTc3cHZpcw==",
  whatsapp: "https://wa.me/201006448913",
};

export default function ContactUs() {
  return (
    <>
      <Helmet>
        <title>اتصل بنا | تنسيقي ايجي</title>
        <meta
          name="description"
          content="تواصل مع فريق تنسيقي ايجي عبر الهاتف، البريد الإلكتروني، أو وسائل التواصل الاجتماعي."
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
            <h1 className="theme-heading text-2xl md:text-3xl font-black">اتصل بنا</h1>
          </div>

          <div className="theme-card theme-elevated rounded-3xl p-6 md:p-10 space-y-6">
            <p className="theme-subtle leading-relaxed">
              يسعدنا استقبال استفساراتكم واقتراحاتكم وملاحظاتكم. فريق{" "}
              <strong className="text-(--theme-text)">تنسيقي ايجي</strong> جاهز للرد في أقرب وقت
              ممكن.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-4 p-5 rounded-2xl bg-brand-50 border border-brand-100 hover:border-brand-300 transition-colors"
              >
                <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-600 text-white text-xl">
                  <i className="fa-solid fa-phone" />
                </span>
                <div>
                  <p className="text-xs theme-subtle font-medium">الهاتف</p>
                  <p className="font-bold text-brand-700" dir="ltr">
                    {CONTACT.phone}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 p-5 rounded-2xl bg-brand-50 border border-brand-100 hover:border-brand-300 transition-colors"
              >
                <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-600 text-white text-xl">
                  <i className="fa-solid fa-envelope" />
                </span>
                <div>
                  <p className="text-xs theme-subtle font-medium">البريد الإلكتروني</p>
                  <p className="font-bold text-brand-700 text-sm" dir="ltr">
                    {CONTACT.email}
                  </p>
                </div>
              </a>
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-700 mb-4">وسائل التواصل الاجتماعي</h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors font-bold text-sm"
                >
                  <i className="fa-brands fa-whatsapp text-lg" />
                  واتساب
                </a>
                <a
                  href={CONTACT.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-50 text-brand-700 border border-brand-100 hover:bg-brand-100 transition-colors font-bold text-sm"
                >
                  <i className="fa-brands fa-facebook text-lg" />
                  فيسبوك
                </a>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gold-50 text-gold-700 border border-gold-200 hover:bg-gold-100 transition-colors font-bold text-sm"
                >
                  <i className="fa-brands fa-instagram text-lg" />
                  إنستجرام
                </a>
              </div>
            </div>

            <p className="text-sm theme-subtle pt-4 border-t border-(--theme-border)">
              للاطلاع على كيفية تعاملنا مع بياناتك، راجع{" "}
              <Link to="/privacy-policy" className="text-brand-600 font-bold hover:underline">
                سياسة الخصوصية
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
