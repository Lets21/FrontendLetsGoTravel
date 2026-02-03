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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-800 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Video Principal</h1>
            <p className="text-slate-200 text-sm">Gestiona el video hero de tu página principal</p>
          </div>
          <div className="bg-white/5 rounded-md p-3 flex items-center gap-3">
            <Video className="w-6 h-6 text-slate-200" />
            <div>
              <div className="text-xs text-slate-300">Estado</div>
              <div className="font-medium text-sm">{videoUrl ? "Activo" : "Sin video"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div className={`rounded-md border overflow-hidden ${
          messageType === 'error' 
            ? 'bg-red-50 border-red-200' 
            : 'bg-emerald-50 border-emerald-200'
        }`}>
          <div className={`p-3 flex items-center gap-3 ${
            messageType === 'error' ? 'text-red-800' : 'text-emerald-800'
          }`}>
            <div className={`p-2 rounded-full ${
              messageType === 'error' ? 'bg-red-100' : 'bg-emerald-100'
            }`}>
              {messageType === 'error' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <p className="font-medium text-sm">{message}</p>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">📤 Subir Nuevo Video</h2>
          <p className="text-gray-600 mt-1 text-sm">Formatos soportados: MP4, WEBM • Tamaño máximo: 100MB</p>
        </div>

        <form onSubmit={handleUpload} className="p-6">
          <div className="space-y-4">
            {/* Drag and drop area */}
            <div className="relative">
              <input 
                type="file" 
                accept="video/*" 
                onChange={handleFile}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="video-upload"
              />
              <label 
                htmlFor="video-upload"
                className={`block w-full p-6 border-2 border-dashed rounded-md text-center transition-all duration-150 cursor-pointer ${
                  file 
                    ? 'border-slate-300 bg-slate-50' 
                    : 'border-gray-300 bg-white hover:border-slate-400'
                }`}
              >
                <div className="space-y-4">
                  <div className={`mx-auto w-14 h-14 rounded-md flex items-center justify-center ${
                    file ? 'bg-slate-100' : 'bg-gray-50'
                  }`}>
                    {file ? (
                      <svg className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    )}
                  </div>
                  
                  {file ? (
                    <div>
                      <h3 className="text-base font-semibold text-slate-800">Archivo seleccionado</h3>
                      <p className="text-slate-700 text-sm">{file.name}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        Tamaño: {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">Arrastra tu video aquí</h3>
                      <p className="text-gray-500 text-sm">o haz click para seleccionar un archivo</p>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* File info */}
            {file && (
              <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                <div className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-slate-700 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">Video seleccionado</div>
                    <div className="text-sm text-slate-600 mt-1">
                      <div><strong>Nombre:</strong> {file.name}</div>
                      <div><strong>Tamaño:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</div>
                      <div><strong>Tipo:</strong> {file.type}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Action buttons */}
            <div className="flex gap-3 pt-3">
              <button 
                type="submit" 
                disabled={loading || !file}
                className="flex-1 relative bg-slate-700 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-150"
              >
                <div className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm">Subiendo...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm">Subir Video</span>
                    </>
                  )}
                </div>
              </button>

              {videoUrl && (
                <button 
                  type="button" 
                  onClick={handleDelete} 
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-150"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="text-sm">Eliminar</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Video Preview */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-8 py-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">🎬 Vista Previa</h2>
          <p className="text-gray-600 mt-1">Así se verá tu video en la página principal</p>
        </div>

        <div className="p-6">
          {videoUrl ? (
            <div className="relative">
              {/* Video container */}
              <div className="relative rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <video 
                  src={videoUrl} 
                  controls 
                  className="w-full h-auto"
                  style={{ maxHeight: '480px' }}
                />
                {/* Overlay de información */}
                <div className="absolute top-3 right-3">
                  <div className="bg-black/60 text-white px-2 py-1 rounded-md text-xs font-medium">
                    Video Activo
                  </div>
                </div>
              </div>

              {/* Información del video */}
              <div className="mt-4 bg-gray-50 rounded-md p-4">
                <h3 className="font-medium text-gray-800 mb-2">Información del video</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Estado: <span className="font-medium text-green-600">Publicado</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-slate-600" />
                    <span className="text-gray-600">Formato: <span className="font-medium">Video Web</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">Optimizado: <span className="font-medium text-slate-700">Sí</span></span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-md border-2 border-dashed border-gray-200">
              <div className="w-20 h-20 mx-auto bg-gray-50 rounded-md flex items-center justify-center mb-4">
                <Video className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No hay video configurado</h3>
              <p className="text-gray-500 text-sm mb-4">Sube un video para mostrarlo como hero en tu página principal</p>
              <button
                onClick={() => document.getElementById('video-upload')?.click()}
                className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition-colors duration-150 font-semibold"
              >
                Subir Video
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
