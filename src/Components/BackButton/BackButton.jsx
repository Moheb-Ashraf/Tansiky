import { useLocation, useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Use browser history for going back.
  const handleBack = () => {
    if (isHome) return;
    navigate(-1);
  };

  // Hide it on home page to keep layout clean.
  if (isHome) return null;

  return (
    <div className="container mx-auto px-4 pt-5" dir="rtl">
      <button
        type="button"
        onClick={handleBack}
        className="cursor-pointer group inline-flex items-center gap-3 rounded-2xl border border-(--theme-border) bg-(--theme-surface)/95 px-5 py-3 text-sm font-bold text-(--theme-text) shadow-[0_6px_20px_rgba(0,0,0,0.08)] ring-1 ring-transparent transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-[0_10px_28px_rgba(45,100,148,0.25)] hover:ring-brand-200"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white transition-colors duration-300 group-hover:bg-brand-700">
          <i className="fa-solid fa-arrow-right-long" aria-hidden />
        </span>
        <span>الرجوع للصفحة السابقة</span>
      </button>
    </div>
  );
}
