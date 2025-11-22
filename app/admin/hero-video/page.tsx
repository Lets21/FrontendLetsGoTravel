"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Video } from "lucide-react";

export default function AdminHeroVideoPage() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"" | "success" | "error">("");
  const router = useRouter();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await apiFetch("/api/hero");
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.videoUrl) setVideoUrl(data.videoUrl);
      } catch (e) {}
    };
    fetchHero();
  }, []);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFile(f);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    if (!file) { setMessage("Selecciona un archivo de video."); setMessageType("error"); return; }
    setLoading(true); setMessage(""); setMessageType("");
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) { setMessage("No autorizado. Inicia sesión como administrador."); setMessageType("error"); setLoading(false); return; }
      const form = new FormData();
      form.append("video", file);
      const res = await apiFetch("/api/hero", {
        method: "POST",
        body: form,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 401) { localStorage.removeItem("adminToken"); router.push("/admin/login"); }
        const text = await res.text();
        console.error("Upload failed", res.status, text);
        setMessage(`Error subiendo video: ${res.status} ${text}`);
        setMessageType("error");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setVideoUrl(data.videoUrl);
      setFile(null);
      setMessage("Video subido correctamente.");
      setMessageType("success");
    } catch (e) {
      console.error("Upload error:", e);
      setMessage("Error subiendo video (network). Revisa la consola.");
      setMessageType("error");
    } finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Eliminar video principal?")) return;
    setLoading(true); setMessage("");
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) { setMessage("No autorizado. Inicia sesión como administrador."); setMessageType("error"); setLoading(false); return; }
      const res = await apiFetch("/api/hero", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 401) { localStorage.removeItem("adminToken"); router.push("/admin/login"); }
        const text = await res.text();
        console.error("Delete failed", res.status, text);
        setMessage(`Error eliminando video: ${res.status} ${text}`);
        setMessageType("error");
        setLoading(false);
        return;
      }
      setVideoUrl(null);
      setMessage("Video eliminado.");
      setMessageType("success");
    } catch (e) {
      console.error("Delete error:", e);
      setMessage("Error eliminando video (network). Revisa la consola.");
      setMessageType("error");
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-900">
          Video Principal
        </h1>
        <p className="text-gray-600 mt-2">Gestiona el video de la página principal de tu sitio web</p>
      </div>

      {/* Alert Messages */}
      {message && (
        <div className={`p-4 rounded-xl border-l-4 ${
          messageType === 'error' 
            ? 'bg-red-50 border-red-500 text-red-700' 
            : 'bg-green-50 border-green-500 text-green-700'
        }`}>
          <p className="font-medium">{message}</p>
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Subir Nuevo Video</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar video (MP4, WEBM - máx. 100MB)
            </label>
            <input 
              type="file" 
              accept="video/*" 
              onChange={handleFile}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-gray-700 file:to-gray-900 file:text-white hover:file:from-gray-800 hover:file:to-black file:cursor-pointer cursor-pointer bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
            {file && (
              <p className="mt-2 text-sm text-gray-600">Archivo seleccionado: <span className="text-gray-900 font-medium">{file.name}</span></p>
            )}
          </div>
          
          <div className="flex gap-3">
            <button 
              type="submit" 
              disabled={loading || !file}
              className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black disabled:from-gray-300 disabled:to-gray-400 text-white disabled:text-gray-500 font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:shadow-none"
            >
              {loading ? '⏳ Subiendo...' : '📤 Subir Video'}
            </button>
            {videoUrl && (
              <button 
                type="button" 
                onClick={handleDelete} 
                disabled={loading}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 text-white disabled:text-gray-500 font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                🗑️ Eliminar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Video Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Vista Previa</h2>
        {videoUrl ? (
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <video 
              src={videoUrl} 
              controls 
              className="w-full rounded-xl"
              style={{ maxHeight: '500px' }}
            />
          </div>
        ) : (
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
            <Video className="mx-auto text-gray-400 mb-4" size={64} />
            <p className="text-gray-700 text-lg font-medium">No hay video principal configurado</p>
            <p className="text-gray-500 text-sm mt-2">Sube un video para mostrarlo en la página principal</p>
          </div>
        )}
      </div>
    </div>
  );
}
