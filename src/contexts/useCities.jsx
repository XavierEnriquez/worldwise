import { useContext } from "react";
import CitiesContext from "./CitiesContext";

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(
      "CitiesContext in useCities was used outside CitiesProvider"
    );

  return context;
}

export default useCities;
