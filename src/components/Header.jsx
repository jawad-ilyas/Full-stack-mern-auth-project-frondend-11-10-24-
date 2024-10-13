import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../features/Auth.Slice";

const Header = () => {
    const { currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle log out
    const handleLogout = () => {
        dispatch(logout());  // Dispatch the logout action
        navigate("/signin"); // Navigate to the sign-in page
    };
    console.log("header currentUser ", currentUser)
    // Helper function to handle active/inactive link classes
    const navLinkClass = ({ isActive }) =>
        isActive ? "text-red-400" : "text-black";

    return (
        <div className="px-8 py-3 bg-gray-200 flex flex-row justify-between items-center">
            <div>
                <h1 className="font-semibold text-xl capitalize">
                    <NavLink to="/">AUTH APP (JMD)</NavLink>
                </h1>
            </div>
            <div className="space-x-4 flex flex-row  items-center   ">
                {/* NavLinks */}
                <NavLink to="/" className={navLinkClass}>
                    Home
                </NavLink>
                <NavLink to="/aboutus" className={navLinkClass}>
                    About
                </NavLink>

                {!currentUser && (
                    <>
                        <NavLink to="/signin" className={navLinkClass}>
                            Sign In
                        </NavLink>
                        <NavLink to="/signup" className={navLinkClass}>
                            Sign Up
                        </NavLink>
                    </>
                )}

                {currentUser && (
                    <>

                        <button
                            onClick={handleLogout}
                            className="text-black hover:text-red-400 transition duration-200"
                        >
                            Log Out
                        </button>
                        <NavLink to="/profile" className={navLinkClass}>
                            {
                                currentUser?.rest?.photoURL || currentUser?.photoURL ? (
                                    <img className="size-7 rounded-full" src={currentUser?.rest?.photoURL || currentUser?.photoURL} alt="User Profile" />
                                ) : (
                                    "Profile"
                                )
}


                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
