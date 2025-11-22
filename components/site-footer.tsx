import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { FaTiktok } from "react-icons/fa";


export function SiteFooter() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold text-gold-500">{siteConfig.name}</h2>
            </Link>
            <p className="text-gray-300 mb-4">
              Tu agencia de viajes premium en Ecuador, especializada en experiencias personalizadas por Sudamérica, Europa y más allá.
            </p>
            <div className="flex space-x-4">
              <Link
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gold-400 transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gold-400 transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
  href={siteConfig.links.tiktok}
  target="_blank"
  rel="noopener noreferrer"
  className="text-white hover:text-gold-400 transition-colors"
>
  <FaTiktok size={20} />
  <span className="sr-only">TikTok</span>
</Link>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-500">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {siteConfig.mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-500">Contáctanos</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-gold-500 mt-1" />
                <span className="text-gray-300">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-gold-500" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gold-500" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        {/* Partner Platforms Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gold-500 text-center">Nuestras Plataformas</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {/* LEOps Button */}
            <a
              href="https://leops.vercel.app/apps"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-black hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-600 rounded-lg transition-all duration-300 shadow-lg hover:shadow-gold-500/50 border-2 border-gold-500"
            >
              <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                <img 
                  src="/favicon.svg" 
                  alt="LEOps Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <p className="font-bold text-gold-500 group-hover:text-black">LEOps</p>
                <p className="text-xs text-gold-400 group-hover:text-black/80">Gestión Empresarial</p>
              </div>
            </a>

            {/* FirstMile Button */}
            <a
              href="https://www.firstmile.com.ec/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-black hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-600 rounded-lg transition-all duration-300 shadow-lg hover:shadow-gold-500/50 border-2 border-gold-500"
            >
              <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                <img 
                  src="/firstmile.jpeg" 
                  alt="FirstMile Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <p className="font-bold text-gold-500 group-hover:text-black">FirstMile</p>
                <p className="text-xs text-gold-400 group-hover:text-black/80">Transfers y logística</p>
              </div>
            </a>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        {/* Bottom Footer (derechos reservados + licencia LUAE) */}
<div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
  <p>
    &copy; {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
  </p>
  <p className="mt-2 md:mt-0">
    LUAE: 2025WEBLUAE455225
  </p>
</div>

      </div>
    </footer>
  );
}
