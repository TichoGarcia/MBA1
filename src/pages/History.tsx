import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Receipt, Music, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { store } from "@/lib/store";
import { getSongById, getVenueById, formatPrice } from "@/data/mockData";

const History = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(store.getTransactions());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTransactions(store.getTransactions());
    });
    return unsubscribe;
  }, []);

  const sortedTransactions = [...transactions].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

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

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Receipt className="w-10 h-10 text-primary" />
            Mi Historial
          </h1>
          <p className="text-xl text-muted-foreground">
            Todas tus transacciones y canciones agregadas
          </p>
        </div>

        {sortedTransactions.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Receipt className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Sin transacciones aún</h3>
              <p className="text-muted-foreground mb-6">
                Comienza a agregar canciones a tus locales favoritos
              </p>
              <Button variant="music" onClick={() => navigate("/")}>
                Explorar Locales
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedTransactions.map((transaction) => {
              const song = getSongById(transaction.songId);
              const venue = getVenueById(transaction.venueId);

              if (!song) return null;

              return (
                <Card key={transaction.id} className="hover:shadow-card transition-all">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={song.image}
                          alt={song.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg mb-1">{song.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{song.artistName}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                          {venue && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {venue.name}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {transaction.timestamp.toLocaleDateString('es-CL')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Music className="w-4 h-4" />
                            Posición #{transaction.position}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-primary font-bold">
                            {formatPrice(transaction.amount)}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/confirmation/${transaction.id}`)}
                          >
                            Ver Comprobante
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Card className="bg-muted">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  💚 Gracias por apoyar a {new Set(sortedTransactions.map(t => getSongById(t.songId)?.artistId)).size} artistas
                </p>
                <p className="text-2xl font-bold text-primary">
                  Total invertido: {formatPrice(sortedTransactions.reduce((sum, t) => sum + t.amount, 0))}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
