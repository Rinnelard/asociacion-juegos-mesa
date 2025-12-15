'use client';

import styles from '../juegos/juegos.module.css';

const EVENTOS_DEMO = [
    {
        id: 1,
        nombre: 'Torneo de Magic: The Gathering',
        fecha: '2025-01-15',
        hora: '18:00',
        participantes: 24,
        maxParticipantes: 32,
        tipo: 'Torneo',
        emoji: '🃏'
    },
    {
        id: 2,
        nombre: 'Noche de Juegos de Rol',
        fecha: '2025-01-20',
        hora: '19:00',
        participantes: 12,
        maxParticipantes: 15,
        tipo: 'Social',
        emoji: '🎭'
    },
    {
        id: 3,
        nombre: 'Campeonato de Catan',
        fecha: '2025-01-25',
        hora: '17:00',
        participantes: 18,
        maxParticipantes: 20,
        tipo: 'Torneo',
        emoji: '🏝️'
    },
    {
        id: 4,
        nombre: 'Taller: Introducción a Warhammer',
        fecha: '2025-02-01',
        hora: '16:00',
        participantes: 8,
        maxParticipantes: 12,
        tipo: 'Taller',
        emoji: '⚔️'
    },
];

export default function EventosPage() {
    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <h1>Eventos y Torneos</h1>
                    <p className={styles.subtitle}>
                        Participa en nuestras actividades y torneos de juegos de mesa
                    </p>
                </div>

                <div className={styles.filters}>
                    <select className="form-select">
                        <option>Todos los eventos</option>
                        <option>Torneos</option>
                        <option>Talleres</option>
                        <option>Social</option>
                    </select>
                    <select className="form-select">
                        <option>Próximos eventos</option>
                        <option>Este mes</option>
                        <option>Eventos pasados</option>
                    </select>
                </div>

                <div className={styles.grid}>
                    {EVENTOS_DEMO.map((evento) => (
                        <div key={evento.id} className={`card ${styles.card}`}>
                            <div className={styles.cardImage}>{evento.emoji}</div>
                            <div className={styles.cardContent}>
                                <h3>{evento.nombre}</h3>
                                <div className={styles.cardMeta}>
                                    <span className="badge badge-accent">{evento.tipo}</span>
                                    <span className="badge badge-primary">
                                        {evento.participantes}/{evento.maxParticipantes} plazas
                                    </span>
                                </div>
                                <div className={styles.cardInfo}>
                                    <div className={styles.infoItem}>
                                        <span>📅</span> {new Date(evento.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span>⏰</span> {evento.hora}
                                    </div>
                                </div>
                                <button className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>
                                    Inscribirse
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
