import { Link } from "react-router-dom";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-gold-500/20 bg-linear-to-bl from-brand-800 via-brand-700 to-brand-900 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 100% 0%, rgb(212 168 75 / 0.25), transparent 55%), radial-gradient(ellipse 70% 50% at 0% 100%, rgb(55 130 180 / 0.2), transparent 50%)",
        }}
      />
      <div className="container relative mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="hero-reveal mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold-200/95 md:text-sm"
            style={{ "--hero-delay": "40ms" }}
          >
            دليلك الأكاديمي في مصر
          </p>
          <h1
            className="hero-reveal mb-4 text-3xl font-black leading-[1.2] tracking-tight md:text-4xl lg:text-5xl"
            style={{ "--hero-delay": "140ms" }}
          >
            تنسيق الجامعات والكليات والمعاهد
          </h1>
          <p
            className="hero-reveal mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg"
            style={{ "--hero-delay": "240ms" }}
          >
            مصاريف، تنسيق، أقسام، ومواقع — معلومات موحّدة تساعدك على مقارنة الخيارات واختيار مسارك بثقة.
          </p>
          <div
            className="hero-reveal flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center"
            style={{ "--hero-delay": "320ms" }}
          >
            <Link
              to="/advanced-search"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-gold-500 px-8 py-3.5 text-base font-black text-brand-900 shadow-lg shadow-black/25 transition hover:bg-gold-400 hover:shadow-xl"
            >
              <i className="fa-solid fa-sliders" aria-hidden />
              بحث متقدم حسب معاييرك
            </Link>
            <Link
              to="/TypeOfUniversities"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-2 border-white/35 bg-white/10 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition hover:border-brand-100 hover:bg-white/20"
            >
              استعرض أنواع الجامعات
              <i className="fa-solid fa-arrow-left text-sm opacity-90" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
