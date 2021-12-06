import { HiChevronDown } from "react-icons/hi";
import { LogoStore } from "../assets/images";
import { useAuth } from "../hooks/use-auth";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = (): React.ReactElement => {
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-primary-200 text-white shadow">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <img
              className="h-8 w-8 mx-auto object-contain"
              src={LogoStore}
              alt="black store logo"
            />
            <NavLink
              className="text-3xl font-bold font-heading text-lime-300"
              to="/"
            >
              Black Store
            </NavLink>
          </div>

          {/* <!-- Mobile menu button --> */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={() => setOpenMenu(!openMenu)}
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
        <div
          className={`md:flex items-center ${openMenu ? "block" : "hidden"}`}
        >
          <div className="flex flex-col md:flex-row md:mx-6 gap-y-1 sm:gap-x-6">
            <NavLink className="hover:text-lime-300" to="/">
              Inicio
            </NavLink>
            {/* <NavLink className="hover:text-lime-300" to="/products">
              Productos
            </NavLink> */}
            <NavLink className="hover:text-lime-300" to="/products-men">
              Hombre
            </NavLink>
            <NavLink className="hover:text-lime-300" to="/products-women">
              Mujer
            </NavLink>
            {user && (
              <NavLink className="hover:text-lime-300" to="/administration">
                Administrar
              </NavLink>
            )}
          </div>

          <div className="flex items-center space-x-5">
            {/* <!-- Sign In / Register      --> */}
            <NavLink
              className="flex items-center hover:text-gray-200"
              to="/login"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </NavLink>
            {user && (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-secondary rounded-md">
                    {user.email}
                    <HiChevronDown
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 text-primary-200">
                      <Menu.Item>
                        <button
                          className="pl-4 font-medium py-1"
                          onClick={handleLogout}
                        >
                          Cerrar sesión
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
