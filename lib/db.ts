// Simulación de base de datos con localStorage
// En producción, esto se reemplazaría con llamadas a API real

export interface Game {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  jugadores: string;
  duracion: string;
  dificultad: 'Fácil' | 'Media' | 'Difícil';
  categoria: string;
  disponible: boolean;
  reservadoPor?: string;
  valoraciones: { usuarioId: string; puntuacion: number; comentario: string; fecha: string }[];
  puntuacionMedia: number;
}

export interface Event {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  imagen: string;
  capacidadMaxima: number;
  inscritos: string[];
  tipo: 'Torneo' | 'Taller' | 'Meetup' | 'Especial';
}

export interface News {
  id: string;
  titulo: string;
  contenido: string;
  extracto: string;
  imagen: string;
  fecha: string;
  autor: string;
  categoria: string;
}

export interface User {
  id: string;
  nombre: string;
  email: string;
  password: string;
  rol: 'user' | 'admin';
  telefono?: string;
  fechaRegistro: string;
  juegosReservados: string[];
  eventosInscritos: string[];
}

// Datos iniciales
const initialGames: Game[] = [
  {
    id: '1',
    nombre: 'Catan',
    descripcion: 'Juego de estrategia donde los jugadores colonizan una isla, recogen recursos y construyen asentamientos.',
    imagen: '/games/catan.jpg',
    jugadores: '3-4',
    duracion: '60-120 min',
    dificultad: 'Media',
    categoria: 'Estrategia',
    disponible: true,
    valoraciones: [],
    puntuacionMedia: 0,
  },
  {
    id: '2',
    nombre: 'Carcassonne',
    descripcion: 'Juego de colocación de losetas donde construyes ciudades, caminos y monasterios en la Francia medieval.',
    imagen: '/games/carcassonne.jpg',
    jugadores: '2-5',
    duracion: '30-45 min',
    dificultad: 'Fácil',
    categoria: 'Familiar',
    disponible: true,
    valoraciones: [],
    puntuacionMedia: 0,
  },
  {
    id: '3',
    nombre: 'Pandemic',
    descripcion: 'Juego cooperativo donde trabajas en equipo para salvar al mundo de enfermedades mortales.',
    imagen: '/games/pandemic.jpg',
    jugadores: '2-4',
    duracion: '45 min',
    dificultad: 'Media',
    categoria: 'Cooperativo',
    disponible: true,
    valoraciones: [],
    puntuacionMedia: 0,
  },
  {
    id: '4',
    nombre: '7 Wonders',
    descripcion: 'Desarrolla una civilización y construye maravillas arquitectónicas en este juego de cartas.',
    imagen: '/games/7wonders.jpg',
    jugadores: '2-7',
    duracion: '30 min',
    dificultad: 'Media',
    categoria: 'Estrategia',
    disponible: true,
    valoraciones: [],
    puntuacionMedia: 0,
  },
  {
    id: '5',
    nombre: 'Ticket to Ride',
    descripcion: 'Construye rutas de tren a través de diferentes países en este clásico juego familiar.',
    imagen: '/games/ticket.jpg',
    jugadores: '2-5',
    duracion: '30-60 min',
    dificultad: 'Fácil',
    categoria: 'Familiar',
    disponible: true,
    valoraciones: [],
    puntuacionMedia: 0,
  },
  {
    id: '6',
    nombre: 'Gloomhaven',
    descripcion: 'RPG táctico de mazmorras con campaña persistente y combate basado en cartas.',
    imagen: '/games/gloomhaven.jpg',
    jugadores: '1-4',
    duracion: '60-120 min',
    dificultad: 'Difícil',
    categoria: 'Aventura',
    disponible: true,
    valoraciones: [],
    puntuacionMedia: 0,
  },
];

const initialEvents: Event[] = [
  {
    id: '1',
    titulo: 'Torneo de Catan',
    descripcion: 'Gran torneo mensual de Catan con premios para los ganadores. ¡Demuestra tu estrategia!',
    fecha: '2025-12-20',
    hora: '18:00',
    lugar: 'Sala Principal',
    imagen: '/events/torneo-catan.jpg',
    capacidadMaxima: 16,
    inscritos: [],
    tipo: 'Torneo',
  },
  {
    id: '2',
    titulo: 'Noche de Juegos Cooperativos',
    descripcion: 'Sesión especial de juegos cooperativos. ¡Trabajemos juntos para ganar!',
    fecha: '2025-12-22',
    hora: '19:30',
    lugar: 'Sala 2',
    imagen: '/events/cooperativo.jpg',
    capacidadMaxima: 20,
    inscritos: [],
    tipo: 'Meetup',
  },
  {
    id: '3',
    titulo: 'Taller: Introducción a los Juegos de Mesa',
    descripcion: 'Aprende los fundamentos de los juegos de mesa modernos. Perfecto para principiantes.',
    fecha: '2025-12-25',
    hora: '17:00',
    lugar: 'Sala de Talleres',
    imagen: '/events/taller.jpg',
    capacidadMaxima: 12,
    inscritos: [],
    tipo: 'Taller',
  },
];

