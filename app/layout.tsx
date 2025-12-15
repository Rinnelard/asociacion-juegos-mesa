import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Asociación de Juegos de Mesa - Comunidad de Jugadores",
  description: "Únete a nuestra comunidad de entusiastas de los juegos de mesa. Descubre nuevos juegos, participa en eventos y conecta con otros jugadores.",
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
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
