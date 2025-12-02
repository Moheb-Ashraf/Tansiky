function Footer() {
  return (
    <div className="Footer bg-linear-to-r from-blue-100 to-blue-300 shadow-lg py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between gap-8">

        {/* Mobile */}
        <div className="text-center md:text-end">
          <h2 className="text-2xl font-semibold mb-1">الموبايل :</h2>
          <h3 className="text-gray-700">01*********</h3>
        </div>

        {/* Social Media */}
        <div className="flex gap-6 text-2xl justify-center">
          <i className="text-blue-600 cursor-pointer fa-brands fa-facebook hover:scale-110 hover:text-blue-800 transition-transform duration-200"></i>
          <i className="text-pink-500 cursor-pointer fa-brands fa-instagram hover:scale-110 hover:text-pink-700 transition-transform duration-200"></i>
          <i className="text-green-500 cursor-pointer fa-brands fa-whatsapp hover:scale-110 hover:text-green-700 transition-transform duration-200"></i>
          <i className="cursor-pointer fa-solid fa-x hover:scale-110 hover:text-red-500 transition-transform duration-200"></i>
        </div>

        {/* Email */}
        <div className="text-center md:text-end">
          <h2 className="text-2xl font-semibold mb-1">الايميل :</h2>
          <h3 className="text-gray-700">******@gmail.com</h3>
        </div>

      </div>
    </div>
  );
}

export default Footer;
