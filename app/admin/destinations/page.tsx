"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "../AdminNav";

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    price: "",
    duration: "",
    image: null as File | null,
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
      const res = await fetch("https://backendletsgotravel.onrender.com/api/destinations", {
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
    if (!formData.name || !formData.country || !formData.description || !formData.price || !formData.duration || (!editingId && !formData.image)) {
      setError("Por favor completa todos los campos obligatorios.");
      setLoading(false);
      return;
    }

    const adminToken = localStorage.getItem("adminToken") || undefined;
    const form = new FormData();
    for (const key in formData) {
      // @ts-ignore
      if (formData[key]) form.append(key, formData[key]);
    }

    const url = editingId
      ? `http://localhost:5000/api/destinations/${editingId}`
      : "http://localhost:5000/api/destinations";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
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
    setFormData({ name: "", country: "", description: "", price: "", duration: "", image: null });
    setEditingId(null);
    setTimeout(() => setSuccess(""), 1500);
  };

  // 🗑️ Eliminar con confirmación
  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este destino?")) return;
    const adminToken = localStorage.getItem("adminToken") || undefined;
    const res = await fetch(`http://localhost:5000/api/destinations/${id}`, {
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
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ⬅️ Cancelar edición
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", country: "", description: "", price: "", duration: "", image: null });
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
    setFormData((prev) => ({
      ...prev,
      image: e.target.files && e.target.files.length > 0 ? e.target.files[0] : null,
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Panel de Destinos</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      {/* Formulario CRUD */}
      <form onSubmit={handleSubmit} className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-white rounded-xl shadow-md p-6">
        <div>
          <label className="block mb-1 font-medium">Nombre *</label>
          <input name="name" type="text" className="border p-2 rounded w-full" value={formData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label className="block mb-1 font-medium">País *</label>
          <input name="country" type="text" className="border p-2 rounded w-full" value={formData.country} onChange={handleInputChange} />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Descripción *</label>
          <textarea name="description" className="border p-2 rounded w-full" rows={2} value={formData.description} onChange={handleInputChange} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Precio *</label>
          <input name="price" type="number" className="border p-2 rounded w-full" value={formData.price} onChange={handleInputChange} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Duración *</label>
          <input name="duration" type="text" className="border p-2 rounded w-full" value={formData.duration} onChange={handleInputChange} />
        </div>
        <div className="md:col-span-2 flex items-center gap-4">
          <div>
            <label className="block mb-1 font-medium">{editingId ? "Nueva Imagen" : "Imagen *"}</label>
            <input name="image" type="file" className="border p-2 rounded w-full" onChange={handleFileChange} />
          </div>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="h-16 rounded shadow border" />
          )}
        </div>
        <div className="md:col-span-2 flex gap-3">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all font-bold">
            {editingId ? (loading ? "Actualizando..." : "Actualizar") : (loading ? "Creando..." : "Crear")}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 font-bold">
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabla de destinos */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full min-w-[800px] text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2">Imagen</th>
              <th className="py-2">Nombre</th>
              <th className="py-2">País</th>
              <th className="py-2">Precio</th>
              <th className="py-2">Duración</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((dest) => (
              <tr key={dest._id} className="border-b">
                <td>
                  {dest.imageUrl ? (
                    <img src={dest.imageUrl} alt={dest.name} className="h-12 w-16 object-cover rounded" />
                  ) : (
                    <span className="text-gray-400 italic">Sin imagen</span>
                  )}
                </td>
                <td className="font-medium">{dest.name}</td>
                <td>{dest.country}</td>
                <td>${dest.price}</td>
                <td>{dest.duration}</td>
                <td>
                  <button
                    onClick={() => handleEdit(dest)}
                    className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(dest._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {destinations.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-gray-500">No hay destinos registrados aún.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
