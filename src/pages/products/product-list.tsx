import Dinero from "dinero.js";
import { Loading } from "@components/loading";
import { ProductItem } from "./product-item";
import { ProductAttr, getAllProducts } from "../../services/product";
import { useEffect, useState } from "react";

const ProductList = (): React.ReactElement => {
  const [products, setProducts] = useState<Array<ProductAttr> | null>(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      setIsloading(true);
      await getAllProducts().then((response) => {
        setProducts(response);
        setIsloading(false);
      });
    };
    void loadProducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="product-container" className="py-16 px-4 sm:py-6 sm:px-6 lg:px-8">
      <div className="mt-6 grid grid-cols-2 gap-y-8 gap-x-2 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 xl:gap-x-4">
        {products ? (
          products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={Dinero({
                amount: product.price * 100,
                currency: "COP",
              }).toFormat("$0,0")}
              imageUrl={product.imageUrl}
            />
          ))
        ) : (
          <p>no hay datos </p>
        )}
      </div>
    </div>
  );
};

export { ProductList };
