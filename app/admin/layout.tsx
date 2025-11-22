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
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100`}>
        {!isLogin && (
          <>
            {/* Header moderno con degradado */}
            <header className="w-full bg-white border-b border-gray-200 shadow-sm">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-2 rounded-xl shadow-lg">
                      <img
                        src="/logo - Editado.png"
                        alt="Let's Go Travel Logo"
                        className="h-12 w-auto"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-900">
                        Panel de Administración
                      </h1>
                      <p className="text-sm text-gray-500">Lets Go Travel & SS</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
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
