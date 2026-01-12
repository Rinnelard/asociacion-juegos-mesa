import { getAssetPath } from './utils';
import { Game, Event, News, User, Reservation, Rating } from './types';

// --- INITIAL DATA ---

const INITIAL_GAMES: Game[] = [
  {
    id: 'carcassonne',
    nombre: 'Carcassonne',
    descripcion: 'Un juego de colocar losetas donde los jugadores construyen ciudades, caminos y monasterios en la Francia medieval.',
    imagen: getAssetPath('/games/carcassonne.png'),
    jugadores: '2-5',
    duracion: '35 min',
    dificultad: 'Fácil',
    categoria: 'Estrategia',
    disponible: true,
    reservas: [],
    valoraciones: [],
    puntuacionMedia: 4.8,
  },
  {
    id: 'pandemic',
    nombre: 'Pandemic',
    descripcion: 'Juego cooperativo donde eres parte de un equipo que debe erradicar cuatro enfermedades mortales en todo el mundo.',
    imagen: getAssetPath('/games/pandemic.png'),
    jugadores: '2-4',
    duracion: '45 min',
    dificultad: 'Media',
    categoria: 'Cooperativo',
    disponible: true,
    reservas: [],
    valoraciones: [],
    puntuacionMedia: 4.7,
  },
  {
    id: '7wonders',
    nombre: '7 Wonders',
    descripcion: 'Lidera una de las siete grandes ciudades de la Antigüedad. Desarrolla tu civilización y construye una de las Maravillas.',
    imagen: getAssetPath('/games/7wonders.png'),
    jugadores: '2-7',
    duracion: '30 min',
    dificultad: 'Media',
    categoria: 'Civilización',
    disponible: true,
    reservas: [],
    valoraciones: [],
    puntuacionMedia: 4.9,
  },
  {
    id: 'ticket-to-ride',
    nombre: 'Ticket to Ride',
    descripcion: 'Aventureros en tren: recorre Norteamérica conectando ciudades en un mapa clásico y emocionante para toda la familia.',
    imagen: getAssetPath('/games/ticket-to-ride.png'),
    jugadores: '2-5',
    duracion: '30-60 min',
    dificultad: 'Fácil',
    categoria: 'Familiar',
    disponible: true,
    reservas: [],
    valoraciones: [],
    puntuacionMedia: 4.6,
  },
  {
    id: 'gloomhaven',
    nombre: 'Gloomhaven',
    descripcion: 'Combate táctico cooperativo en un mundo de fantasía persistente. Campañas épicas y decisiones que cambian el mundo.',
    imagen: getAssetPath('/games/gloomhaven.png'),
    jugadores: '1-4',
    duracion: '60-120 min',
    dificultad: 'Difícil',
    categoria: 'Aventura',
    disponible: true,
    reservas: [],
    valoraciones: [],
    puntuacionMedia: 5.0,
  }
];

const INITIAL_EVENTS: Event[] = [
  {
    id: 'real-1',
    titulo: 'Partida Introductoria: Twilight Imperium 4',
    descripcion: 'Estrategia, diplomacia y conquista espacial en uno de los juegos más legendarios.',
    fecha: '2026-02-10',
    hora: '10:30',
    lugar: 'Tienda Nexo (C/ Castillejos 59)',
    imagen: getAssetPath('/events/ti4-intro.jpg'),
    capacidadMaxima: 6,
    inscritos: [],
    tipo: 'Especial',
  },
  {
    id: 'real-2',
    titulo: 'Clases: El Señor de los Anillos (Miniaturas)',
    descripcion: 'Aprende a jugar desde cero. Asedios, escaramuzas y campañas narrativas.',
    fecha: '2026-02-17',
    hora: '17:00',
    lugar: 'Sede Noctis / La Comarca Games',
    imagen: getAssetPath('/events/esdl-clases.jpg'),
    capacidadMaxima: 12,
    inscritos: [],
    tipo: 'Taller',
  }
];

const INITIAL_NEWS: News[] = [
  {
    id: '1',
    titulo: '¡Nuevos Juegos en la Biblioteca!',
    extracto: 'Hemos añadido 15 nuevos títulos a nuestra colección.',
    contenido: 'Estamos emocionados de anunciar que hemos expandido nuestra biblioteca con 15 nuevos juegos de mesa.',
    imagen: getAssetPath('/news/nuevos-juegos.jpg'),
    fecha: '2025-12-10',
    autor: 'Admin',
    categoria: 'Novedades',
  }
];

