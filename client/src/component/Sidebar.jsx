import { useState } from "react";
import {
  Menu,
  X,
  Home,
  User,
  LogIn,
  LogOut,
  PlusIcon,
  LogInIcon,
  LogOutIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/axios";
import { logout, setUser } from "../store/authSlice";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log("logout error", error);
    }
  }

  const navLinks = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Add Expense", icon: <PlusIcon size={20} />, path: "/addExpense" },
    {
      name: user ? "Logout" : "Login",
      icon: user ? <LogOutIcon /> : <LogInIcon size={20} />,
      path: "/login",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 fixed top-4 left-4 z-30 bg-blue-600/80 text-white rounded focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-700 to-blue-900 text-white w-64 p-6 space-y-6 transform transition-transform z-20
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:h-[100dvh] md:block`}
      >
        <h2 className="text-2xl font-bold mb-10 text-center">
          Expense Tracker
        </h2>
        {user && (
          <h1 className="text-xl font-bold">
            Welcome
            <span className="text-2xl text-red-600"> {user.fullname}</span>
          </h1>
        )}
        <nav className="flex flex-col space-y-4 ">
          {navLinks.map((link, i) => {
            const isLogout = link.name == "Logout";
            return (
              <NavLink
                key={i}
                to={isLogout ? "#" : link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-800 transition ${
                    isActive ? "bg-blue-800" : ""
                  }`
                }
                onClick={
                  () => {
                    setIsOpen(false);
                    if(isLogout) handleLogout()
                  } // Close sidebar on mobile after click
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
