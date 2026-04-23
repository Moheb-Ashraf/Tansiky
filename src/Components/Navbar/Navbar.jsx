import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

export default function Navbar({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const links = [
    { name: "الرئيسية", path: "/" },
    {
      name: "الأخبار",
      path: "/ImportantNews",
      child: ["/ImportantNews/PageNews"],
    },
    {
      name: "الجامعات",
      path: "/TypeOfUniversities",
      child: ["/Universities", "/university", "/Institutes", "/InstituteDetails", "/college", "/department"],
    },
    { name: "بحث مخصص لك", path: "/advanced-search" },
  ];

  const isActive = (link) => {
    if (location.pathname === link.path) return true;
    if (Array.isArray(link.child)) {
      return link.child.some(
        (child) =>
          location.pathname === child ||
          location.pathname.startsWith(child + "/")
      );
    }
    return false;
  };

  // close minu when user navigate to another page
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // close minu when user click out of it
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <nav
      ref={menuRef}
      className="sticky top-0 z-50 w-full border-b border-(--theme-border) bg-(--theme-surface)/90 py-3 px-6 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-(--theme-surface)/80"
    >
      <div className="container mx-auto flex items-center justify-between">

        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 bg-brand-600 rounded-full flex items-center font-bold justify-center text-white text-3xl">
            <img src={logo} alt="Logo" />
          </div>
          <h1 className="text-2xl font-black text-brand-700 tracking-tight">
              تنسيقي <span className="text-gold-500">EGY</span>
            </h1>
        </Link>

        {/* Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-8 text-(--theme-text) text-md">
          {links.map((link) => (
            <li
              key={link.name}
              className="hover:text-brand-600 hover:scale-125 transition-transform duration-300 inline-block cursor-pointer relative"
            >
              <Link to={link.path} className="block">
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-600 transform transition-transform duration-300 ${
                    isActive(link) ? "scale-x-100" : "scale-x-0"
                  } origin-right`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Search (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex w-64 bg-(--theme-muted) rounded-full px-4 py-2 items-center transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:shadow-brand-200/50"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent flex-1 outline-none text-right text-sm"
            placeholder="بحث..."
          />
          <button
            type="submit"
            className="bg-brand-600 text-white px-3 py-1 rounded-full hover:bg-brand-700 transition cursor-pointer"
          >
            بحث
          </button>
        </form>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="cursor-pointer hidden md:inline-flex items-center gap-2 rounded-full border border-(--theme-border) bg-(--theme-surface) px-3 py-2 text-sm text-(--theme-text) transition hover:bg-(--theme-muted)"
        >
          <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`} aria-hidden />
          <span>{theme === "dark" ? "Light" : "Dark"}</span>
        </button>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-(--theme-text) text-xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu — animated */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-2 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2 text-center text-(--theme-text) text-lg px-4">
          {links.map((link) => (
            <li
              key={link.name}
              className="hover:text-brand-600 hover:scale-110 transition-transform duration-300 cursor-pointer relative"
            >
              <Link to={link.path} className="block">
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-600 transform transition-transform duration-300 ${
                    isActive(link) ? "scale-x-100" : "scale-x-0"
                  } origin-right`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Search (Mobile) */}
        <form
          onSubmit={handleSearch}
          className="w-full bg-(--theme-muted) rounded-full px-4 py-2 flex items-center mt-4 mx-auto transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:shadow-brand-200/50"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent flex-1 outline-none text-right text-sm"
            placeholder="بحث..."
          />
          <button
            type="submit"
            className="bg-brand-600 text-white px-3 py-1 rounded-full hover:bg-brand-700 transition cursor-pointer"
          >
            بحث
          </button>
        </form>

        {/* Theme Toggle (Mobile) */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-(--theme-border) bg-(--theme-surface) px-4 py-2 text-(--theme-text) transition hover:bg-(--theme-muted) cursor-pointer"
        >
          <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`} aria-hidden />
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};