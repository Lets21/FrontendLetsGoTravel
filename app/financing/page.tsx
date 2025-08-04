import Image from "next/image";
import Link from "next/link";
import { Calculator, Ban as Bank, CreditCard, Calendar } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export const metadata = {
  title: "Opciones de Financiamiento | Let's Go Travel",
  description: "Explora opciones de financiamiento flexibles para tus vacaciones soñadas con Let's Go Travel. Viaja ahora y paga en cómodas cuotas mensuales.",
};


export default function FinancingPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg')] bg-cover bg-center opacity-70"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Viaja Ahora, Paga Después</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Opciones de financiamiento flexibles para hacer realidad tus vacaciones soñadas
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <SectionHeading
                title="¿Cómo Funciona el Financiamiento?"
                subtitle="Opciones de pago simples, transparentes y convenientes"
              />
              
              <p className="text-gray-600 mb-6">
  Sabemos que viajar es una inversión, por eso nos hemos aliado con las principales entidades financieras de Ecuador para ofrecerte planes de pago flexibles que te permiten viajar hoy mismo.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-gold-100 p-2 rounded-full text-gold-600">
                    <Calculator size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Personaliza tu Plan</h3>
                    <p className="text-gray-600">Elige el plazo que mejor se adapte a tu presupuesto, desde 3 hasta 24 meses.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-gold-100 p-2 rounded-full text-gold-600">
                    <Bank size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Alianzas con Bancos</h3>
                    <p className="text-gray-600">Aprovecha tasas preferenciales con bancos y tarjetas de crédito aliadas.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-gold-100 p-2 rounded-full text-gold-600">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Sin Cargos Ocultos</h3>
                    <p className="text-gray-600">Precios transparentes sin cargos sorpresa ni comisiones ocultas.</p>
                  </div>
                </div>
              </div>
              
              <Button
                asChild
                className="bg-gold-500 hover:bg-gold-600 text-black font-medium"
              >
                <Link href="/contact">
                  Habla con un Asesor de Financiamiento
                </Link>
              </Button>
            </div>
            
            <div className="order-1 lg:order-2 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg"
                alt="Travel financing"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Planes de Financiamiento"
            subtitle="Elige el plan de pagos que mejor se ajuste a ti"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center text-gold-500 mb-6">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Plan a 3 Meses</h3>
              <p className="text-gray-600 mb-4">
                 Ideal para necesidades de financiamiento a corto plazo con el menor costo total.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-2"></span>
                  <span className="text-gray-600">0% interés con tarjetas de crédito seleccionadas</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-2"></span>
                  <span className="text-gray-600">Proceso de aplicación sencillo</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-2"></span>
                  <span className="text-gray-600">Aprobación rápida</span>
                </li>
              </ul>
              <p className="font-semibold">Ejemplo: Viaje de $1.200 = $400/mes</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md relative border-2 border-gold-500">
              <div className="absolute top-0 right-0 bg-gold-500 text-black py-1 px-3 text-sm font-bold">
                Más Popular
              </div>
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center text-gold-500 mb-6">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Plan a 12 Meses</h3>
              <p className="text-gray-600 mb-4">
                 Pagos equilibrados para viajes de mediano plazo.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-2"></span>
                  <span className="text-gray-600">Tasas competitivas con bancos aliados</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-2"></span>
                  <span className="text-gray-600">Pagos mensuales manejables</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-2"></span>
                  <span className="text-gray-600">Fechas de pago flexibles</span>
                </li>
              </ul>
              <p className="font-semibold">Ejemplo: Viaje de $2.400 = $200/mes</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center text-gold-500 mb-6">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Plan a 24 Meses</h3>
              <p className="text-gray-600 mb-4">
                Cuotas mensuales mínimas para viajes premium o de lujo.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-2"></span>
                  <span className="text-gray-600">Plazo extendido de pagos</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-2"></span>
                  <span className="text-gray-600">Viajes de lujo al alcance de tu presupuesto</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-2"></span>
                  <span className="text-gray-600">Opción de pago anticipado sin penalización</span>
                </li>
              </ul>
              <p className="font-semibold">Ejemplo: Viaje de $4.800 = $200/mes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Banks */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Nuestros Aliados Financieros"
            subtitle="Trabajamos con las instituciones más confiables del Ecuador"
            center
          />
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
            {siteConfig.banks.map((bank) => (
              <div key={bank.name} className="text-center">
                <div className="w-40 h-24 bg-white rounded-lg shadow-md flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={bank.logo}
                      alt={bank.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="mt-3 font-medium">{bank.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Preguntas Frecuentes"
            subtitle="Resolvemos tus dudas sobre nuestras opciones de financiamiento"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">¿Qué documentos necesito para aplicar al financiamiento?</h3>
              <p className="text-gray-600">
Necesitas una cédula válida, comprobante de ingresos y, en algunos casos, un comprobante de domicilio. Nuestros asesores te indicarán lo necesario según tu plan.              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">¿Puedo pagar mi viaje antes del tiempo acordado?</h3>
              <p className="text-gray-600">
¡Claro! Todos nuestros planes permiten pago anticipado sin penalizaciones. Puedes ahorrar intereses pagando antes.              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">¿Existen cargos ocultos?</h3>
              <p className="text-gray-600">
No. Nos enorgullece ofrecer precios transparentes. Todos los costos e intereses se explican antes de contratar.              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">¿Cuánto tiempo tarda la aprobación?</h3>
              <p className="text-gray-600">
                La mayoría de solicitudes se procesan en 24 a 48 horas. En tarjetas aliadas, puede ser inmediata.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">¿Puedo financiar solo una parte de mi viaje?</h3>
              <p className="text-gray-600">
Sí. Puedes financiar solo una parte y pagar el resto al contado. Nos adaptamos a tus necesidades.              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">¿Qué pasa si debo cancelar mi viaje?</h3>
              <p className="text-gray-600">
Aplican nuestras políticas de cancelación. Recomendamos contratar seguro de viaje, que también puedes incluir en tu plan.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Planificar tus Vacaciones Soñadas?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
Nuestros asesores de viaje y financiamiento están listos para ayudarte a diseñar el viaje perfecto con un plan de pago que se ajuste a ti.          </p>
          <Button
            asChild
            size="lg"
            className="bg-gold-500 hover:bg-gold-600 text-black font-semibold"
          >
            <Link href="/contact">
              Contáctanos Hoy
            </Link>
          </Button>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
}