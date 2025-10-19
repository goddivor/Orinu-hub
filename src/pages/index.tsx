import { createBrowserRouter, RouterProvider } from "react-router";
import LadingPage from "./landing";
import Register from "./register";
import RootLayout from "../app.layout";
import NotFound from "./NotFound";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LadingPage /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
