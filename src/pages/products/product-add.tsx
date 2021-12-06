import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProductAttr, createProduct } from "../../services/product";
import {
  getDownloadURL,
  ref,
  storage,
  uploadBytes,
} from "../../firebase-config";

type ProductFormData = Omit<ProductAttr, "id" | "createdDate" | "active">;
const ProductAdd = (): React.ReactElement => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductFormData>();

  const navigate = useNavigate();

  const [fileSelected, setfileSelected] = useState<File>();
  //const [urlDescarga, seturlDescarga] = useState("");

  const handleChange = (selectorFiles: FileList | null): void => {
    if (selectorFiles) {
      const file = selectorFiles[0];
      setfileSelected(file);
    }
  };

  const uploadFileToStorage = async (): Promise<string> => {
    if (!fileSelected) return "";

    const fileName =
      fileSelected != null
        ? `productos/${fileSelected.name}-${Date.now()}`
        : "";
    //cargarlo a firebase storage
    const fileRef = ref(storage, fileName);
    const urlImage = await uploadBytes(fileRef, fileSelected).then(async () => {
      //obtener url descarga
      return await getDownloadURL(fileRef).then((downloadURL) => {
        //seturlDescarga(downloadURL);
        return downloadURL;
      });
    });

    return urlImage;
  };

  const handleCreateProduct = async (
    product: ProductFormData
  ): Promise<void> => {
    await uploadFileToStorage().then((urlDescarga) => {
      try {
        const newProduct = {
          ...product,
          imageUrl: urlDescarga,
        };
        void createProduct(newProduct);
        navigate("/products");
      } catch (error) {
        alert(error);
      }
    });
  };

  return (
    <div className="mx-auto max-w-xs md:max-w-3xl my-6">
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-600 dark:text-gray-400"
          >
            Nombre
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
          />
          {errors.name?.type === "required" && (
            <small className="text-red-600">El nombre es requerido</small>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-600 dark:text-gray-400"
          >
            Descripción
          </label>
          <textarea
            {...register("description")}
            id="description"
            name="description"
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-gray-600 dark:text-gray-400"
          >
            Precio
          </label>
          <input
            {...register("price", { required: true })}
            type="number"
            id="price"
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
          />
          {errors.price?.type === "required" && (
            <small className="text-red-600">El precio es requerido</small>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="genre"
            className="block text-gray-600 dark:text-gray-400"
          >
            Género
          </label>
          <select
            {...register("genre", { required: true })}
            id="genre"
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
          >
            <option value="" className="text-gray-500">
              --seleccione--
            </option>
            <option value="Femenimo">Femenimo</option>
            <option value="Masculino">Masculino</option>
          </select>
          {errors.genre?.type === "required" && (
            <small className="text-red-600">Seleccione un género válido</small>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="imageUrl"
            className="block text-gray-600 dark:text-gray-400"
          >
            Seleccione una imagen
          </label>
          <input
            type="file"
            name="imageUrl"
            id="imageUrl"
            placeholder="Añade un archivo"
            onChange={(e) => handleChange(e.target.files)}
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
          />
          {errors.imageUrl?.type === "required" && (
            <small className="text-red-600">Seleccione un género válido</small>
          )}
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-5 py-2 bg-primary-200 text-white w-full"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export { ProductAdd };
