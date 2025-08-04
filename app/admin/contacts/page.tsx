"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
        const res = await fetch("https://backendletsgotravel.onrender.com/api/contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <main className="w-full flex flex-col items-center px-2 sm:px-0">
      <section className="bg-white rounded-2xl shadow-xl p-8 mt-2 w-full max-w-5xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
          Mensajes de Contacto
        </h1>
        {loading ? (
          <div className="w-full text-center py-10 text-gray-500 font-semibold">Cargando mensajes...</div>
        ) : contacts.length === 0 ? (
          <div className="w-full text-center py-16 text-gray-400 text-lg">No hay mensajes de contacto.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="sticky top-0 z-10 bg-gray-100">
                <tr>
                  <th className="px-5 py-4 font-semibold text-gray-700 text-left">Fecha</th>
                  <th className="px-5 py-4 font-semibold text-gray-700 text-left">Nombre</th>
                  <th className="px-5 py-4 font-semibold text-gray-700 text-left">Correo</th>
                  <th className="px-5 py-4 font-semibold text-gray-700 text-left">Teléfono</th>
                  <th className="px-5 py-4 font-semibold text-gray-700 text-left">Destino</th>
                  <th className="px-5 py-4 font-semibold text-gray-700 text-left">Asunto</th>
                  <th className="px-5 py-4 font-semibold text-gray-700 text-left">Mensaje</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-5 py-3 border-t text-gray-500 font-mono whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-3 border-t font-medium text-gray-900">{contact.name}</td>
                    <td className="px-5 py-3 border-t text-blue-700 underline">{contact.email}</td>
                    <td className="px-5 py-3 border-t text-gray-700">{contact.phone}</td>
                    <td className="px-5 py-3 border-t">
                      {contact.destination && contact.destination !== "none" ? (
                        <span className="bg-gold-100 text-gold-700 px-2 py-1 rounded-md text-xs font-semibold">
                          {contact.destination}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Sin destino específico</span>
                      )}
                    </td>
                    <td className="px-5 py-3 border-t">{contact.subject}</td>
                    <td className="px-5 py-3 border-t max-w-xs group-hover:whitespace-normal whitespace-nowrap overflow-hidden text-ellipsis">
                      <span
                        title={contact.message}
                        className="cursor-pointer"
                      >
                        {contact.message.length > 35
                          ? contact.message.slice(0, 35) + "..."
                          : contact.message}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
