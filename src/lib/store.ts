// Simple state management for cart and transactions

import { Song, QueueItem, Transaction } from '@/data/mockData';

interface CartState {
  selectedSong: Song | null;
  venueId: string | null;
}

interface AppState {
  cart: CartState;
  queue: QueueItem[];
  transactions: Transaction[];
}

// Simple in-memory store
let appState: AppState = {
  cart: {
    selectedSong: null,
    venueId: null
  },
  queue: [],
  transactions: []
};

// Listeners for state updates
type Listener = () => void;
const listeners: Listener[] = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

export const store = {
  // Cart operations
  setSelectedSong: (song: Song | null, venueId: string | null = null) => {
    appState.cart.selectedSong = song;
    appState.cart.venueId = venueId;
    notifyListeners();
  },

  getCart: () => appState.cart,

  clearCart: () => {
    appState.cart.selectedSong = null;
    appState.cart.venueId = null;
    notifyListeners();
  },

  // Queue operations
  addToQueue: (item: QueueItem) => {
    appState.queue.push(item);
    notifyListeners();
  },

  getQueue: () => appState.queue,

  updateQueueItemStatus: (id: string, status: 'waiting' | 'playing' | 'played') => {
    const item = appState.queue.find(i => i.id === id);
    if (item) {
      item.status = status;
      notifyListeners();
    }
  },

  // Transaction operations
  addTransaction: (transaction: Transaction) => {
    appState.transactions.push(transaction);
    notifyListeners();
  },

  getTransactions: () => appState.transactions,

  getTransactionsBySong: (songId: string) => {
    return appState.transactions.filter(t => t.songId === songId);
  },

  // Subscribe to state changes
  subscribe: (listener: Listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }
};

// Initialize with some queue items for demo
appState.queue = [
  {
    id: 'q1',
    songId: 's6',
    position: 1,
    estimatedTime: 0,
    addedBy: 'Usuario actual',
    status: 'playing'
  },
  {
    id: 'q2',
    songId: 's2',
    position: 2,
    estimatedTime: 4,
    addedBy: 'Mesa 5',
    status: 'waiting'
  },
  {
    id: 'q3',
    songId: 's9',
    position: 3,
    estimatedTime: 8,
    addedBy: 'Mesa 3',
    status: 'waiting'
  },
  {
    id: 'q4',
    songId: 's4',
    position: 4,
    estimatedTime: 12,
    addedBy: 'Mesa 7',
    status: 'waiting'
  }
];
