import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import { HomePage } from "@/pages/HomePage";
import { NotFound } from "@/pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
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