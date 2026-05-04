import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-(--theme-border) bg-(--theme-surface) shadow-(--shadow-top-lg)">

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-10">

          {/* Brand / Logo Section */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h1 className="text-2xl font-black text-brand-700 tracking-tight">
              تنسيقي <span className="text-gold-500">EGY</span>
            </h1>
            <p className="text-sm text-gray-500 max-w-[200px] text-center md:text-start leading-relaxed">
              دليلك الشامل لتنسيق الجامعات والكليات والمعاهد المصرية
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-base font-bold text-(--theme-text) border-b border-(--theme-border) pb-1 w-full text-center">
              روابط سريعة
            </h2>
            <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
              <Link to="/Universities/1" className="hover:text-gold-600 transition-colors duration-200">الجامعات الحكومية</Link>
              <Link to="/Universities/2" className="hover:text-gold-600 transition-colors duration-200">الجامعات الخاصة</Link>
              <Link to="/Universities/3" className="hover:text-gold-600 transition-colors duration-200">الجامعات الأهلية</Link>
              <Link to="/Institutes"     className="hover:text-gold-600 transition-colors duration-200">المعاهد العالية</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <h2 className="text-base font-bold text-(--theme-text) border-b border-(--theme-border) pb-1 w-full text-center md:text-end">
              تواصل معنا
            </h2>
            <div className="flex flex-col items-center md:items-end gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-phone text-brand-600"></i>
                01006448913
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-brand-600"></i>
                ******@gmail.com
              </span>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 text-xl text-brand-700 mt-1">
              <Link to="https://www.facebook.com/share/18Ws3Z4aVQ/" target="_blank">
                <i className="fa-brands fa-facebook cursor-pointer hover:scale-110 hover:text-gold-600 transition-all duration-200" aria-hidden />
              </Link>
              <Link to="https://www.instagram.com/tansiqyegy?igsh=MWZyZHprOTc3cHZpcw==" target="_blank">
                <i className="fa-brands fa-instagram cursor-pointer hover:scale-110 hover:text-gold-600 transition-all duration-200" aria-hidden />
              </Link>
              <Link to="https://wa.me/01006448913" target="_blank">
                <i className="fa-brands fa-whatsapp cursor-pointer hover:scale-110 hover:text-gold-600 transition-all duration-200" aria-hidden />
              </Link>
              
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-(--theme-border) py-4 px-6">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} تنسيقي EGY — جميع الحقوق محفوظة</span>
          
        </div>
      </div>

    </footer>
  );
}

export default Footer;