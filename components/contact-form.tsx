"use client";

import { useState } from "react";
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
import { siteConfig } from "@/lib/constants";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un correo electrónico válido"),
  phone: z.string().min(5, "Por favor ingresa un número de teléfono válido"),
  destination: z.string().optional(),
  subject: z.string().min(2, "El asunto debe tener al menos 2 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  
  const defaultDestination = searchParams.get("destination") || "";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
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
    const response = await apiFetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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


  const destinations = siteConfig.destinations.flatMap((category) => 
    category.locations.map((location) => ({
      id: location.id,
      name: location.name,
    }))
  );

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
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="+593 0950648912" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destino de interés (opcional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un destino" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Sin destino específico</SelectItem>
                        {destinations.map((destination) => (
                          <SelectItem key={destination.id} value={destination.name}>
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