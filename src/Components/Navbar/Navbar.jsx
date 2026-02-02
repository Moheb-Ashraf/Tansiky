import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/tansiqy logo .pdf-image-001.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation(); 
  const navigate = useNavigate();


  const links = [
    { name: "الرئيسية", path: "/" },
    { 
      name: "الأخبار", 
      path: "/ImportantNews",
      child: ["/ImportantNews/PageNews"] 
    },
    {
  name: " الجامعات",
  path: "/TypeOfUniversities",
  child: ["/Universities", "/university", "/Institutes", "/InstituteDetails"]
}
,
    { name: "بحث مخصص لك", path: "/advanced-search" }
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

  return (
    <nav className="w-full bg-white shadow-md py-3 px-6 ">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center font-bold justify-center text-white text-3xl">
            <img src={logo} alt="Logo" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">تنسيقي</h1>
        </Link>

        {/* Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 text-md">
          {links.map((link) => (
            <li
              key={link.name}
              className="hover:text-blue-500 hover:scale-125 transition-transform duration-300 inline-block cursor-pointer relative"
            >
              <Link to={link.path} className="block">
                {link.name}
                {/* line under the word */}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform transition-transform duration-300 ${
                    isActive(link) ? "scale-x-100" : "scale-x-0"
                  } origin-right`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Search (Desktop) */}
        <div className="hidden md:flex w-64 bg-gray-100 rounded-full px-4 py-2 items-center transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-300">
          <input 
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="bg-transparent flex-1 outline-none text-right text-sm"
    placeholder="بحث..."
  />
  <button
    onClick={() => {
      if(searchTerm.trim() !== "") {
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      }
    }}
    className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition cursor-pointer"
  >
    بحث
  </button>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            <i className="fa-solid fa-bars text-gray-700 text-xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 px-4 space-y-2">
          <ul className="flex flex-col gap-2 text-center text-gray-700 text-lg">
            {links.map((link) => (
              <li
                key={link.name}
                className="hover:text-blue-500 hover:scale-110 transition-transform duration-300 cursor-pointer relative"
              >
                <Link to={link.path} className="block" onClick={() => setIsOpen(false)}>
                  {link.name}
                  {/* line */}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform transition-transform duration-300 ${
                      isActive(link) ? "scale-x-100" : "scale-x-0"
                    } origin-right`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Search (Mobile) */}
          <div className="w-full bg-gray-100 rounded-full px-4 py-2 flex items-center mt-2 transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-300">
            <input 
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="bg-transparent flex-1 outline-none text-right text-sm"
    placeholder="بحث..."
  />
  <button
    onClick={() => {
      if(searchTerm.trim() !== "") {
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        setIsOpen(false); 
      }
    }}
    className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition cursor-pointer"
  >
    بحث
  </button>
          </div>
        </div>
      )}
    </nav>
  );
}
