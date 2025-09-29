import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SongCard } from "@/components/SongCard";
import { getArtistById, getSongsByArtist, Song } from "@/data/mockData";
import { store } from "@/lib/store";
import { toast } from "sonner";

const ArtistProfile = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const navigate = useNavigate();
  const artist = artistId ? getArtistById(artistId) : null;
  const songs = artistId ? getSongsByArtist(artistId) : [];

  const handleAddToCart = (song: Song) => {
    store.setSelectedSong(song, null);
    toast.success(`"${song.title}" agregada al carrito`);
    navigate("/checkout");
  };

  if (!artist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artista no encontrado</h1>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/60 to-accent/20" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <Music className="w-12 h-12 text-primary" />
              <div>
                <h1 className="text-5xl font-bold text-primary-foreground mb-2">
                  {artist.name}
                </h1>
                <Badge variant="secondary" className="text-lg">
                  {artist.genre}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Artist Bio */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Sobre el artista</h2>
              <p className="text-muted-foreground leading-relaxed">{artist.bio}</p>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Canciones</span>
                  <span className="font-bold">{songs.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Género</span>
                  <span className="font-bold">{artist.genre}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Songs */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Canciones disponibles</h2>
            
            {songs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No hay canciones disponibles
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {songs.map((song) => (
                  <SongCard key={song.id} song={song} onAddToCart={handleAddToCart} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
