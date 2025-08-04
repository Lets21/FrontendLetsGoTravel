"use client";
import '../globals.css'
import { Inter } from 'next/font/google';
import { AdminNav } from "./AdminNav";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  return (
    <html lang="es">
      {/* Fondo claro y suave para todo el panel admin */}
      <body className={`${inter.className} min-h-screen bg-gray-100`}>
        {/* Header y Nav SOLO si no es login */}
        {!isLogin && (
          <>
            <header className="w-full flex items-center gap-6 px-10 pt-8 pb-4 border-b border-gold-500 bg-black shadow-lg mb-0">
              <img
                src="/logo - Editado.png"
                alt="Let's Go Travel Logo"
                className="h-16 w-auto"
                style={{ minWidth: 64 }}
              />
              <h1 className="text-3xl font-extrabold tracking-tight text-gold-400 drop-shadow">
                Panel de Administración
              </h1>
            </header>
            {/* Nav con fondo negro y dorado */}
            <div className="bg-black border-b border-gold-500">
              <AdminNav />
            </div>
          </>
        )}

        <main
          className={`flex-1 w-full mx-auto flex flex-col justify-center ${
            isLogin ? "max-w-md" : "max-w-5xl"
          }`}
          style={isLogin ? { minHeight: "60vh", paddingTop: 60 } : {}}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