const initialNews: News[] = [
  {
    id: '1',
    titulo: '¡Nuevos Juegos en la Biblioteca!',
    extracto: 'Hemos añadido 15 nuevos títulos a nuestra colección.',
    contenido: 'Estamos emocionados de anunciar que hemos expandido nuestra biblioteca con 15 nuevos juegos de mesa. Desde clásicos modernos hasta novedades del 2024, hay algo para todos los gustos.',
    imagen: '/news/nuevos-juegos.jpg',
    fecha: '2025-12-10',
    autor: 'Admin',
    categoria: 'Novedades',
  },
  {
    id: '2',
    titulo: 'Récord de Asistencia en Noviembre',
    extracto: '¡Más de 150 visitantes este mes!',
    contenido: 'Noviembre ha sido un mes increíble con más de 150 visitantes únicos. Gracias a todos por formar parte de esta comunidad.',
    imagen: '/news/record.jpg',
    fecha: '2025-12-05',
    autor: 'Admin',
    categoria: 'Comunidad',
  },
];

const initialUsers: User[] = [
  {
    id: '1',
    nombre: 'Administrador',
    email: 'admin@juegosdemesa.com',
    password: 'admin123',
    rol: 'admin',
    telefono: '666777888',
    fechaRegistro: '2024-01-01',
    juegosReservados: [],
    eventosInscritos: [],
  },
  {
    id: '2',
    nombre: 'Usuario Demo',
    email: 'usuario@juegosdemesa.com',
    password: 'user123',
    rol: 'user',
    telefono: '655444333',
    fechaRegistro: '2024-06-15',
    juegosReservados: [],
    eventosInscritos: [],
  },
];

// Helper para obtener datos del localStorage o iniciales
function getStorageData<T>(key: string, initial: T): T {
  if (typeof window === 'undefined') return initial;
  
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
}

// Helper para guardar datos
function saveStorageData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// API de Juegos
export const gamesDB = {
  getAll: (): Game[] => getStorageData('games', initialGames),
  
  getById: (id: string): Game | undefined => {
    const games = gamesDB.getAll();
    return games.find(g => g.id === id);
  },
  
  create: (game: Omit<Game, 'id'>): Game => {
    const games = gamesDB.getAll();
    const newGame = { ...game, id: Date.now().toString() };
    games.push(newGame);
    saveStorageData('games', games);
    return newGame;
  },
  
  update: (id: string, updates: Partial<Game>): Game | undefined => {
    const games = gamesDB.getAll();
    const index = games.findIndex(g => g.id === id);
    if (index === -1) return undefined;
    
    games[index] = { ...games[index], ...updates };
    saveStorageData('games', games);
    return games[index];
  },
  
  delete: (id: string): boolean => {
    const games = gamesDB.getAll();
    const filtered = games.filter(g => g.id !== id);
    if (filtered.length === games.length) return false;
    
    saveStorageData('games', filtered);
    return true;
  },
  
  addRating: (gameId: string, userId: string, puntuacion: number, comentario: string): boolean => {
    const game = gamesDB.getById(gameId);
    if (!game) return false;
    
    const newRating = {
      usuarioId: userId,
      puntuacion,
      comentario,
      fecha: new Date().toISOString(),
    };
    
    const existingIndex = game.valoraciones.findIndex(v => v.usuarioId === userId);
    if (existingIndex >= 0) {
      game.valoraciones[existingIndex] = newRating;
    } else {
      game.valoraciones.push(newRating);
    }
    
    // Calcular media
    const total = game.valoraciones.reduce((sum, v) => sum + v.puntuacion, 0);
    game.puntuacionMedia = total / game.valoraciones.length;
    
    gamesDB.update(gameId, game);
    return true;
  },
};

