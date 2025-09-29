import { Play, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QueueItem, getSongById } from "@/data/mockData";

interface QueueListProps {
  queue: QueueItem[];
}

export const QueueList = ({ queue }: QueueListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="w-5 h-5 text-primary" />
          Cola de Reproducción
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {queue.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No hay canciones en cola
          </p>
        ) : (
          queue.map((item) => {
            const song = getSongById(item.songId);
            if (!song) return null;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-lg border transition-all ${
                  item.status === 'playing'
                    ? 'bg-music-playing border-primary shadow-glow'
                    : 'bg-music-queue border-border'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <Badge
                      variant={item.status === 'playing' ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      #{item.position}
                    </Badge>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{song.title}</h4>
                      <p className="text-sm text-muted-foreground">{song.artistName}</p>
                      
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {item.addedBy}
                        </span>
                        {item.status !== 'playing' && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            ~{item.estimatedTime} min
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.status === 'playing' && (
                    <Badge variant="default" className="animate-pulse-glow">
                      Sonando ahora
                    </Badge>
                  )}
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};
