import { Music, Sparkles, TrendingUp } from "lucide-react";
import { VenueCard } from "@/components/VenueCard";
import { mockVenues } from "@/data/mockData";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-foreground">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(307_70%_46%/0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(260_70%_40%/0.3),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Music className="w-12 h-12 text-primary" />
              <Sparkles className="w-8 h-8 text-secondary animate-pulse-glow" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
              Tu Música, Tu Momento
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-foreground/80 max-w-2xl mx-auto">
              Elige las canciones que suenan en tu bar favorito y apoya a los artistas emergentes
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 px-5 py-3 rounded-full shadow-card">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="font-medium">+1,500 canciones disponibles</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 px-5 py-3 rounded-full shadow-card">
                <Music className="w-4 h-4 text-primary" />
                <span className="font-medium">Solo $300 CLP por canción</span>
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
      <section className="bg-accent/30 backdrop-blur-sm py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(307_70%_46%/0.1),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center">¿Cómo Funciona?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Elige un Local</h3>
              <p className="text-muted-foreground">
                Selecciona el bar o café donde estás
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Explora el Catálogo</h3>
              <p className="text-muted-foreground">
                Busca tu canción o artista favorito
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Paga y Agrega</h3>
              <p className="text-muted-foreground">
                Solo $300 CLP por canción
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3">Disfruta</h3>
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
