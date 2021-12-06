import React from "react";

const NotFound = (): React.ReactElement => {
  return (
    <div className="bg-white">
      <div className="w-9/12 m-auto py-16 flex items-center justify-center">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 shadow overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-9xl font-bold text-white">404</h1>
            <h1 className="text-6xl font-medium py-8 text-white">
              oops! Página no encontrada
            </h1>
            <p className="text-2xl pb-8 px-12 font-medium text-white">
              Oops! La página que busca no existe. Puede que se haya movido o
              eliminado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NotFound };
