import { createContext, useContext, useState, useEffect } from "react";
import { account, ID } from "../appwrite/config";
import Loader from "../components/Loader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    userStatus();
  }, []);

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const registerUser = async (email, password, name) => {
    setLoading(true);
    try {
      await account.create(ID.unique(), email, password, name);
      loginUser(email, password);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const logoutUser = () => {
    setLoading(true);
    account.deleteSession("current");
    setUser(null);
    setLoading(false);
  };

  const userStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const contextValue = {
    loading,
    setLoading,
    user,
    setUser,
    loginUser,
    registerUser,
    logoutUser,
    userStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? (
        <div className="flex-center h-dvh w-full">
          <Loader />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
