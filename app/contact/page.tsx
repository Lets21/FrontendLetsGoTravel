import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
    title: "Contáctanos | Let's Go Travel",
  description: "Ponte en contacto con Let's Go Travel. Escríbenos para planificación personalizada, información sobre destinos o cualquier duda sobre nuestros servicios.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5384428/pexels-photo-5384428.jpeg')] bg-cover bg-center opacity-70"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl max-w-2xl mx-auto">
           Estamos aquí para ayudarte a planificar el viaje perfecto
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading
                title="Ponte en Contacto"
                subtitle="Nos encantará saber de ti. Llena el formulario y te responderemos lo antes posible."
              />
              
              <ContactForm />
            </div>
            
            <div className="flex flex-col">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md mb-8">
                <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-gold-100 p-3 rounded-full text-gold-500 mr-4">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Nuestra Oficina</h4>
                      <p className="text-gray-600">{siteConfig.contact.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gold-100 p-3 rounded-full text-gold-500 mr-4">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Teléfono</h4>
                      <p className="text-gray-600">{siteConfig.contact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gold-100 p-3 rounded-full text-gold-500 mr-4">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Correo Electrónico</h4>
                      <p className="text-gray-600">{siteConfig.contact.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gold-100 p-3 rounded-full text-gold-500 mr-4">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Horario de Atención</h4>
                      <p className="text-gray-600">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sábado: 10:00 AM - 2:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-md h-80 flex-grow mt-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1050.6985889349542!2d-78.47829857152888!3d-0.18571545889021715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59b003bfe614d%3A0x5b989950bcf85b8d!2sLet&#39;s%20Go%20Travel!5e1!3m2!1ses-419!2sec!4v1753723164272!5m2!1ses-419!2sec" 
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de la Oficina"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
}