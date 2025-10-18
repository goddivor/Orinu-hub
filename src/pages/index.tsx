import { createBrowserRouter, RouterProvider } from "react-router";
import LadingPage from "./landing";
import RootLayout from "../app.layout";
import NotFound from "./NotFound";
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LadingPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
