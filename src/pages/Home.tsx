import { Music, Sparkles, TrendingUp } from "lucide-react";
import { VenueCard } from "@/components/VenueCard";
import { mockVenues } from "@/data/mockData";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-accent/10" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Music className="w-8 h-8" />
              <Sparkles className="w-6 h-6 animate-pulse-glow" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tu Música, Tu Momento
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Elige las canciones que suenan en tu bar favorito y apoya a los artistas emergentes
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span>+1,500 canciones disponibles</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full">
                <Music className="w-4 h-4" />
                <span>Solo $300 CLP por canción</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Venues Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Locales Activos</h2>
          <p className="text-xl text-muted-foreground">
            Descubre dónde puedes elegir la música ahora mismo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {mockVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">¿Cómo Funciona?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Elige un Local</h3>
              <p className="text-muted-foreground">
                Selecciona el bar o café donde estás
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Explora el Catálogo</h3>
              <p className="text-muted-foreground">
                Busca tu canción o artista favorito
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Paga y Agrega</h3>
              <p className="text-muted-foreground">
                Solo $300 CLP por canción
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Disfruta</h3>
              <p className="text-muted-foreground">
                Tu canción sonará pronto y apoyas a los artistas
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
