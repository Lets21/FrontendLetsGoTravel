"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "../AdminNav";
import { apiFetch } from "@/lib/api";

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    price: "",
    duration: "",
    image: null as File | null,
    video: null as File | null,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🚫 Redirección si no hay token
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.push("/admin/login");
    else fetchDestinations(token);
    // eslint-disable-next-line
  }, []);

  // 🔄 Cargar destinos
  const fetchDestinations = async (token?: string) => {
    const adminToken = token || localStorage.getItem("adminToken");
    try {
      const res = await apiFetch("/api/destinations", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setDestinations(data);
    } catch (e) {
      setError("Error cargando destinos.");
    }
  };

  // ✅ Crear o actualizar
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);

    // Validación básica
    // When creating a new destination require at least an image or a video
    if (!formData.name || !formData.country || !formData.description || !formData.price || !formData.duration || (!editingId && !formData.image && !formData.video)) {
      setError("Por favor completa todos los campos obligatorios.");
      setLoading(false);
      return;
    }

    const adminToken = localStorage.getItem("adminToken") || undefined;
    const form = new FormData();
    // append fields (only existing values)
    form.append("name", formData.name);
    form.append("country", formData.country);
    form.append("description", formData.description);
    form.append("price", String(formData.price));
    form.append("duration", formData.duration);
    if (formData.image) form.append("image", formData.image);
    if (formData.video) form.append("video", formData.video);

    const url = editingId
      ? `/api/destinations/${editingId}`
      : "/api/destinations";
    const method = editingId ? "PUT" : "POST";

    const res = await apiFetch(url, {
      method,
      body: form,
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    setLoading(false);
    if (!res.ok) {
      setError("Error al guardar el destino.");
      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      }
      return;
    }

    setSuccess(editingId ? "Destino actualizado." : "Destino creado.");
    fetchDestinations(adminToken);
    setFormData({ name: "", country: "", description: "", price: "", duration: "", image: null, video: null });
    setEditingId(null);
    setTimeout(() => setSuccess(""), 1500);
  };

  // 🗑️ Eliminar con confirmación
  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este destino?")) return;
    const adminToken = localStorage.getItem("adminToken") || undefined;
    const res = await apiFetch(`/api/destinations/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      router.push("/admin/login");
      return;
    }
    fetchDestinations(adminToken);
  };

  // ✏️ Cargar datos en el formulario para editar
  const handleEdit = (dest: any) => {
    setEditingId(dest._id);
    setFormData({
      name: dest.name,
      country: dest.country,
      description: dest.description,
      price: dest.price,
      duration: dest.duration,
      image: null, // no queremos cargar la URL como File
      video: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ⬅️ Cancelar edición
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", country: "", description: "", price: "", duration: "", image: null, video: null });
    setError(""); setSuccess("");
  };

  // 🖼️ Vista previa (opcional)
  const imagePreview = formData.image ? URL.createObjectURL(formData.image) : null;

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  // Cambiar inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files && files.length > 0 ? files[0] : null;
    setFormData((prev) => ({
      ...prev,
      // @ts-ignore
      [name]: file,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        {/* Header mejorado */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 mb-2 tracking-tight">Gestión de Destinos</h1>
            <p className="text-sm text-slate-600">Administra los paquetes turísticos de tu agencia</p>
            </div>
            <div className="bg-slate-800 text-white rounded-lg px-4 py-3 text-center min-w-[140px] shadow-sm">
              <div className="text-2xl font-semibold">{destinations.length}</div>
              <div className="text-xs opacity-90 uppercase tracking-wide">Destinos activos</div>
            </div>
          </div>
        </div>

        {/* Alerts mejorados */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-4 flex items-center gap-4 shadow-sm">
            <div className="bg-red-500 rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-800 font-semibold text-sm">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 rounded-md p-4 flex items-center gap-4 shadow-sm">
            <div className="bg-green-500 rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-800 font-semibold text-sm">{success}</p>
          </div>
        )}

        {/* Formulario mejorado */}
        <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 text-white px-8 py-6">
            <h2 className="text-2xl font-semibold tracking-tight mb-1">
              {editingId ? "Editar Destino" : "Nuevo Destino"}
            </h2>
            <p className="text-slate-200 text-sm">
              {editingId ? "Modifica la información del destino" : "Agrega un nuevo paquete turístico"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Información básica */}
              <div className="space-y-8">
                <h3 className="text-lg font-semibold text-slate-900 border-l-4 border-slate-700 pl-4 tracking-tight">
                  Información Básica
                </h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-2 uppercase">
                  Nombre del Destino *
                </label>
                <input
                  name="name"
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-400 focus:border-slate-500 transition-colors text-sm font-medium bg-white"
                  placeholder="Ej: Punta Cana Paradise"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-2 uppercase">
                  País *
                </label>
                <input
                  name="country"
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-400 focus:border-slate-500 transition-colors text-sm font-medium bg-white"
                  placeholder="Ej: República Dominicana"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-2 uppercase">
                  Descripción *
                </label>
                <textarea
                  name="description"
                  className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-400 focus:border-slate-500 transition-colors resize-none text-sm font-medium bg-white"
                  rows={5}
                  placeholder="Describe las características del destino..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Detalles comerciales */}
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-slate-900 border-l-4 border-slate-800 pl-6 tracking-tight">
                Detalles Comerciales
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-black text-slate-800 mb-4 tracking-wider uppercase">
                    Precio (USD) *
                  </label>
                  <input
                    name="price"
                    type="number"
                    className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-400 focus:border-slate-500 transition-colors text-sm font-medium bg-white"
                    placeholder="499"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-800 mb-4 tracking-wider uppercase">
                    Duración *
                  </label>
                  <input
                    name="duration"
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-400 focus:border-slate-500 transition-colors text-sm font-medium bg-white"
                    placeholder="4 Días y 3 Noches"
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Upload de archivos */}
              <div className="space-y-6">
                <h4 className="text-xl font-black text-slate-800 tracking-tight">Multimedia</h4>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-black text-slate-800 mb-4 tracking-wider uppercase">
                      {editingId ? "Nueva Imagen" : "Imagen Principal *"}
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        name="image"
                        type="file"
                        accept="image/*"
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-400 focus:border-slate-500 transition-colors text-sm font-medium bg-white"
                        onChange={handleFileChange}
                      />
                      {imagePreview && (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-xl shadow-lg border-2 border-white"
                          />
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-slate-800 mb-4 tracking-wider uppercase">
                      Video Promocional (opcional)
                    </label>
                    <input
                      name="video"
                      type="file"
                      accept="video/*"
                      className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-400 focus:border-slate-500 transition-colors text-sm font-medium bg-white"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-8 flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-all duration-200 font-semibold text-sm shadow-sm"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 text-white rounded-md transition-colors font-semibold text-sm shadow-sm disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{editingId ? "Actualizando..." : "Creando..."}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  {editingId ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Actualizar</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Crear</span>
                    </>
                  )}
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de destinos */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200 px-10 py-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Destinos Registrados</h2>
          <p className="text-slate-600 mt-2 font-semibold text-lg">Gestiona tu catálogo de paquetes turísticos</p>
        </div>

        {destinations.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">No hay destinos registrados</h3>
            <p className="text-slate-600 mb-8 text-lg font-semibold">Comienza agregando tu primer paquete turístico</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white rounded-xl transition-all duration-300 font-black text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Crear Primer Destino
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {destinations.map((dest) => (
              <div key={dest._id} className="group bg-white border-2 border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Imagen */}
                <div className="relative h-52 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                  {dest.imageUrl ? (
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-black text-slate-800 shadow-lg">
                    {dest.country}
                  </div>
                  <div className="absolute top-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg">
                    ${dest.price}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-slate-900 mb-3 line-clamp-1 tracking-tight">{dest.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed font-medium">{dest.description}</p>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-slate-700 font-bold">{dest.duration}</span>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(dest)}
                      className="flex-1 bg-slate-700 hover:bg-slate-800 text-white px-4 py-3 rounded-xl transition-all duration-300 font-black text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(dest._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl transition-all duration-300 font-black text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
