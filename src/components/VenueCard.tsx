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
      <Card className="overflow-hidden hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-accent/80 to-transparent" />
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
            <Music className="w-3 h-3 mr-1" />
            {venue.currentSongs} en cola
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
          <div className="flex items-center text-muted-foreground text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {venue.location}
          </div>
          <Badge variant="secondary">{venue.type}</Badge>
        </CardContent>
      </Card>
    </Link>
  );
};
