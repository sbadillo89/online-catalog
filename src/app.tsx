import { Administration } from "./pages/administration";
import { Fragment } from "react";
import { Login } from "./pages/auth/login";
import { Navbar } from "@components/navbar";
import { NotFound } from "@components/not-found";
import { ProductAdd } from "./pages/products/product-add";
import { ProductDetail } from "./pages/product-detail";
import { ProductList } from "./pages/products/product-list";
import { ProductsGenre } from "./pages/products/products-genre";
import { useAuth } from "./hooks/use-auth";
import { Route, Routes } from "react-router-dom";

const App = (): React.ReactElement => {
  const { user } = useAuth();

  return (
    <Fragment>
      <Navbar />

      <Routes>
        {user && (
          <Fragment>
            <Route path="/product-add" element={<ProductAdd />} />
            <Route path="/administration" element={<Administration />} />
          </Fragment>
        )}

        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route
          path="/products-men"
          element={<ProductsGenre genre="Masculino" />}
        />
        <Route
          path="/products-women"
          element={<ProductsGenre genre="Femenino" />}
        />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export { App };
