import { Link } from "react-router-dom";

function Cards_home({ title, link, color, icon, count }) {
    return (
        <Link to={link} className="block">
            <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl w-64 h-48 cursor-pointer 
                hover:-translate-y-2 hover:shadow-2xl hover:border-blue-100 transition-all duration-300 group">

                {/* icon container */}
                <div className={`flex items-center justify-center w-16 h-16 rounded-2xl mb-3 ${color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`fa-solid ${icon || 'fa-newspaper'} text-2xl`}></i>
                </div>

                {/* title */}
                <h3 className="text-gray-900 font-black text-lg text-center leading-tight">
                    {title}
                </h3>

                {/* count */}
                {count && (
                    <p className="text-gray-500 text-sm font-medium mt-1 group-hover:text-blue-500 transition-colors">
                        {count}
                    </p>
                )}

                {/* decorative element */}
                <div className="w-8 h-1 bg-gray-100 rounded-full mt-3 group-hover:w-16 group-hover:bg-blue-400 transition-all duration-500"></div>
            </div>
        </Link>
    );
}

export default Cards_home;