import { useContext } from "react";
import AuthContext from "./AuthContext";

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext used outside AuthProvider");
  return context;
}

export default useAuth;
