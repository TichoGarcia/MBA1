import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Filter, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SongCard } from "@/components/SongCard";
import { mockSongs, mockArtists, getVenueById, getAllGenres, Song } from "@/data/mockData";
import { store } from "@/lib/store";
import { toast } from "sonner";

const Catalog = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();
  const venue = venueId ? getVenueById(venueId) : null;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(mockSongs);

  const genres = getAllGenres();

  useEffect(() => {
    let filtered = mockSongs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        song =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artistName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      filtered = filtered.filter(song => song.genre === selectedGenre);
    }

    setFilteredSongs(filtered);
  }, [searchTerm, selectedGenre]);

  const handleAddToCart = (song: Song) => {
    store.setSelectedSong(song, venueId || null);
    toast.success(`"${song.title}" agregada al carrito`);
    navigate("/checkout");
  };

  if (!venue) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Local no encontrado</h1>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-4 text-secondary-foreground hover:bg-secondary-foreground/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          
          <h1 className="text-4xl font-bold mb-2">{venue.name}</h1>
          <p className="text-secondary-foreground/80">{venue.location}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar canciones o artistas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los géneros</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Song List */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {filteredSongs.length} {filteredSongs.length === 1 ? 'canción disponible' : 'canciones disponibles'}
          </h2>
        </div>

        {filteredSongs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No se encontraron canciones con esos filtros
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
