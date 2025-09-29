import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QueueList } from "@/components/QueueList";
import { store } from "@/lib/store";

const Queue = () => {
  const navigate = useNavigate();
  const [queue, setQueue] = useState(store.getQueue());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setQueue(store.getQueue());
    });
    return unsubscribe;
  }, []);

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
            <Music className="w-10 h-10 text-primary" />
            Cola de Reproducción
          </h1>
          <p className="text-xl text-muted-foreground">
            Canciones que están sonando y próximas en reproducirse
          </p>
        </div>

        <QueueList queue={queue} />

        <div className="mt-8 text-center">
          <Button
            variant="music"
            size="lg"
            onClick={() => navigate("/")}
          >
            Agregar más canciones
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Queue;
