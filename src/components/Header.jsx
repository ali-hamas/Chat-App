import React from "react";
import useAuth from "../context/AuthContext";

const Header = () => {
  const { logoutUser, user } = useAuth();
  return (
    <>
      <header className="sticky top-0 z-20 flex h-[70px] w-full items-center justify-between bg-gray-800/50 px-5 shadow-lg backdrop-blur-md">
        <div className="text-lg font-semibold text-gray-50">{user.name}</div>
        <button onClick={logoutUser}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold hover:bg-red-700">
          Logout
        </button>
      </header>
    </>
  );
};

export default Header;