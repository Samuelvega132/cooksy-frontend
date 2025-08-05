import type { Metadata } from "next";
import "./globals.css";
import LayoutClient from "./layoutClient";

export const metadata: Metadata = {
  title: "Cooksy",
  description: "Explora y comparte recetas deliciosas con estilo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased bg-white">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