const INITIAL_USERS: User[] = [
  {
    id: '1',
    nombre: 'Administrador',
    email: 'admin@noctis.com',
    password: 'admin_',
    rol: 'admin',
    telefono: '666777888',
    fechaRegistro: '2024-01-01',
    juegosReservados: [],
    eventosInscritos: [],
  },
  {
    id: '2',
    nombre: 'Usuario Demo',
    email: 'user@noctis.com',
    password: 'usuario_',
    rol: 'user',
    telefono: '655444333',
    fechaRegistro: '2024-06-15',
    juegosReservados: [],
    eventosInscritos: [],
  }
];

// --- STORAGE ENGINE ---

function getLocal<T>(key: string, defaultData: T): T {
  if (typeof window === 'undefined') return defaultData;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }

  // Data reconciliation to ensure updates are reflected
  const data = JSON.parse(stored);

  if (key === 'games') {
    const currentIds = (data as any[]).map(g => g.id);
    const hasLegacy = (data as any[]).some(g => !g.reservas);
    const missingNew = INITIAL_GAMES.some(g => !currentIds.includes(g.id));

    if (hasLegacy || missingNew) {
      const updated = [...INITIAL_GAMES, ...(data as any[]).filter(g => !INITIAL_GAMES.some(ig => ig.id === g.id))];
      const cleaned = updated.map(g => ({ ...g, reservas: g.reservas || [] }));
      localStorage.setItem(key, JSON.stringify(cleaned));
      return cleaned as unknown as T;
    }
  }

  if (key === 'users') {
    const hasDemoUsers = (data as any[]).some(u => u.email === 'admin@noctis.com');
    if (!hasDemoUsers) {
      const merged = [...INITIAL_USERS, ...(data as any[]).filter(u => !INITIAL_USERS.some(iu => iu.email === u.email))];
      localStorage.setItem(key, JSON.stringify(merged));
      return merged as unknown as T;
    }
  }

  if (key === 'events') {
    const hasRealEvents = (data as any[]).some(e => e.id === 'real-1');
    if (!hasRealEvents) {
      const merged = [...INITIAL_EVENTS, ...(data as any[]).filter(e => !INITIAL_EVENTS.some(ie => ie.id === e.id))];
      localStorage.setItem(key, JSON.stringify(merged));
      return merged as unknown as T;
    }
  }

  return data;
}

function setLocal<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// --- DATABASE SERVICES ---

export const gamesDB = {
  getAll: (): Game[] => getLocal('games', INITIAL_GAMES),

  getById: (id: string): Game | undefined =>
    gamesDB.getAll().find(g => g.id === id),

  create: (game: Omit<Game, 'id'>): Game => {
    const items = gamesDB.getAll();
    const newGame = { ...game, id: Date.now().toString() };
    items.push(newGame);
    setLocal('games', items);
    return newGame;
  },

  update: (id: string, updates: Partial<Game>): Game | undefined => {
    const items = gamesDB.getAll();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return undefined;
    items[idx] = { ...items[idx], ...updates };
    setLocal('games', items);
    return items[idx];
  },

  delete: (id: string): boolean => {
    const items = gamesDB.getAll();
    const filtered = items.filter(i => i.id !== id);
    if (filtered.length === items.length) return false;
    setLocal('games', filtered);
    return true;
  },

  addRating: (gameId: string, userId: string, score: number, comment: string): boolean => {
    const game = gamesDB.getById(gameId);
    if (!game) return false;

    const rating: Rating = {
      usuarioId: userId,
      puntuacion: score,
      comentario: comment,
      fecha: new Date().toISOString()
    };

    const existingIdx = game.valoraciones.findIndex(v => v.usuarioId === userId);
    if (existingIdx >= 0) game.valoraciones[existingIdx] = rating;
    else game.valoraciones.push(rating);

    game.puntuacionMedia = game.valoraciones.reduce((s, v) => s + v.puntuacion, 0) / game.valoraciones.length;
    gamesDB.update(gameId, game);
    return true;
  }
};

export const eventsDB = {
  getAll: (): Event[] => getLocal('events', INITIAL_EVENTS),
  getById: (id: string): Event | undefined => eventsDB.getAll().find(e => e.id === id),

  create: (event: Omit<Event, 'id'>): Event => {
    const items = eventsDB.getAll();
    const newEvent = { ...event, id: Date.now().toString() };
    items.push(newEvent);
    setLocal('events', items);
    return newEvent;
  },

  update: (id: string, updates: Partial<Event>): Event | undefined => {
    const items = eventsDB.getAll();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return undefined;
    items[idx] = { ...items[idx], ...updates };
    setLocal('events', items);
    return items[idx];
  },

  delete: (id: string): boolean => {
    const items = eventsDB.getAll();
    const filtered = items.filter(i => i.id !== id);
    if (filtered.length === items.length) return false;
    setLocal('events', filtered);
    return true;
  },

  inscribirse: (eventId: string, userId: string): boolean => {
    const event = eventsDB.getById(eventId);
    if (!event || event.inscritos.includes(userId) || event.inscritos.length >= event.capacidadMaxima) return false;

    event.inscritos.push(userId);
    eventsDB.update(eventId, event);

    const user = usersDB.getById(userId);
    if (user && !user.eventosInscritos.includes(eventId)) {
      user.eventosInscritos.push(eventId);
      usersDB.update(userId, user);
    }
    return true;
  },

  desinscribirse: (eventId: string, userId: string): boolean => {
    const event = eventsDB.getById(eventId);
    if (!event) return false;

    event.inscritos = event.inscritos.filter(id => id !== userId);
    eventsDB.update(eventId, event);

    const user = usersDB.getById(userId);
    if (user) {
      user.eventosInscritos = user.eventosInscritos.filter(id => id !== eventId);
      usersDB.update(userId, user);
    }
    return true;
  }
};

