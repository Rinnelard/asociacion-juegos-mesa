'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { eventsDB, type Event } from '@/lib/db';
import styles from './eventos.module.css';

export default function EventosPage() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [events, setEvents] = useState<Event[]>([]);
    const [filter, setFilter] = useState<'todos' | 'proximos' | 'inscritos'>('proximos');

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = () => {
        const allEvents = eventsDB.getAll();
        setEvents(allEvents);
    };

    const handleInscribirse = (event: Event) => {
        if (!user) {
            showToast('Debes iniciar sesión para inscribirte', 'warning');
            return;
        }

        if (event.inscritos.includes(user.id)) {
            showToast('Ya estás inscrito en este evento', 'info');
            return;
        }

        if (event.inscritos.length >= event.capacidadMaxima) {
            showToast('Este evento está lleno', 'error');
            return;
        }

        const success = eventsDB.inscribirse(event.id, user.id);
        if (success) {
            showToast(`¡Te has inscrito a "${event.titulo}"!`, 'success');
            loadEvents();
        } else {
            showToast('No se pudo completar la inscripción', 'error');
        }
    };

    const handleDesinscribirse = (event: Event) => {
        if (!user) return;

        const success = eventsDB.desinscribirse(event.id, user.id);
        if (success) {
            showToast(`Te has desinscrito de "${event.titulo}"`, 'success');
            loadEvents();
        } else {
            showToast('No se pudo completar la desinscripción', 'error');
        }
    };

    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.fecha);
        const today = new Date();
        const isUpcoming = eventDate >= today;
        const isUserInscrito = user && event.inscritos.includes(user.id);

        if (filter === 'proximos') return isUpcoming;
        if (filter === 'inscritos') return isUserInscrito;
        return true;
    });

    const sortedEvents = [...filteredEvents].sort((a, b) => {
        return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    });

    const getEventTypeColor = (type: Event['tipo']) => {
        switch (type) {
            case 'Torneo': return 'hsl(var(--accent-hue), 70%, 50%)';
            case 'Taller': return 'hsl(120, 50%, 45%)';
            case 'Meetup': return 'hsl(200, 60%, 50%)';
            case 'Especial': return 'hsl(280, 60%, 55%)';
            default: return 'hsl(var(--primary-hue), 50%, 40%)';
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.title}>Eventos y Actividades</h1>
                <p className={styles.subtitle}>
                    Participa en torneos, talleres y reuniones con la comunidad
                </p>
            </section>

            {/* Filtros */}
            <section className={styles.filters}>
                <button
                    onClick={() => setFilter('proximos')}
                    className={`${styles.filterBtn} ${filter === 'proximos' ? styles.filterActive : ''}`}
                >
                    📅 Próximos Eventos
                </button>
                <button
                    onClick={() => setFilter('todos')}
                    className={`${styles.filterBtn} ${filter === 'todos' ? styles.filterActive : ''}`}
                >
                    🎯 Todos
                </button>
                {user && (
                    <button
                        onClick={() => setFilter('inscritos')}
                        className={`${styles.filterBtn} ${filter === 'inscritos' ? styles.filterActive : ''}`}
                    >
                        ✓ Mis Inscripciones
                    </button>
                )}
            </section>

            {/* Stats */}
            <section className={styles.stats}>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{sortedEvents.length}</span>
                    <span className={styles.statLabel}>Eventos</span>
                </div>
                {user && (
                    <>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>
                                {events.filter(e => e.inscritos.includes(user.id)).length}
                            </span>
                            <span className={styles.statLabel}>Inscritos</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>
                                {events.reduce((sum, e) => sum + (e.inscritos.includes(user.id) ? 1 : 0), 0)}
                            </span>
                            <span className={styles.statLabel}>Participaciones</span>
                        </div>
                    </>
                )}
            </section>

            {/* Grid de Eventos */}
            <section className={styles.eventsGrid}>
                {sortedEvents.map((event) => {
                    const isUserInscrito = user && event.inscritos.includes(user.id);
                    const plazasDisponibles = event.capacidadMaxima - event.inscritos.length;
                    const porcentajeLleno = (event.inscritos.length / event.capacidadMaxima) * 100;
                    const eventDate = new Date(event.fecha);
                    const isPast = eventDate < new Date();

                    return (
                        <div key={event.id} className={styles.eventCard}>
                            <div className={styles.eventImage}>
                                <img src={event.imagen} alt={event.titulo} />
                                <div
                                    className={styles.eventType}
                                    style={{ background: getEventTypeColor(event.tipo) }}
                                >
                                    {event.tipo}
                                </div>
                                {isPast && (
                                    <div className={styles.pastBadge}>Finalizado</div>
                                )}
                            </div>

                            <div className={styles.eventContent}>
                                <h3 className={styles.eventTitle}>{event.titulo}</h3>
                                <p className={styles.eventDescription}>{event.descripcion}</p>

                                <div className={styles.eventDetails}>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailIcon}>📅</span>
                                        <span>{formatDate(event.fecha)}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailIcon}>🕐</span>
                                        <span>{event.hora}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailIcon}>📍</span>
                                        <span>{event.lugar}</span>
                                    </div>
                                </div>

                                {/* Barra de capacidad */}
                                <div className={styles.capacity}>
                                    <div className={styles.capacityHeader}>
                                        <span>
                                            {event.inscritos.length} / {event.capacidadMaxima} inscritos
                                        </span>
                                        <span>
                                            {plazasDisponibles} plazas
                                        </span>
                                    </div>
                                    <div className={styles.capacityBar}>
                                        <div
                                            className={styles.capacityFill}
                                            style={{
                                                width: `${porcentajeLleno}%`,
                                                background: porcentajeLleno >= 100 ? 'hsl(0, 70%, 50%)' :
                                                    porcentajeLleno >= 80 ? 'hsl(40, 80%, 50%)' :
                                                        'hsl(120, 60%, 45%)'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Acciones */}
                                <div className={styles.eventActions}>
                                    {!user ? (
                                        <button className={`${styles.btn} ${styles.btnDisabled}`} disabled>
                                            Inicia sesión para inscribirte
                                        </button>
                                    ) : isPast ? (
                                        <button className={`${styles.btn} ${styles.btnDisabled}`} disabled>
                                            Evento finalizado
                                        </button>
                                    ) : isUserInscrito ? (
                                        <button
                                            onClick={() => handleDesinscribirse(event)}
                                            className={`${styles.btn} ${styles.btnUninscribe}`}
                                        >
                                            ✓ Inscrito - Cancelar
                                        </button>
                                    ) : plazasDisponibles > 0 ? (
                                        <button
                                            onClick={() => handleInscribirse(event)}
                                            className={`${styles.btn} ${styles.btnInscribe}`}
                                        >
                                            Inscribirse ahora
                                        </button>
                                    ) : (
                                        <button className={`${styles.btn} ${styles.btnFull}`} disabled>
                                            Evento lleno
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {sortedEvents.length === 0 && (
                <div className={styles.noEvents}>
                    <p>
                        {filter === 'inscritos'
                            ? 'No estás inscrito en ningún evento todavía.'
                            : 'No hay eventos disponibles con este filtro.'}
                    </p>
                </div>
            )}
        </div>
    );
}
