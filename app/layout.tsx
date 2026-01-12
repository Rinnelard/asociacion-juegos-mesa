import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Noctis Ciudad de Juegos - Tu comunidad de ocio",
  description: "Únete a Noctis Ciudad de Juegos, tu comunidad de entusiastas de los juegos de mesa, rol y miniaturas. Descubre nuevos juegos, participa en eventos y conecta con otros jugadores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main>{children}</main>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
