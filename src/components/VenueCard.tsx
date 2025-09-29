import { Link } from "react-router-dom";
import { MapPin, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Venue } from "@/data/mockData";

interface VenueCardProps {
  venue: Venue;
}

export const VenueCard = ({ venue }: VenueCardProps) => {
  return (
    <Link to={`/catalog/${venue.id}`}>
      <Card className="group overflow-hidden hover:shadow-card-hover transition-all duration-500 hover:scale-[1.02] cursor-pointer border-border/50 bg-gradient-card backdrop-blur-sm">
        <div className="relative h-48 overflow-hidden">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground shadow-glow border-0">
            <Music className="w-3 h-3 mr-1" />
            {venue.currentSongs} en cola
          </Badge>
        </div>
        <CardContent className="p-5">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{venue.name}</h3>
          <div className="flex items-center text-muted-foreground text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            {venue.location}
          </div>
          <Badge variant="secondary" className="font-medium">{venue.type}</Badge>
        </CardContent>
      </Card>
    </Link>
  );
};
