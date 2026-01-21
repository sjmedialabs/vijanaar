import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

function FaviconLoader() {
  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL; // ✅ Vite way
    fetch(`${apiBase}/companydetails`)
      .then((res) => res.json())
      .then((data) => {
        const favIconUrl = data?.sectionOne?.favIconUrl;
        if (favIconUrl) {
          const link =
            document.querySelector<HTMLLinkElement>("#dynamic-favicon") ||
            document.createElement("link");
          link.id = "dynamic-favicon";
          link.rel = "icon";
          // If your DB only stores filename like "favicon.png", prepend API base
          link.href = favIconUrl.startsWith("http")
            ? favIconUrl
            : `${apiBase}${favIconUrl}`;
          document.head.appendChild(link);
        }
      })
      .catch((err) => console.error("Favicon load failed:", err));
  }, []);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <FaviconLoader />
        <App />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
);
