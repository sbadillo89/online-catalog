import { FaCircleNotch } from "react-icons/fa";

const Loading = (): React.ReactElement => {
  return (
    <div className="w-full h-full fixed block top-0 left-0 bg-gray-50 opacity-75 z-50">
      <div className="flex flex-col justify-center items-center h-full">
        <FaCircleNotch className="h-12 w-12 animate-spin text-lime-300" />
        <span className="pt-3 text-gray-500 font-medium animate-bounce">
          Cargando...
        </span>
      </div>
    </div>
  );
};

export { Loading };
