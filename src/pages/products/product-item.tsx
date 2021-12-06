import { NavLink } from "react-router-dom";

type ProductItemProps = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
};

const ProductItem = ({
  id,
  name,
  description,
  price,
  imageUrl = "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
}: ProductItemProps): React.ReactElement => {
  return (
    <div className="group relative rounded-md mx-auto shadow-lg overflow-hidden transform transition duration-500 hover:scale-110">
      <div className="w-full h-52 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 lg:aspect-none">
        <img
          src={imageUrl}
          alt={`img-${name}`}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          data-zoom={imageUrl}
        />
      </div>
      <div className="px-4 py-3 bg-white">
        <div>
          <NavLink
            to={`/product-detail/${id}`}
            className="text-gray-800 font-semibold text-lg hover:text-red-500 transition duration-300 ease-in-out"
          >
            <span aria-hidden="true" className="absolute inset-0"></span>
            <span className="capitalize">{name}</span>
          </NavLink>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex py-2">
          <p className="mr-2 text-sm font-medium text-gray-600">{price}</p>
          {/* <p className="mr-2 text-xs text-red-600 line-through">$15.00</p> */}
        </div>
      </div>
    </div>
  );
};

export { ProductItem };
