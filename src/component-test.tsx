import React from "react";
import { useAuth } from "./hooks/use-auth";

const Test = (): React.ReactElement => {
  const { logout } = useAuth();
  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  return (
    <div>
      <h3>Test component</h3>
      <br></br>

      <button
        type="submit"
        className="h-8 w-20 border shadow-lg my-5"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export { Test };
