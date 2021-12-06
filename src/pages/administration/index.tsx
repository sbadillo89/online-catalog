import { MdOutlinePostAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Administration = (): React.ReactElement => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-x-8 gap-y-10 mx-auto container max-w-3xl mt-16">
      <NavLink
        to="/product-add"
        className="border rounded shadow-sm text-center py-6 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 group"
      >
        <MdOutlinePostAdd className="text-secondary h-10 w-10" />
        <span className="text-primary-200 mt-2">Agregar producto</span>
      </NavLink>

      <div className="border rounded shadow-sm text-center py-6 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
        ...
      </div>
      <div className="border rounded shadow-sm text-center py-6 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
        ...
      </div>
      <div className="border rounded shadow-sm text-center py-6 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
        ...
      </div>
    </div>
  );
};

export { Administration };
