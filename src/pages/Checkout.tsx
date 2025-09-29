import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Music, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { store } from "@/lib/store";
import { getVenueById, formatDuration, formatPrice } from "@/data/mockData";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(store.getCart());
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCart(store.getCart());
    });
    return unsubscribe;
  }, []);

  const venue = cart.venueId ? getVenueById(cart.venueId) : null;
  const song = cart.selectedSong;

  const handlePayment = () => {
    if (!song) return;

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const queue = store.getQueue();
      const position = queue.filter(item => item.status !== 'played').length + 1;
      const lastItem = queue[queue.length - 1];
      const estimatedTime = lastItem ? lastItem.estimatedTime + Math.floor(song.duration / 60) : Math.floor(song.duration / 60);

      // Add to queue
      const queueItem = {
        id: `q${Date.now()}`,
        songId: song.id,
        position,
        estimatedTime,
        addedBy: 'Tú',
        status: 'waiting' as const
      };
      store.addToQueue(queueItem);

      // Add transaction
      const transaction = {
        id: `t${Date.now()}`,
        songId: song.id,
        venueId: cart.venueId || 'unknown',
        timestamp: new Date(),
        amount: song.price,
        position
      };
      store.addTransaction(transaction);

      setProcessing(false);
      toast.success("¡Pago exitoso!");
      
      // Navigate to confirmation
      navigate(`/confirmation/${transaction.id}`);
    }, 2000);
  };

  if (!song) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No hay canciones en el carrito</h1>
          <Button onClick={() => navigate("/")}>Explorar catálogo</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <h1 className="text-4xl font-bold mb-8">Confirmar Pedido</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
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
                  <h3 className="font-bold text-lg mb-1">{song.title}</h3>
                  <p className="text-muted-foreground mb-2">{song.artistName}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {formatDuration(song.duration)}
                  </div>
                </div>
              </div>

              {venue && (
                <>
                  <Separator />
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Local</span>
                    </div>
                    <p className="font-semibold">{venue.name}</p>
                    <p className="text-sm text-muted-foreground">{venue.location}</p>
                  </div>
                </>
              )}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(song.price)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(song.price)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle>Método de Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-primary p-6 rounded-lg text-primary-foreground">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm opacity-80">Pago Simulado</span>
                  <CreditCard className="w-8 h-8" />
                </div>
                <p className="text-2xl font-bold mb-2">•••• •••• •••• 1234</p>
                <div className="flex items-center justify-between text-sm">
                  <span>Usuario Demo</span>
                  <span>12/25</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">¿Qué sucederá después?</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <Music className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Tu canción se agregará a la cola de reproducción</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Verás tu posición y tiempo estimado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CreditCard className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Recibirás un comprobante digital</span>
                    </li>
                  </ul>
                </div>

                <Button
                  variant="music"
                  size="lg"
                  className="w-full"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? (
                    <>Procesando pago...</>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pagar {formatPrice(song.price)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Al confirmar, aceptas que tu pago apoyará directamente a los artistas
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
