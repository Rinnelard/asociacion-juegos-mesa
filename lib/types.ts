export interface Reservation {
    id: string;
    usuarioId: string;
    fecha: string;
    todoElDia: boolean;
    horarios?: string[];
}

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
    reservas: Reservation[];
    valoraciones: Rating[];
    puntuacionMedia: number;
}

export interface Rating {
    usuarioId: string;
    puntuacion: number;
    comentario: string;
    fecha: string;
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
    dni?: string;
    intereses?: string[];
    fechaRegistro: string;
    juegosReservados: string[];
    eventosInscritos: string[];
}
