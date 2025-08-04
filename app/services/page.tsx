import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceGrid } from "@/components/service-grid";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata = {
  title: "Servicios | Let's Go Travel",
  description: "Descubre nuestros servicios integrales de viaje, que incluyen itinerarios personalizados, tramitación de visas, seguros de viaje y más.",
};

export default function ServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4064827/pexels-photo-4064827.jpeg')] bg-cover bg-center opacity-70"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Soluciones de viaje integrales diseñadas para que tu experiencia sea fluida e inolvidable
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="¿Cómo Podemos Ayudarte?"
            subtitle="Ofrecemos una amplia gama de servicios para que tu experiencia de viaje sea excepcional"
            center
          />
          
          <ServiceGrid />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Nuestro Proceso"
            subtitle="Desde la primera consulta hasta tu regreso, estamos contigo en cada paso del camino"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold-500 text-black font-bold flex items-center justify-center text-2xl mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Consulta</h3>
              <p className="text-gray-600">Conocemos tus preferencias, presupuesto y destinos soñados.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold-500 text-black font-bold flex items-center justify-center text-2xl mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Planificación</h3>
              <p className="text-gray-600">Nuestros expertos diseñan un itinerario personalizado según tus necesidades.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold-500 text-black font-bold flex items-center justify-center text-2xl mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Reservas</h3>
              <p className="text-gray-600">Nos encargamos de todas las reservas y logística para una experiencia sin complicaciones.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold-500 text-black font-bold flex items-center justify-center text-2xl mx-auto mb-4">4</div>
              <h3 className="text-xl font-bold mb-2">Soporte</h3>
              <p className="text-gray-600">Disfruta de asistencia 24/7 durante todo tu viaje para mayor tranquilidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Servicios Adicionales"
            subtitle="Más allá de lo básico, ofrecemos servicios especializados para mejorar tu experiencia"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-gold-500">
              <h3 className="text-2xl font-bold mb-4">Viajes Corporativos</h3>
              <p className="text-gray-600 mb-6">
  Servicios especializados para viajeros de negocios y eventos corporativos. Entendemos las necesidades únicas del mundo empresarial y brindamos soluciones eficientes y confiables.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Reservas en clase ejecutiva y servicios premium
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Asistencia en la planificación de conferencias y eventos
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Traslados VIP y transporte privado
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Gestión detallada de gastos y reportes
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-gold-500">
              <h3 className="text-2xl font-bold mb-4">Luna de Miel y Ocasiones Especiales</h3>
              <p className="text-gray-600 mb-6">
                Haz que tus momentos especiales sean inolvidables con nuestros paquetes premium diseñados para celebraciones y escapadas románticas.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Reservas para cenas románticas y sorpresas especiales
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Paquetes de fotografía para capturar tus recuerdos
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                 Mejoras exclusivas y experiencias VIP
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Lista de regalos personalizada para contribuciones de luna de miel
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Conocer Nuestros Servicios?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
  Contacta a nuestro equipo hoy mismo y permítenos ayudarte a planificar tu próxima aventura con nuestros servicios de viaje premium.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-gold-500 text-black font-semibold rounded-lg hover:bg-gold-600 transition-colors"
          >
            Contáctanos
          </a>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
}