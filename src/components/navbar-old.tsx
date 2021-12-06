import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useState } from "react";

const Navbar = (): React.ReactElement => {
  const { user } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex flex-wrap place-items-center sticky top-0 z-30">
      <section className="relative mx-auto">
        {/* <!-- navbar --> */}
        <nav className="flex justify-between bg-primary-200 text-white w-screen">
          <div className="px-5 xl:px-12 py-3 flex w-full justify-between items-center">
            <div>
              <NavLink className="text-3xl font-bold font-heading" to="/">
                Logo Here.
              </NavLink>
            </div>

            <div className="md:flex items-center">
              <div className="flex flex-col md:flex-row md:mx-6">
                {/* <!-- Nav Links --> */}
                <ul
                  className={`${
                    openMenu ? "block" : "hidden"
                  } md:flex px-4 mx-auto font-semibold font-heading space-x-12`}
                >
                  <li>
                    <NavLink className="hover:text-gray-200" to="/">
                      Inicio
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="hover:text-gray-200" to="/products">
                      Productos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="hover:text-gray-200" to="/products-men">
                      Hombre
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="hover:text-gray-200"
                      to="/products-women"
                    >
                      Mujer
                    </NavLink>
                  </li>

                  <li>
                    <NavLink className="hover:text-gray-200" to="#">
                      Contact Us
                    </NavLink>
                  </li>
                  {user && (
                    <li>
                      <NavLink
                        className="hover:text-gray-200"
                        to="/administration"
                      >
                        Administrar
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {/* { <!-- Mobile menu button -->} */}
            <div className="flex md:hidden pr-2">
              <button
                type="button"
                className="text-white hover:text-gray-600 focus:outline-none focus:text-gray-50"
                onClick={() => setOpenMenu(!openMenu)}
                aria-label="toggle menu"
                aria-expanded={openMenu}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>

            {/* <!-- Header Icons --> */}
            <div className="hidden xl:flex items-center space-x-5">
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
              {user && <p>{user.email}</p>}
            </div>
          </div>
        </nav>
      </section>
    </div>
  );
};

export { Navbar };
