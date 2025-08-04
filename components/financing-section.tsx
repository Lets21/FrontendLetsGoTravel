import Image from "next/image";
import Link from "next/link";
import { CreditCard, DollarSign, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinancingSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h3 className="text-2xl font-bold mb-4">Viaja Ahora, Paga Después</h3>
        <p className="text-gray-600 mb-6">
          Sabemos que viajar es una inversión. Por eso, nos hemos aliado con los principales bancos y entidades financieras para ofrecerte opciones de financiamiento flexibles que hacen realidad tus vacaciones soñadas.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-start">
            <div className="mt-1 bg-gold-100 p-2 rounded-full text-gold-600 mr-4">
              <CreditCard size={20} />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Cuotas Sin Intereses</h4>
              <p className="text-gray-600">Divide el costo de tu viaje en 3 a 6 meses sin pagar intereses.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mt-1 bg-gold-100 p-2 rounded-full text-gold-600 mr-4">
              <DollarSign size={20} />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Pagos Mensuales Bajos</h4>
              <p className="text-gray-600">Financia tus vacaciones con cuotas desde tan solo $95 al mes.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mt-1 bg-gold-100 p-2 rounded-full text-gold-600 mr-4">
              <Calculator size={20} />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Planes Personalizados</h4>
              <p className="text-gray-600">Trabajaremos contigo para encontrar un plan que se ajuste a tu presupuesto.</p>
            </div>
          </div>
        </div>
        
        <Button
          asChild
          className="bg-gold-500 hover:bg-gold-600 text-black font-medium"
        >
          <Link href="/financing">Conoce Más Sobre el Financiamiento</Link>
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-6 text-center">Ejemplos de Planes de Pago</h3>
        
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h4 className="text-lg font-semibold mb-2">Aventura Europea</h4>
            <p className="text-gray-600 mb-3">10 días en París, Roma y Barcelona</p>
            <div className="flex justify-between mb-1">
              <span>Precio total del paquete:</span>
              <span className="font-semibold">$2,400</span>
            </div>
            <div className="flex justify-between text-gold-600">
              <span>Pago mensual (12 meses):</span>
              <span className="font-bold">$200/mes</span>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-6">
            <h4 className="text-lg font-semibold mb-2">Explorador Galápagos</h4>
            <p className="text-gray-600 mb-3">7 días navegando por las Islas Galápagos</p>
            <div className="flex justify-between mb-1">
              <span>Precio total del paquete:</span>
              <span className="font-semibold">$1,900</span>
            </div>
            <div className="flex justify-between text-gold-600">
              <span>Pago mensual (12 meses):</span>
              <span className="font-bold">$158/mes</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2">Escapada Caribeña</h4>
            <p className="text-gray-600 mb-3">5 días en resort todo incluido en Punta Cana</p>
            <div className="flex justify-between mb-1">
              <span>Precio total del paquete:</span>
              <span className="font-semibold">$1,140</span>
            </div>
            <div className="flex justify-between text-gold-600">
              <span>Pago mensual (12 meses):</span>
              <span className="font-bold">$95/mes</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Financiamiento disponible a través de nuestros bancos aliados. Sujeto a aprobación crediticia.</p>
        </div>
      </div>
    </div>
  );
}                                                                                                                                                                                                                                                                                        