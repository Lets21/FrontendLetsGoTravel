"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiFetch } from "@/lib/api";

// Lista de países con códigos telefónicos
const countries = [
  { code: "+593", name: "Ecuador", flag: "🇪🇨" },
  { code: "+1", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "+1", name: "Canadá", flag: "🇨🇦" },
  { code: "+52", name: "México", flag: "🇲🇽" },
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+55", name: "Brasil", flag: "🇧🇷" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "+51", name: "Perú", flag: "🇵🇪" },
  { code: "+58", name: "Venezuela", flag: "🇻🇪" },
  { code: "+34", name: "España", flag: "🇪🇸" },
  { code: "+33", name: "Francia", flag: "🇫🇷" },
  { code: "+49", name: "Alemania", flag: "🇩🇪" },
  { code: "+39", name: "Italia", flag: "🇮🇹" },
  { code: "+44", name: "Reino Unido", flag: "🇬🇧" },
];

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un correo electrónico válido"),
  countryCode: z.string().min(1, "Selecciona un país"),
  phone: z.string().min(5, "Por favor ingresa un número de teléfono válido"),
  destination: z.string().optional(),
  subject: z.string().min(2, "El asunto debe tener al menos 2 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

interface Destination {
  _id: string;
  name: string;
  category: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(true);
  const searchParams = useSearchParams();
  
  const defaultDestination = searchParams.get("destination") || "";

  // Cargar destinos desde la API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await apiFetch("/api/destinations");
        if (response.ok) {
          const data = await response.json();
          setDestinations(data);
        }
      } catch (error) {
        console.error("Error al cargar destinos:", error);
      } finally {
        setIsLoadingDestinations(false);
      }
    };

    fetchDestinations();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      countryCode: "+593",
      phone: "",
      destination: defaultDestination,
      subject: defaultDestination ? `Consulta sobre el destino ${defaultDestination}` : "",
      message: "",
    },
  });

const onSubmit = async (data: FormValues) => {
  setIsSubmitting(true);
  setIsSuccess(false);
  let responseSuccess = false;

  try {
    // Combinar código de país y número de teléfono
    const fullPhone = `${data.countryCode} ${data.phone}`;
    const submitData = {
      ...data,
      phone: fullPhone,
    };

    const response = await apiFetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    });
    const resData = await response.json();

    if (response.ok && resData.success) {
      responseSuccess = true;
      setIsSuccess(true);
      form.reset();
    } else {
      setIsSuccess(false);
      alert(resData.message || "Error al enviar el mensaje, intenta más tarde.");
    }
  } catch (error) {
    setIsSuccess(false);
    alert("Ocurrió un error de red. Intenta nuevamente.");
  }

  setIsSubmitting(false);

  // Reset success message after 5 seconds
  if (responseSuccess) {
    setTimeout(() => setIsSuccess(false), 5000);
  }
};

  return (
    <div>
      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-2">¡Mensaje enviado con éxito!</h3>
          <p>Gracias por contactarnos. Nuestros asesores de viaje te responderán en un plazo de 24 horas.</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <FormLabel>Número de teléfono</FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem className="w-[140px]">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="País" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={`${country.code}-${country.name}`} value={country.code}>
                                {country.flag} {country.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="0950648912" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destino de interés (opcional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoadingDestinations}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={isLoadingDestinations ? "Cargando destinos..." : "Selecciona un destino"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Sin destino específico</SelectItem>
                        {destinations.map((destination) => (
                          <SelectItem key={destination._id} value={destination.name}>
                            {destination.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asunto</FormLabel>
                  <FormControl>
                    <Input placeholder="Consulta sobre paquetes de viaje" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Por favor indica detalles como fechas deseadas, número de viajeros y requerimientos especiales."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold-500 hover:bg-gold-600 text-black font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Enviar mensaje"
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}