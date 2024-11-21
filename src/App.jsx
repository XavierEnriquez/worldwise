import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AuthRoute from "./pages/AuthRoute";
import CityList from "./components/city/CityList";
import City from "./components/city/City";
import CountryList from "./components/country/CountryList";
import Form from "./components/form/Form";
import CitiesProvider from "./contexts/CitiesProvider";
import AuthProvider from "./contexts/AuthProvider";
import SpinnerFullPage from "./components/spinner/SpinnerFullPage";
// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";

/*  Using js dynamic import with the React lazy() loading to optimize the the App loading speed in the browser by breaking up the production bundle into smaller files -- Section 19: Lesson: 253 -- */
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

/* React Router -- Section 17 -- */
/* The React Suspense component is used with the React lazy() function -- Section 19: Lesson: 253 -- */
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <AuthRoute>
                    <AppLayout />
                  </AuthRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
