import { Link } from "react-router-dom"

function Cards_home({ title, link,color }) {

    
    return (
        <Link to={link}>
            <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100  rounded-3xl shadow-2xl w-64 h-48 cursor-pointer 
                hover:scale-110 hover:shadow-md transition-all duration-300">

                {/* icon container */}
                <div className={`flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${color} text-white`}>
                    <i className="fa-solid fa-newspaper text-white"></i>
                </div>

                {/* title */}
                <h3 className="text-gray-900 font-bold text-lg mb-1 text-center font-sans">
                    {title}
                </h3>

                {/* count */}
                {/* <p className="text-gray-500 text-sm font-medium">
                    24 كلية
                </p> */}
            </div>
        </Link>
    )
}

export default Cards_home
