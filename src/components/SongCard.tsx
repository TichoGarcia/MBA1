import { Music, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Song, formatDuration, formatPrice } from "@/data/mockData";

interface SongCardProps {
  song: Song;
  onAddToCart: (song: Song) => void;
}

export const SongCard = ({ song, onAddToCart }: SongCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-card transition-all duration-300">
      <div className="flex gap-4 p-4">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={song.image}
            alt={song.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-accent/20" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{song.title}</h3>
          <p className="text-muted-foreground text-sm mb-2">{song.artistName}</p>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(song.duration)}
            </span>
            <span className="flex items-center gap-1">
              <Music className="w-3 h-3" />
              {song.genre}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-primary font-bold">{formatPrice(song.price)}</span>
            <Button 
              variant="music" 
              size="sm"
              onClick={() => onAddToCart(song)}
            >
              Agregar a playlist
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
