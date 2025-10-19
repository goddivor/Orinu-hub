import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n/config";
import { ToastProvider } from "./context/toast-context";
import { AuthProvider } from "./context/auth-context";
import { ToastContainer } from "@/components/Toast";
import { AppRouter } from "./pages";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ToastProvider>
      <AppRouter />
      <ToastContainer />
    </ToastProvider>
  </AuthProvider>
);
