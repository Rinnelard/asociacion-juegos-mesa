'use client';

import styles from '../juegos/juegos.module.css';

const NOTICIAS_DEMO = [
    {
        id: 1,
        titulo: 'Nueva Expansión de Wingspan Disponible',
        fecha: '2025-01-10',
        categoria: 'Novedades',
        resumen: 'Ya está disponible en nuestra asociación la nueva expansión de Wingspan: Aves de Asia.',
        emoji: '🦅'
    },
    {
        id: 2,
        titulo: 'Torneo de Magic Clasificatorio',
        fecha: '2025-01-08',
        categoria: 'Torneos',
        resumen: 'Inscripciones abiertas para el torneo clasificatorio regional de Magic: The Gathering.',
        emoji: '🏆'
    },
    {
        id: 3,
        titulo: 'Nuevos Horarios de Apertura',
        fecha: '2025-01-05',
        categoria: 'Anuncios',
        resumen: 'A partir de febrero, abriremos también los domingos por la mañana de 10:00 a 14:00.',
        emoji: '📅'
    },
    {
        id: 4,
        titulo: 'Taller de Pintura de Miniaturas',
        fecha: '2025-01-03',
        categoria: 'Talleres',
        resumen: 'Aprende técnicas básicas de pintura de miniaturas con expertos de la comunidad.',
        emoji: '🎨'
    },
];

export default function NoticiasPage() {
    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.header}>
                    <h1>Noticias y Anuncios</h1>
                    <p className={styles.subtitle}>
                        Mantente informado sobre las últimas novedades de la asociación
                    </p>
                </div>

                <div className={styles.filters}>
                    <select className="form-select">
                        <option>Todas las categorías</option>
                        <option>Novedades</option>
                        <option>Torneos</option>
                        <option>Anuncios</option>
                        <option>Talleres</option>
                    </select>
                </div>

                <div className={styles.grid}>
                    {NOTICIAS_DEMO.map((noticia) => (
                        <div key={noticia.id} className={`card ${styles.card}`}>
                            <div className={styles.cardImage}>{noticia.emoji}</div>
                            <div className={styles.cardContent}>
                                <h3>{noticia.titulo}</h3>
                                <div className={styles.cardMeta}>
                                    <span className="badge badge-accent">{noticia.categoria}</span>
                                    <span className={styles.cardInfo}>
                                        📅 {new Date(noticia.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                <p>{noticia.resumen}</p>
                                <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                                    Leer Más
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
