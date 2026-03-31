import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Footer border-t border-(--theme-border) bg-(--theme-surface) shadow-(--shadow-top-lg) py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between gap-8">

        {/* Mobile */}
        <div className="text-center md:text-end">
          <h2 className="text-2xl font-semibold mb-1 text-(--theme-text)">الموبايل :</h2>
          <h3 className="text-gray-500">01*********</h3>
        </div>

        {/* Social Media*/}
        <div className="flex gap-6 text-2xl justify-center text-brand-700">
          <Link to='https://www.facebook.com/share/18Ws3Z4aVQ/' target="_blank">
                <i className="cursor-pointer fa-brands fa-facebook hover:scale-110 hover:text-gold-600 transition-transform duration-200" aria-hidden></i>
          </Link>
          <Link>
              <i className="cursor-pointer fa-brands fa-instagram hover:scale-110 hover:text-gold-600 transition-transform duration-200" aria-hidden></i>
          </Link>
          <Link>
              <i className="cursor-pointer fa-brands fa-whatsapp hover:scale-110 hover:text-gold-600 transition-transform duration-200" aria-hidden></i>
          </Link>
          <Link>
              <i className="cursor-pointer fa-brands fa-x-twitter hover:scale-110 hover:text-gold-600 transition-transform duration-200" aria-hidden></i>
          </Link>
        </div>

        {/* Email */}
        <div className="text-center md:text-end">
          <h2 className="text-2xl font-semibold mb-1 text-(--theme-text)">الايميل :</h2>
          <h3 className="text-gray-500">******@gmail.com</h3>
        </div>

      </div>
    </div>
  );
}

export default Footer;
