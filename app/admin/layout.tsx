"use client";
import '../globals.css'
import { Inter } from 'next/font/google';
import { AdminNav } from "./AdminNav";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 text-slate-800`}>
        {!isLogin && (
          <>
            {/* Header profesional */}
            <header className="w-full bg-black shadow-2xl">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <div>
                      <img
                        src="/Logofavicon.png"
                        alt="Let's Go Travel Logo"
                        className="h-9 w-auto"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-white">
                        Panel Administrativo
                      </h1>
                      <p className="text-sm text-amber-400 font-medium">Let's Go Travel & SS</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl font-bold"
                  >
                    <LogOut size={18} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
              
              {/* Navegación integrada */}
              <AdminNav />
            </header>
          </>
        )}

        <main className={`flex-1 w-full mx-auto ${isLogin ? "max-w-md py-20" : "max-w-7xl px-6 py-8"}`}>
          {children}
        </main>
      </body>
    </html>
  );
}