export const newsDB = {
  getAll: (): News[] => getLocal('news', INITIAL_NEWS),
  getById: (id: string): News | undefined => newsDB.getAll().find(n => n.id === id),

  create: (news: Omit<News, 'id'>): News => {
    const items = newsDB.getAll();
    const newNews = { ...news, id: Date.now().toString() };
    items.push(newNews);
    setLocal('news', items);
    return newNews;
  },

  update: (id: string, updates: Partial<News>): News | undefined => {
    const items = newsDB.getAll();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return undefined;
    items[idx] = { ...items[idx], ...updates };
    setLocal('news', items);
    return items[idx];
  },

  delete: (id: string): boolean => {
    const items = newsDB.getAll();
    const filtered = items.filter(i => i.id !== id);
    if (filtered.length === items.length) return false;
    setLocal('news', filtered);
    return true;
  }
};

export const usersDB = {
  getAll: (): User[] => getLocal('users', INITIAL_USERS),
  getById: (id: string): User | undefined => usersDB.getAll().find(u => u.id === id),
  getByEmail: (email: string): User | undefined => usersDB.getAll().find(u => u.email === email),

  create: (user: Omit<User, 'id'>): User => {
    const users = usersDB.getAll();
    const newUser = { ...user, id: Date.now().toString() };
    users.push(newUser);
    setLocal('users', users);
    return newUser;
  },

  update: (id: string, updates: Partial<User>): User | undefined => {
    const items = usersDB.getAll();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return undefined;
    items[idx] = { ...items[idx], ...updates };
    setLocal('users', items);
    return items[idx];
  },

  reservarJuego: (userId: string, gameId: string, fecha: string, todoElDia: boolean, horarios?: string[]): boolean => {
    const user = usersDB.getById(userId);
    const game = gamesDB.getById(gameId);

    if (!user || !game || !game.disponible) return false;

    const yaReservado = (game.reservas || []).some(r =>
      r.fecha === fecha && (r.todoElDia || todoElDia || (horarios && r.horarios?.some(h => horarios.includes(h))))
    );
    if (yaReservado) return false;

    const nuevaReserva: Reservation = {
      id: Date.now().toString(),
      usuarioId: userId,
      fecha,
      todoElDia,
      horarios
    };

    game.reservas = [...(game.reservas || []), nuevaReserva];
    user.juegosReservados.push(gameId);

    usersDB.update(userId, user);
    gamesDB.update(gameId, { reservas: game.reservas });
    return true;
  },

  devolverJuego: (userId: string, gameId: string, reservaId?: string): boolean => {
    const user = usersDB.getById(userId);
    const game = gamesDB.getById(gameId);

    if (!user || !game) return false;

    if (reservaId) {
      game.reservas = game.reservas.filter(r => r.id !== reservaId);
    } else {
      const idx = [...(game.reservas || [])].reverse().findIndex(r => r.usuarioId === userId);
      if (idx !== -1) {
        const actualIdx = (game.reservas || []).length - 1 - idx;
        game.reservas.splice(actualIdx, 1);
      }
    }

    user.juegosReservados = user.juegosReservados.filter(id => id !== gameId || (game.reservas || []).some(r => r.usuarioId === userId));

    usersDB.update(userId, user);
    gamesDB.update(gameId, { reservas: game.reservas });
    return true;
  }
};

export const statsDB = {
  getStats: () => {
    const games = gamesDB.getAll();
    const events = eventsDB.getAll();
    const users = usersDB.getAll();
    const news = newsDB.getAll();

    return {
      totalGames: games.length,
      availableGames: games.filter(g => g.disponible).length,
      totalEvents: events.length,
      upcomingEvents: events.filter(e => new Date(e.fecha) >= new Date()).length,
      totalUsers: users.length,
      reservedGames: games.reduce((acc, g) => acc + (g.reservas?.length || 0), 0),
      totalNews: news.length,
      totalInscriptions: events.reduce((acc, e) => acc + e.inscritos.length, 0)
    };
  }
};
