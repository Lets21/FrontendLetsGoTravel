import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
  title: "Contáctanos | Let's Go Travel",
  description:
    "Ponte en contacto con Let's Go Travel. Escríbenos para planificación personalizada, información sobre destinos o cualquier duda sobre nuestros servicios.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Hablemos"
        title="Hablemos de tu"
        accent="próximo viaje"
        subtitle="Estamos aquí para ayudarte a planificar el viaje perfecto"
        image="https://images.pexels.com/photos/5384428/pexels-photo-5384428.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading
                title="Ponte en Contacto"
                subtitle="Nos encantará saber de ti. Llena el formulario y te responderemos lo antes posible."
              />
              {/* Aquí envolvemos el form en Suspense */}
              <Suspense fallback={<div>Cargando formulario...</div>}>
                <ContactForm />
              </Suspense>
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
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d213.32091335461843!2d-78.51212868203524!3d-0.24133467881747078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2sec!4v1794428172870!5m2!1ses-419!2sec"
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