// API de Eventos
export const eventsDB = {
  getAll: (): Event[] => getStorageData('events', initialEvents),
  
  getById: (id: string): Event | undefined => {
    const events = eventsDB.getAll();
    return events.find(e => e.id === id);
  },
  
  create: (event: Omit<Event, 'id'>): Event => {
    const events = eventsDB.getAll();
    const newEvent = { ...event, id: Date.now().toString() };
    events.push(newEvent);
    saveStorageData('events', events);
    return newEvent;
  },
  
  update: (id: string, updates: Partial<Event>): Event | undefined => {
    const events = eventsDB.getAll();
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return undefined;
    
    events[index] = { ...events[index], ...updates };
    saveStorageData('events', events);
    return events[index];
  },
  
  delete: (id: string): boolean => {
    const events = eventsDB.getAll();
    const filtered = events.filter(e => e.id !== id);
    if (filtered.length === events.length) return false;
    
    saveStorageData('events', filtered);
    return true;
  },
  
  inscribirse: (eventId: string, userId: string): boolean => {
    const event = eventsDB.getById(eventId);
    if (!event) return false;
    if (event.inscritos.includes(userId)) return false;
    if (event.inscritos.length >= event.capacidadMaxima) return false;
    
    event.inscritos.push(userId);
    eventsDB.update(eventId, event);
    
    // Actualizar usuario
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
    
    // Actualizar usuario
    const user = usersDB.getById(userId);
    if (user) {
      user.eventosInscritos = user.eventosInscritos.filter(id => id !== eventId);
      usersDB.update(userId, user);
    }
    
    return true;
  },
};

// API de Noticias
export const newsDB = {
  getAll: (): News[] => getStorageData('news', initialNews),
  
  getById: (id: string): News | undefined => {
    const news = newsDB.getAll();
    return news.find(n => n.id === id);
  },
  
  create: (newsItem: Omit<News, 'id'>): News => {
    const news = newsDB.getAll();
    const newNews = { ...newsItem, id: Date.now().toString() };
    news.unshift(newNews); // Añadir al principio
    saveStorageData('news', news);
    return newNews;
  },
  
  update: (id: string, updates: Partial<News>): News | undefined => {
    const news = newsDB.getAll();
    const index = news.findIndex(n => n.id === id);
    if (index === -1) return undefined;
    
    news[index] = { ...news[index], ...updates };
    saveStorageData('news', news);
    return news[index];
  },
  
  delete: (id: string): boolean => {
    const news = newsDB.getAll();
    const filtered = news.filter(n => n.id !== id);
    if (filtered.length === news.length) return false;
    
    saveStorageData('news', filtered);
    return true;
  },
};

// API de Usuarios
export const usersDB = {
  getAll: (): User[] => getStorageData('users', initialUsers),
  
  getById: (id: string): User | undefined => {
    const users = usersDB.getAll();
    return users.find(u => u.id === id);
  },
  
  getByEmail: (email: string): User | undefined => {
    const users = usersDB.getAll();
    return users.find(u => u.email === email);
  },
  
  create: (user: Omit<User, 'id'>): User => {
    const users = usersDB.getAll();
    const newUser = { ...user, id: Date.now().toString() };
    users.push(newUser);
    saveStorageData('users', users);
    return newUser;
  },
  
  update: (id: string, updates: Partial<User>): User | undefined => {
    const users = usersDB.getAll();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return undefined;
    
    users[index] = { ...users[index], ...updates };
    saveStorageData('users', users);
    return users[index];
  },
  
  reservarJuego: (userId: string, gameId: string): boolean => {
    const user = usersDB.getById(userId);
    const game = gamesDB.getById(gameId);
    
    if (!user || !game || !game.disponible) return false;
    if (user.juegosReservados.includes(gameId)) return false;
    
    user.juegosReservados.push(gameId);
    game.disponible = false;
    game.reservadoPor = userId;
    
    usersDB.update(userId, user);
    gamesDB.update(gameId, game);
    
    return true;
  },
  
  devolverJuego: (userId: string, gameId: string): boolean => {
    const user = usersDB.getById(userId);
    const game = gamesDB.getById(gameId);
    
    if (!user || !game) return false;
    
    user.juegosReservados = user.juegosReservados.filter(id => id !== gameId);
    game.disponible = true;
    game.reservadoPor = undefined;
    
    usersDB.update(userId, user);
    gamesDB.update(gameId, game);
    
    return true;
  },
};

// Estadísticas para el panel admin
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
      totalNews: news.length,
      reservedGames: games.filter(g => !g.disponible).length,
      totalInscriptions: events.reduce((sum, e) => sum + e.inscritos.length, 0),
    };
  },
};
