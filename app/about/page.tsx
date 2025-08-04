import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata = {
  title: "Sobre Nosotros | Let's Go Travel",
  description: "Conoce Let's Go Travel, tu agencia de viajes premium en Ecuador especializada en experiencias de viaje personalizadas en Sudamérica, Europa y más allá.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg')] bg-cover bg-center opacity-70"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Nos apasiona crear experiencias de viaje inolvidables
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Nuestra Historia"
                subtitle="Cómo Let's Go Travel se convirtió en la agencia líder de Ecuador"
              />

              <p className="text-gray-600 mb-4">
                Fundada en 2015, Let's Go Travel nació de una pasión sencilla: compartir la belleza de Ecuador y el mundo con viajeros que buscan experiencias auténticas. Lo que comenzó como una operación pequeña, hoy es una agencia de viajes integral con reputación de excelencia y servicio personalizado.
              </p>

              <p className="text-gray-600 mb-4">
                Nuestra fundadora, inspirada por sus propios viajes transformadores, reconoció la necesidad de experiencias que fueran más allá de las rutas turísticas convencionales. Soñó con crear viajes que conecten a los viajeros con el alma de los destinos, brindando comodidad y seguridad mediante una planificación experta.
              </p>

              <p className="text-gray-600">
                Hoy, Let's Go Travel atiende a cientos de clientes satisfechos cada año, diseñando experiencias personalizadas por Sudamérica, Europa y más allá. Nuestro equipo de asesores de viaje comparte un mismo objetivo: hacer realidad tus sueños de viaje.
              </p>

            </div>
            
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/5157169/pexels-photo-5157169.jpeg"
                alt="Travel consultation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Nuestra Misión y Valores"
            subtitle="Los principios que guían todo lo que hacemos"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-gold-500">
              <h3 className="text-xl font-bold mb-4">Nuestra Misión</h3>
              <p className="text-gray-600">
                Crear experiencias de viaje transformadoras que conecten a las personas con los destinos, culturas y comunidades más inspiradoras del mundo, brindando un servicio excepcional en cada etapa del viaje.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-gold-500">
              <h3 className="text-xl font-bold mb-4">Nuestra Visión</h3>
              <p className="text-gray-600">
                Ser el socio de viaje más confiable para los ecuatorianos que exploran el mundo, reconocidos por nuestro enfoque personalizado, atención al detalle y compromiso con un turismo responsable.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-gold-500">
              <h3 className="text-xl font-bold mb-4">Nuestros Valores</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Personalización en cada itinerario
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Integridad en todas nuestras gestiones
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Excelencia en la prestación de servicios
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                  Sostenibilidad en las prácticas turísticas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Conoce a Nuestro Equipo"
            subtitle="Expertos dedicados a diseñar tu viaje ideal"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-6">
                <Image
                  src="https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Gabriela Sánchez</h3>
              <p className="text-gold-500 font-medium mb-2">Fundadora y Directora Ejecutiva</p>
              <p className="text-gray-600">
                Con más de 15 años en la industria del turismo, Gabriela aporta su pasión por la exploración y la inmersión cultural a cada viaje de nuestros clientes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-6">
                <Image
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Andrés Mendoza</h3>
              <p className="text-gold-500 font-medium mb-2">Jefe de Operaciones</p>
              <p className="text-gray-600">
                Andrés se asegura de que cada detalle logístico esté perfectamente coordinado, desde traslados hasta alojamientos especiales.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-6">
                <Image
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Carolina Paz</h3>
            <p className="text-gold-500 font-medium mb-2">Especialista en Destinos Europeos</p>
            <p className="text-gray-600">
              Tras haber vivido en París y Roma, el conocimiento de primera mano de Carolina la convierte en la guía ideal para tus aventuras por Europa.
            </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Nuestras Certificaciones y Alianzas"
            subtitle="Cumplimos con los más altos estándares del sector turístico"
            center
          />
          
          <div className="flex flex-wrap justify-center gap-12 mt-12">
            <div className="text-center">
              <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src="/seals/iata.png"
                    alt="IATA Certification"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="mt-3 font-medium">Acreditación IATA</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src="/seals/mintur.png"
                    alt="Ministry of Tourism"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="mt-3 font-medium">Ministerio de Turismo</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src="/seals/camtur.png"
                    alt="Chamber of Tourism"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="mt-3 font-medium">Cámara de Turismo</p>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
}