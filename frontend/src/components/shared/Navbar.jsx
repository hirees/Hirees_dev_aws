import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import logo2 from "../../assets/logo2.svg";
import { Icon } from "@iconify/react";

const Navbar = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.status) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const renderAvatar = () => (
    <Avatar className="cursor-pointer">
      <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
      <AvatarFallback className="bg-gray-100">
        {user?.role === "recruiter" ? (
          <Icon icon="mdi:building" className="h-5 w-5 text-gray-600" />
        ) : (
          <Icon icon="mdi:account" className="h-5 w-5 text-gray-600" />
        )}
      </AvatarFallback>
    </Avatar>
  );

  const MobileMenu = () => (
    <div
      className={`md:hidden ${
        isOpen ? "block" : "hidden"
      } fixed top-[80px] left-0 right-0 bg-white shadow-lg z-50 max-h-[calc(100vh-80px)] overflow-y-auto`}
    >
      <div className="px-4 py-3 space-y-2">
        {user && user.role === "recruiter" ? (
          <>
            <Link
              to="/"
              className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-base"
            >
              <Icon icon="fluent:home-48-filled" className="w-6 h-6" />
              <span>Home</span>
            </Link>
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-base"
            >
              <Icon icon="mdi:chart-pie" className="w-6 h-6" />
              <span
                className={
                  isActive("/admin/dashboard")
                    ? "text-[#0350c6] font-semibold"
                    : ""
                }
              >
                Dashboard
              </span>
            </Link>
            <Link
              to="/admin/companies"
              className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-base"
            >
              <Icon icon="mdi:office-building" className="w-6 h-6" />
              <span
                className={
                  isActive("/admin/companies")
                    ? "text-[#0350c6] font-semibold"
                    : ""
                }
              >
                Company
              </span>
            </Link>
            <Link
              to="/admin/jobs"
              className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-base"
            >
              <Icon icon="mdi:briefcase" className="w-6 h-6" />
              <span
                className={
                  isActive("/admin/jobs") ? "text-[#0350c6] font-semibold" : ""
                }
              >
                Jobs
              </span>
            </Link>
            <Link
              to="/admin/candidates"
              className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-base"
            >
              <Icon icon="mdi:account" className="w-6 h-6" />
              <span
                className={
                  isActive("/admin/candidates")
                    ? "text-[#0350c6] font-semibold"
                    : ""
                }
              >
                Candidates
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-base"
            >
              <Icon icon="fluent:home-48-filled" className="w-6 h-6" />
              <span>Home</span>
            </Link>
            <Link
              to="/jobs"
              className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-base"
            >
              <Icon icon="mdi:briefcase" className="w-6 h-6" />
              <span>Find Jobs</span>
            </Link>
            {!user && (
              <Link
                to="/hire"
                className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-base"
              >
                <Icon icon="mdi:account" className="w-6 h-6" />
                <span>Hire Employees</span>
              </Link>
            )}
            <Link
              to="/company"
              className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-base"
            >
              <Icon icon="mdi:office-building" className="w-6 h-6" />
              <span>Companies</span>
            </Link>
          </>
        )}
        {!user && (
          <div className="space-y-3 pt-3 border-t mt-3">
            <Link to="/login" className="block">
              <Button className="w-full h-12 bg-white border border-[#0350c6] text-[#0350c6] hover:bg-blue-50 text-base font-semibold">
                Log In
              </Button>
            </Link>
            <Link to="/signup" className="block">
              <Button className="w-full h-12 bg-gradient-to-r from-[#FB9D05] to-[#EA4335]  text-white hover:opacity-90 text-base font-semibold">
                Register
              </Button>
            </Link>
          </div>
        )}
        {user && (
          <div className="space-y-3 pt-3 border-t mt-3">
            {user.role === "recruiter" ? (
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-base ${
                  isActive("/admin/dashboard") ? "text-[#0350c6] font-semibold" : ""
                }`}
              >
                <Icon icon="mdi:chart-pie" className="w-6 h-6" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/profile"
                className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-base"
              >
                <Icon icon="mdi:account" className="w-6 h-6" />
                <span>View Profile</span>
              </Link>
            )}
            <button
              onClick={logoutHandler}
              className="w-full flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg text-base text-red-600 hover:text-red-700"
            >
              <Icon icon="mdi:logout" className="w-6 h-6" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Add NavLink component for consistent styling
  const NavLink = ({ to, icon, children }) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        className={`relative inline-flex items-center gap-1 h-full pb-1 group ${
          active ? "text-[#012760]" : "text-[#444444]"
        }`}
      >
        {icon && (
          <div className="relative w-6 h-6 flex items-center justify-center">
            {icon}
          </div>
        )}
        <div className="font-bold text-base">{children}</div>
        {/* Active indicator that sits at the very bottom of navbar */}
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#0350c6] transition-all duration-200 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-50"
        }`}></div>
      </Link>
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-200 z-50">
      <div className="flex items-center justify-between mx-auto h-[80px] md:h-[82px] px-4 sm:px-6 max-w-7xl">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center group relative">
            <div
              className="relative w-[35px] h-[42px] sm:w-[40px] sm:h-[48px] md:w-[45px] md:h-[54px] cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src={logo2}
                alt="Hirees Logo"
                className="h-full w-full cursor-pointer transition-all duration-300"
              />
            </div>
            <span className="ml-2 font-semibold mb-3 text-[#444444] text-2xl sm:text-2xl md:text-2xl lg:text-2xl">
              Hirees
            </span>
          </div>
        </div>

        {/* Empty flex-1 space to push navigation to right */}
        <div className="hidden md:block flex-1"></div>

        {/* Navigation Links - Moved to right side */}
        <div className="hidden md:flex items-center mr-9 h-full">
          <div className="flex font-bold gap-8 h-full">
            {user && user.role === "recruiter" ? (
              <>
                <NavLink
                  to="/"
                  icon={<Icon icon="fluent:home-48-filled" width="20" height="20" />}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/admin/companies"
                  icon={<Icon icon="mdi:office-building" width="20" height="20" />}
                >
                  Company
                </NavLink>
                <NavLink
                  to="/admin/jobs"
                  icon={<Icon icon="mdi:briefcase" width="20" height="20" />}
                >
                  Jobs
                </NavLink>
                <NavLink
                  to="/admin/candidates"
                  icon={<Icon icon="mdi:account" width="20" height="20" />}
                >
                  Candidates
                </NavLink>
                <NavLink
                  to="/jobs"
                  icon={<Icon icon="mdi:briefcase" width="20" height="20" />}
                >
                  All Jobs
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  icon={<Icon icon="fluent:home-48-filled" width="20" height="20" />}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/jobs"
                  icon={<Icon icon="mdi:briefcase" width="20" height="20" />}
                >
                  Find Jobs
                </NavLink>
                {!user && (
                  <NavLink
                    to="/signup/recruiter"
                    icon={<Icon icon="mdi:account" width="20" height="20" />}
                  >
                    Hire Employees
                  </NavLink>
                )}
                <NavLink
                  to="/company"
                  icon={<Icon icon="mdi:office-building" width="20" height="20" />}
                >
                  Companies
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login">
                <Button className="w-[100px] h-[40px] bg-white border border-[#0350c6] text-[#0350c6] hover:bg-blue-50 font-semibold text-sm rounded-lg">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-[120px] h-[40px] bg-gradient-to-r from-[#FB9D05] to-[#EA4335] text-white hover:opacity-90 font-semibold text-sm px-4 rounded-lg">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>{renderAvatar()}</PopoverTrigger>
              <PopoverContent className="w-72">
                <div>
                  <div className="flex gap-2 space-y-2">
                    {renderAvatar()}
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user.role === "recruiter" ? (
                      <>
                        <Link
                          to="/admin/dashboard"
                          className={`flex items-center gap-2 hover:text-[#0350c6] mb-4 justify-start ml-3 mt-3 ${
                            isActive("/admin/dashboard")
                              ? "text-[#0350c6] font-semibold"
                              : ""
                          }`}
                        >
                          <Icon icon="mdi:chart-pie" width="18" height="18" />
                          Dashboard
                        </Link>
                        <Button
                          onClick={logoutHandler}
                          variant="ghost"
                          className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Icon icon="mdi:logout" width="16" height="16" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2 pt-2 border-t ">
                        <Link to="/profile">
                          <Button
                            variant="ghost"
                            className="justify-start gap-2"
                          >
                            <Icon icon="mdi:account" width="16" height="16" />
                            View Profile
                          </Button>
                        </Link>
                        <Button
                          onClick={logoutHandler}
                          variant="ghost"
                          className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Icon icon="mdi:logout" width="16" height="16" />
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2.5 hover:bg-gray-100 rounded-lg active:bg-gray-200"
        >
          <Icon icon="mdi:menu" width="28" height="28" />
        </button>
      </div>
      <MobileMenu />
    </div>
  );
});

export default Navbar;