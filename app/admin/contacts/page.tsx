"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Mail, Phone, MapPin, Calendar, User, MessageCircle } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  destination?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";
        const res = await apiFetch("/api/contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setContacts(data.sort((a: Contact, b: Contact) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const getDestinationColor = (destination?: string) => {
    if (!destination || destination === "none") return "bg-gray-100 text-gray-600";
    
    const colors = [
      "bg-blue-100 text-blue-700",
      "bg-emerald-100 text-emerald-700", 
      "bg-purple-100 text-purple-700",
      "bg-orange-100 text-orange-700",
      "bg-pink-100 text-pink-700"
    ];
    
    const hash = destination.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Mensajes de Contacto</h1>
            <p className="text-blue-100 font-medium">Gestiona las consultas de tus clientes</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold">{contacts.length}</div>
            <div className="text-sm text-blue-100">Mensajes totales</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg font-medium text-gray-600">Cargando mensajes...</span>
            </div>
          </div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No hay mensajes</h3>
            <p className="text-gray-500 text-lg">Aún no has recibido consultas de contacto</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {contacts.map((contact) => {
            const { date, time } = formatDate(contact.createdAt);
            return (
              <div
                key={contact._id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedContact(contact)}
              >
                {/* Header de la card */}
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{contact.name}</h3>
                        <p className="text-sm text-gray-500">{contact.subject}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{date} • {time}</span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-4">
                  {/* Información de contacto */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {contact.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-emerald-500" />
                      <a 
                        href={`tel:${contact.phone}`}
                        className="text-emerald-600 hover:text-emerald-800 font-medium text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {contact.phone}
                      </a>
                    </div>

                    {contact.destination && contact.destination !== "none" && (
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDestinationColor(contact.destination)}`}>
                          {contact.destination}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Mensaje preview */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <MessageCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {contact.message}
                        </p>
                        {contact.message.length > 100 && (
                          <button className="text-blue-600 text-xs font-medium mt-1 hover:text-blue-800">
                            Ver mensaje completo →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Acciones rápidas */}
                  <div className="flex gap-2 pt-2">
                    <a
                      href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-sm text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      📧 Responder
                    </a>
                    <a
                      href={`https://wa.me/${contact.phone.replace(/\D/g, '')}?text=Hola ${contact.name}, hemos recibido tu consulta sobre ${contact.destination || 'nuestros servicios'}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-sm text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal para mensaje completo */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedContact.name}</h2>
                  <p className="text-blue-100">{selectedContact.subject}</p>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {/* Información de contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Información de contacto</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <a href={`mailto:${selectedContact.email}`} className="text-blue-600 font-medium">
                          {selectedContact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-emerald-500" />
                      <div>
                        <div className="text-sm text-gray-500">Teléfono</div>
                        <a href={`tel:${selectedContact.phone}`} className="text-emerald-600 font-medium">
                          {selectedContact.phone}
                        </a>
                      </div>
                    </div>

                    {selectedContact.destination && selectedContact.destination !== "none" && (
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-purple-500" />
                        <div>
                          <div className="text-sm text-gray-500">Destino de interés</div>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getDestinationColor(selectedContact.destination)}`}>
                            {selectedContact.destination}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Fecha y hora</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{formatDate(selectedContact.createdAt).date}</div>
                        <div className="text-sm text-gray-500">{formatDate(selectedContact.createdAt).time}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mensaje completo */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Mensaje completo</h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-4 pt-4">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}&body=Hola ${selectedContact.name},%0A%0AGracias por contactarnos. En relación a tu consulta:`}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold text-center"
                >
                  📧 Responder por Email
                </a>
                <a
                  href={`https://wa.me/${selectedContact.phone.replace(/\D/g, '')}?text=Hola ${selectedContact.name}, hemos recibido tu consulta sobre ${selectedContact.destination || 'nuestros servicios'}. Gracias por contactarnos.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold text-center"
                >
                  💬 Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
