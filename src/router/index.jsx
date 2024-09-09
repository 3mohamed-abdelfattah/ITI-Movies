import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import { HomePage } from "../pages/HomePage";
import { About } from './../pages/About';
import { Services } from './../pages/Services';
import { Contact } from './../pages/Contact';
import { NotFound } from "../pages/NotFound";
import { MovieDetail } from "../pages/ProductDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/movie/:id",
        element: <MovieDetail />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/services",
        element: <Services />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;