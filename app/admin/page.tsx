"use client";
import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [destinations, setDestinations] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", image: null });
  const [token, setToken] = useState("");

  useEffect(() => {
    // Cargar destinos
    fetch("http://localhost:5000/api/destinations")
      .then(res => res.json())
      .then(data => setDestinations(data));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    if (formData.image) form.append("image", formData.image);

    const res = await fetch("http://localhost:5000/api/destinations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: form
    });
    if (res.ok) {
      alert("Destino creado!");
      window.location.reload();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/destinations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      alert("Destino eliminado!");
      setDestinations(destinations.filter((d: any) => d._id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Panel de Administración</h1>
      
      <div className="mt-4">
        <input type="text" placeholder="Token JWT" className="border p-2" onChange={e => setToken(e.target.value)} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <input type="text" placeholder="Nombre" className="border p-2" onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <input type="text" placeholder="Descripción" className="border p-2" onChange={e => setFormData({ ...formData, description: e.target.value })} />
        <input type="number" placeholder="Precio" className="border p-2" onChange={e => setFormData({ ...formData, price: e.target.value })} />
        <input type="file" onChange={e => setFormData({ ...formData, image: e.target.files && e.target.files.length > 0 ? e.target.files[0] : null })} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Crear</button>
      </form>

      <h2 className="text-xl font-bold mt-8">Lista de destinos</h2>
      <ul>
        {destinations.map((dest: any) => (
          <li key={dest._id} className="flex justify-between items-center border-b py-2">
            <span>{dest.name}</span>
            <button className="bg-red-500 text-white px-3 py-1" onClick={() => handleDelete(dest._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
