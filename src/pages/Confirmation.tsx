import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Music, Download, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { store } from "@/lib/store";
import { getSongById, getVenueById, formatPrice } from "@/data/mockData";
import { toast } from "sonner";

const Confirmation = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(
    store.getTransactions().find(t => t.id === transactionId)
  );

  const song = transaction ? getSongById(transaction.songId) : null;
  const venue = transaction ? getVenueById(transaction.venueId) : null;

  useEffect(() => {
    if (transaction) {
      store.clearCart();
    }
  }, [transaction]);

  const handleShare = () => {
    toast.success("¡Enlace copiado! Comparte tu momento musical");
  };

  const handleDownload = () => {
    toast.success("Comprobante descargado");
  };

  if (!transaction || !song) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Transacción no encontrada</h1>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <h1 className="text-4xl font-bold mb-2">¡Pago Exitoso!</h1>
          <p className="text-xl text-muted-foreground">
            Tu canción está en la cola de reproducción
          </p>
        </div>

        {/* Transaction Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Detalles de la Transacción</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-1">{song.title}</h3>
                <p className="text-muted-foreground mb-3">{song.artistName}</p>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                  <Music className="w-4 h-4" />
                  Posición #{transaction.position} en la cola
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              {venue && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Local</span>
                  <span className="font-semibold text-right">{venue.name}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha y hora</span>
                <span className="font-semibold">
                  {transaction.timestamp.toLocaleString('es-CL')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID de transacción</span>
                <span className="font-mono text-sm">{transaction.id}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total pagado</span>
                <span className="text-primary">{formatPrice(transaction.amount)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Descargar
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Compartir
          </Button>
          <Button variant="outline" onClick={() => navigate("/queue")}>
            <Eye className="w-4 h-4 mr-2" />
            Ver Cola
          </Button>
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>¿Qué sigue?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Tu canción se reproducirá según la cola actual. Puedes:
            </p>
            <div className="space-y-3">
              <Button
                variant="music"
                size="lg"
                className="w-full"
                onClick={() => navigate("/queue")}
              >
                Ver Cola de Reproducción
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Agregar Otra Canción
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="w-full"
                onClick={() => navigate("/history")}
              >
                Ver Mi Historial
              </Button>
            </div>

            <div className="bg-muted p-4 rounded-lg mt-6">
              <p className="text-sm text-muted-foreground">
                💚 Gracias por apoyar a los artistas. Tu pago contribuye directamente
                a la retribución justa de los creadores musicales.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Confirmation;
