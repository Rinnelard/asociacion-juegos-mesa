'use client';

import styles from './juegos.module.css';

const JUEGOS_DEMO = [
    {
        id: 1,
        nombre: 'Catan',
        categoria: 'Estrategia',
        jugadores: '3-4',
        duracion: '60-90 min',
        disponible: true,
        imagen: '🏝️'
    },
    {
        id: 2,
        nombre: 'Carcassonne',
        categoria: 'Estrategia',
        jugadores: '2-5',
        duracion: '30-45 min',
        disponible: true,
        imagen: '🏰'
    },
    {
        id: 3,
        nombre: 'Dixit',
        categoria: 'Familiar',
        jugadores: '3-6',
        duracion: '30 min',
        disponible: false,
        imagen: '🎨'
    },
    {
        id: 4,
        nombre: 'Pandemic',
        categoria: 'Cooperativo',
        jugadores: '2-4',
        duracion: '45 min',
        disponible: true,
        imagen: '🦠'
    },
    {
        id: 5,
        nombre: 'Ticket to Ride',
        categoria: 'Familiar',
        jugadores: '2-5',
        duracion: '30-60 min',
        disponible: true,
        imagen: '🚂'
    },
    {
        id: 6,
        nombre: 'Azul',
        categoria: 'Abstracto',
        jugadores: '2-4',
        duracion: '30-45 min',
        disponible: true,
        imagen: '🔵'
    },
];

export default function JuegosPage() {
    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <h1>Catálogo de Juegos</h1>
                    <p className={styles.subtitle}>
                        Explora nuestra colección de juegos de mesa disponibles
                    </p>
                </div>

                <div className={styles.filters}>
                    <select className="form-select">
                        <option>Todas las categorías</option>
                        <option>Estrategia</option>
                        <option>Familiar</option>
                        <option>Cooperativo</option>
                        <option>Abstracto</option>
                    </select>
                    <select className="form-select">
                        <option>Todos los juegos</option>
                        <option>Disponibles</option>
                        <option>Prestados</option>
                    </select>
                </div>

                <div className={styles.grid}>
                    {JUEGOS_DEMO.map((juego) => (
                        <div key={juego.id} className={`card ${styles.card}`}>
                            <div className={styles.cardImage}>{juego.imagen}</div>
                            <div className={styles.cardContent}>
                                <h3>{juego.nombre}</h3>
                                <div className={styles.cardMeta}>
                                    <span className="badge badge-primary">{juego.categoria}</span>
                                    {juego.disponible ? (
                                        <span className="badge badge-success">Disponible</span>
                                    ) : (
                                        <span className={styles.badgePrestado}>Prestado</span>
                                    )}
                                </div>
                                <div className={styles.cardInfo}>
                                    <div className={styles.infoItem}>
                                        <span>👥</span> {juego.jugadores}
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span>⏱️</span> {juego.duracion}
                                    </div>
                                </div>
                                <button className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>
                                    Ver Detalles
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
