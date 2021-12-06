import Dinero from "dinero.js";
import { Loading } from "@components/loading";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ProductAttr, getProductById } from "../../services/product";
import { useEffect, useState } from "react";

const ProductDetail = (): React.ReactElement => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductAttr>();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductInfo = async (): Promise<void> => {
      if (id) {
        const data = await getProductById(id);
        setProduct(data);
      }
    };
    void getProductInfo();
  }, [id]);

  return (
    <div className="mx-auto max-w-5xl py-10">
      <div className="grid grid-cols-12">
        <div className="col-span-12  sm:col-span-7 max-h-96 bg-gray-100">
          <img
            src={product?.imageUrl}
            alt={`img-${"001"}`}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            data-zoom={product?.imageUrl}
          />
        </div>
        <div className="col-span-12  sm:col-span-5 border rounded-r-md relative">
          <div className="flex flex-col justify-center items-center">
            <div className="leading-none">
              <h2 className="text-3xl my-2">{product?.name}</h2>
              <small className="rounded-full text-xs px-3 py-0.5 bg-secondary text-left">
                {product?.genre}
              </small>
            </div>
          </div>
          <div className="mx-6 pt-8">
            <p className="text-gray-500">{product?.description}</p>
            <p className="text-lg font-medium text-gray-600 mt-8">
              {product ? (
                Dinero({
                  amount: product.price * 100,
                }).toFormat("$0,0")
              ) : (
                <Loading />
              )}
            </p>
          </div>
          <button
            className="absolute right-2 sm:left-2 bottom-4 py-1 px-3 bg-secondary"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProductDetail };
