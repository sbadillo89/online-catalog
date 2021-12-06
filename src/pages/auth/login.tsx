import { UserAttr } from "../../services/user";
import { useAuth } from "../../hooks/use-auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";

type LoginFormData = Omit<UserAttr, "id">;

const Login = (): React.ReactElement => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>();

  const navigate = useNavigate();
  const { login, setUser } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = async (user: LoginFormData): Promise<void> => {
    setError("");
    await login(user.email, user.password).then((loginResponse) => {
      if (!loginResponse.hasError) {
        setUser(loginResponse.user);
        setError("");
        navigate("/products");
      } else {
        const codeError = loginResponse.error?.code;
        if (
          codeError === "auth/wrong-password" ||
          codeError === "auth/user-not-found"
        ) {
          setError("Usuario o contraseña errados.");
        }
        if (codeError === "auth/too-many-requests") {
          setError(
            "Cuenta suspendida temporalmente (supero máximo de intentos fallidos)."
          );
        }
      }
    });
  };

  return (
    <Fragment>
      <div className="flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Inicie sesión
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Inicie sesión para acceder a su cuenta.
              </p>
            </div>
            <div className="m-7">
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                  {errors.email?.type === "required" && (
                    <small className="text-red-600">
                      El correo es requerido
                    </small>
                  )}
                </div>
                <div className="">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Contraseña
                    </label>
                    <a
                      href="#!"
                      className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
                    >
                      Olvidaste contraseña?
                    </a>
                  </div>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    name="password"
                    id="password"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                  {errors.password?.type === "required" && (
                    <small className="text-red-600">
                      La contraseña es requerida
                    </small>
                  )}
                </div>
                {error && (
                  <p className="bg-red-400 my-1 py-2 text-white flex-grow text-center">
                    {error}
                  </p>
                )}
                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full px-3 py-4 text-white bg-primary-100 hover:bg-primary-200 rounded-md focus:bg-indigo-600 focus:outline-none mt-6"
                  >
                    Iniciar sesión
                  </button>
                </div>
                <p className="text-sm text-center text-gray-400">
                  No tienes cuenta?{" "}
                  <a
                    href="#!"
                    className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                  >
                    Registrate
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { Login };
