// Mock data for the music platform

export interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  bio: string;
  songs: string[];
}

export interface Song {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  duration: number; // in seconds
  genre: string;
  price: number; // in CLP
  image: string;
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  type: string;
  image: string;
  activePlaylist: boolean;
  currentSongs: number;
}

export interface QueueItem {
  id: string;
  songId: string;
  position: number;
  estimatedTime: number; // minutes
  addedBy: string;
  status: 'waiting' | 'playing' | 'played';
}

export interface Transaction {
  id: string;
  songId: string;
  venueId: string;
  timestamp: Date;
  amount: number;
  position: number;
}

export const mockArtists: Artist[] = [
  {
    id: 'a1',
    name: 'Los Beats Urbanos',
    genre: 'Reggaeton',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    bio: 'Grupo emergente de reggaeton urbano con ritmos frescos y letras auténticas.',
    songs: ['s1', 's2', 's3']
  },
  {
    id: 'a2',
    name: 'Melodía Acústica',
    genre: 'Pop Acústico',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
    bio: 'Cantautora indie con un toque melódico único que conquista corazones.',
    songs: ['s4', 's5']
  },
  {
    id: 'a3',
    name: 'Electro Pulse',
    genre: 'Electrónica',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
    bio: 'DJ y productor de música electrónica con beats innovadores.',
    songs: ['s6', 's7', 's8']
  },
  {
    id: 'a4',
    name: 'Rock Ancestral',
    genre: 'Rock Latino',
    image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400',
    bio: 'Banda de rock latino con influencias andinas y letras profundas.',
    songs: ['s9', 's10']
  },
  {
    id: 'a5',
    name: 'Jazz Nocturno',
    genre: 'Jazz',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400',
    bio: 'Trío de jazz contemporáneo que fusiona clásicos con modernidad.',
    songs: ['s11', 's12']
  }
];

export const mockSongs: Song[] = [
  {
    id: 's1',
    title: 'Noche de Fiesta',
    artistId: 'a1',
    artistName: 'Los Beats Urbanos',
    duration: 198,
    genre: 'Reggaeton',
    price: 300,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
  },
  {
    id: 's2',
    title: 'Calor de Verano',
    artistId: 'a1',
    artistName: 'Los Beats Urbanos',
    duration: 215,
    genre: 'Reggaeton',
    price: 300,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
  },
  {
    id: 's3',
    title: 'Ritmo Latino',
    artistId: 'a1',
    artistName: 'Los Beats Urbanos',
    duration: 187,
    genre: 'Reggaeton',
    price: 300,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
  },
  {
    id: 's4',
    title: 'Susurros del Alma',
    artistId: 'a2',
    artistName: 'Melodía Acústica',
    duration: 245,
    genre: 'Pop Acústico',
    price: 300,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400'
  },
  {
    id: 's5',
    title: 'Caminos de Luna',
    artistId: 'a2',
    artistName: 'Melodía Acústica',
    duration: 223,
    genre: 'Pop Acústico',
    price: 300,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400'
  },
  {
    id: 's6',
    title: 'Pulso Nocturno',
    artistId: 'a3',
    artistName: 'Electro Pulse',
    duration: 267,
    genre: 'Electrónica',
    price: 300,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400'
  },
  {
    id: 's7',
    title: 'Neón Digital',
    artistId: 'a3',
    artistName: 'Electro Pulse',
    duration: 298,
    genre: 'Electrónica',
    price: 300,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400'
  },
  {
    id: 's8',
    title: 'Frecuencia Alta',
    artistId: 'a3',
    artistName: 'Electro Pulse',
    duration: 234,
    genre: 'Electrónica',
    price: 300,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400'
  },
  {
    id: 's9',
    title: 'Grito de Libertad',
    artistId: 'a4',
    artistName: 'Rock Ancestral',
    duration: 278,
    genre: 'Rock Latino',
    price: 300,
    image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400'
  },
  {
    id: 's10',
    title: 'Revolución Andina',
    artistId: 'a4',
    artistName: 'Rock Ancestral',
    duration: 312,
    genre: 'Rock Latino',
    price: 300,
    image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400'
  },
  {
    id: 's11',
    title: 'Blue Moonlight',
    artistId: 'a5',
    artistName: 'Jazz Nocturno',
    duration: 256,
    genre: 'Jazz',
    price: 300,
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400'
  },
  {
    id: 's12',
    title: 'Improvisación en Dm',
    artistId: 'a5',
    artistName: 'Jazz Nocturno',
    duration: 289,
    genre: 'Jazz',
    price: 300,
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400'
  }
];

export const mockVenues: Venue[] = [
  {
    id: 'v1',
    name: 'La Bohemia Bar',
    location: 'Barrio Lastarria, Santiago',
    type: 'Bar',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600',
    activePlaylist: true,
    currentSongs: 8
  },
  {
    id: 'v2',
    name: 'Café Melómano',
    location: 'Providencia, Santiago',
    type: 'Café',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600',
    activePlaylist: true,
    currentSongs: 5
  },
  {
    id: 'v3',
    name: 'Club Nocturno Beats',
    location: 'Bellavista, Santiago',
    type: 'Club',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600',
    activePlaylist: true,
    currentSongs: 12
  },
  {
    id: 'v4',
    name: 'Terraza del Sol',
    location: 'Las Condes, Santiago',
    type: 'Terraza Bar',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600',
    activePlaylist: true,
    currentSongs: 6
  }
];

// Helper functions
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString('es-CL')} CLP`;
};

export const getSongById = (id: string): Song | undefined => {
  return mockSongs.find(song => song.id === id);
};

export const getArtistById = (id: string): Artist | undefined => {
  return mockArtists.find(artist => artist.id === id);
};

export const getVenueById = (id: string): Venue | undefined => {
  return mockVenues.find(venue => venue.id === id);
};

export const getSongsByArtist = (artistId: string): Song[] => {
  return mockSongs.filter(song => song.artistId === artistId);
};

export const getSongsByGenre = (genre: string): Song[] => {
  return mockSongs.filter(song => song.genre === genre);
};

export const getAllGenres = (): string[] => {
  return Array.from(new Set(mockSongs.map(song => song.genre)));
};
