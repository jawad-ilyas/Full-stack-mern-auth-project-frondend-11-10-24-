import { NavLink } from "react-router-dom"
const Header = () => {
    return (
        <div className="px-8 py-3 bg-gray-200 flex flex-row justify-between items-center ">
            <div>
                <h1 className="font-semibold text-xl capitalize"> <NavLink to="/"  >AUTH APP (JMD)</NavLink></h1>
            </div>
            <div className="space-x-4">
                {/* NavLinks  */}
                <NavLink to="/" className={({ isActive }) => isActive ? "text-red-400" : "text-black"} >Home</NavLink>
                <NavLink className={({ isActive }) => isActive ? "text-red-400" : "text-black"} to="/aboutus" >About</NavLink>
                <NavLink className={({ isActive }) => isActive ? " text-red-400" : "text-black"} to="/profile" >Profile</NavLink>
                <NavLink className={({ isActive }) => isActive ? " text-red-400" : "text-black"} to="/signin" >Sign In</NavLink>
                <NavLink className={({ isActive }) => isActive ? " text-red-400" : "text-black"} to="/signup" >Sign Up</NavLink>
            </div>
        </div >
    )
}

export default Header