import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
// layouts
import RootLayout from "./layouts/RootLayout";
import GamesLayout, { categoriesLoader } from "./layouts/GamesLayout";
// pages
import Home from "./pages/Home";
import Games, { categorieLoader } from "./pages/Games";
import GamesDefault from "./pages/GamesDefault";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import ShowError from "./pages/ShowError";
import Thanks from "./pages/Thanks";

const Router = () => {
  const [cart, setCart] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout cart={cart} setCart={setCart}></RootLayout>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home></Home> },
        {
          path: "games",
          element: <GamesLayout></GamesLayout>,
          loader: categoriesLoader,
          errorElement: <NotFound></NotFound>,
          children: [
            { index: true, element: <GamesDefault /> },
            {
              path: ":id",
              element: <Games setCart={setCart}></Games>,
              loader: categorieLoader,
              errorElement: <ShowError />,
            },
          ],
        },
        {
          path: "checkout",
          element: <Checkout cart={cart} setCart={setCart} />,
        },
        { path: "thanks", element: <Thanks /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default Router;
