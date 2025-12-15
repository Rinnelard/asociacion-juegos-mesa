'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';
import { gamesDB, eventsDB, newsDB, statsDB, type Game, type Event, type News } from '@/lib/db';
import styles from './admin.module.css';

export default function AdminPage() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'stats' | 'games' | 'events' | 'news'>('stats');
    const [stats, setStats] = useState(statsDB.getStats());
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    useEffect(() => {
        if (!user || user.rol !== 'admin') {
            showToast('Acceso denegado', 'error');
            router.push('/');
        }
    }, [user, router]);

    const refreshStats = () => {
        setStats(statsDB.getStats());
    };

    // ========== GAMES CRUD ==========
    const [gameForm, setGameForm] = useState({
        nombre: '',
        descripcion: '',
        imagen: '',
        jugadores: '',
        duracion: '',
        dificultad: 'Media' as Game['dificultad'],
        categoria: '',
        disponible: true,
    });

    const handleCreateGame = () => {
        if (!gameForm.nombre || !gameForm.descripcion) {
            showToast('Completa los campos obligatorios', 'warning');
            return;
        }

        gamesDB.create({
            ...gameForm,
            valoraciones: [],
            puntuacionMedia: 0,
        });

        showToast('Juego creado exitosamente', 'success');
        resetGameForm();
        setShowModal(false);
        refreshStats();
    };

    const handleUpdateGame = () => {
        if (!editingItem) return;

        gamesDB.update(editingItem.id, gameForm);
        showToast('Juego actualizado', 'success');
        resetGameForm();
        setShowModal(false);
        setEditingItem(null);
        refreshStats();
    };

    const handleDeleteGame = (id: string) => {
        if (confirm('¿Seguro que quieres eliminar este juego?')) {
            gamesDB.delete(id);
            showToast('Juego eliminado', 'success');
            refreshStats();
        }
    };

    const resetGameForm = () => {
        setGameForm({
            nombre: '',
            descripcion: '',
            imagen: '',
            jugadores: '',
            duracion: '',
            dificultad: 'Media',
            categoria: '',
            disponible: true,
        });
    };

    const openGameModal = (game?: Game) => {
        if (game) {
            setEditingItem(game);
            setGameForm({
                nombre: game.nombre,
                descripcion: game.descripcion,
                imagen: game.imagen,
                jugadores: game.jugadores,
                duracion: game.duracion,
                dificultad: game.dificultad,
                categoria: game.categoria,
                disponible: game.disponible,
            });
        } else {
            setEditingItem(null);
            resetGameForm();
        }
        setShowModal(true);
        setActiveTab('games');
    };

    // ========== EVENTS CRUD ==========
    const [eventForm, setEventForm] = useState({
        titulo: '',
        descripcion: '',
        fecha: '',
        hora: '',
        lugar: '',
        imagen: '',
        capacidadMaxima: 10,
        tipo: 'Meetup' as Event['tipo'],
    });

    const handleCreateEvent = () => {
        if (!eventForm.titulo || !eventForm.fecha) {
            showToast('Completa los campos obligatorios', 'warning');
            return;
        }

        eventsDB.create({
            ...eventForm,
            inscritos: [],
        });

        showToast('Evento creado exitosamente', 'success');
        resetEventForm();
        setShowModal(false);
        refreshStats();
    };

    const handleUpdateEvent = () => {
        if (!editingItem) return;

        const event = eventsDB.getById(editingItem.id);
        eventsDB.update(editingItem.id, {
            ...eventForm,
            inscritos: event?.inscritos || [],
        });

        showToast('Evento actualizado', 'success');
        resetEventForm();
        setShowModal(false);
        setEditingItem(null);
        refreshStats();
    };

    const handleDeleteEvent = (id: string) => {
        if (confirm('¿Seguro que quieres eliminar este evento?')) {
            eventsDB.delete(id);
            showToast('Evento eliminado', 'success');
            refreshStats();
        }
    };

    const resetEventForm = () => {
        setEventForm({
            titulo: '',
            descripcion: '',
            fecha: '',
            hora: '',
            lugar: '',
            imagen: '',
            capacidadMaxima: 10,
            tipo: 'Meetup',
        });
    };

    const openEventModal = (event?: Event) => {
        if (event) {
            setEditingItem(event);
            setEventForm({
                titulo: event.titulo,
                descripcion: event.descripcion,
                fecha: event.fecha,
                hora: event.hora,
                lugar: event.lugar,
                imagen: event.imagen,
                capacidadMaxima: event.capacidadMaxima,
                tipo: event.tipo,
            });
        } else {
            setEditingItem(null);
            resetEventForm();
        }
        setShowModal(true);
        setActiveTab('events');
    };

    // ========== NEWS CRUD ==========
    const [newsForm, setNewsForm] = useState({
        titulo: '',
        contenido: '',
        extracto: '',
        imagen: '',
        autor: user?.nombre || 'Admin',
        categoria: 'Novedades',
    });

    const handleCreateNews = () => {
        if (!newsForm.titulo || !newsForm.contenido) {
            showToast('Completa los campos obligatorios', 'warning');
            return;
        }

        newsDB.create({
            ...newsForm,
            fecha: new Date().toISOString().split('T')[0],
        });

        showToast('Noticia creada exitosamente', 'success');
        resetNewsForm();
        setShowModal(false);
        refreshStats();
    };

    const handleUpdateNews = () => {
        if (!editingItem) return;

        newsDB.update(editingItem.id, newsForm);
        showToast('Noticia actualizada', 'success');
        resetNewsForm();
        setShowModal(false);
        setEditingItem(null);
        refreshStats();
    };

    const handleDeleteNews = (id: string) => {
        if (confirm('¿Seguro que quieres eliminar esta noticia?')) {
            newsDB.delete(id);
            showToast('Noticia eliminada', 'success');
            refreshStats();
        }
    };

    const resetNewsForm = () => {
        setNewsForm({
            titulo: '',
            contenido: '',
            extracto: '',
            imagen: '',
            autor: user?.nombre || 'Admin',
            categoria: 'Novedades',
        });
    };

    const openNewsModal = (news?: News) => {
        if (news) {
            setEditingItem(news);
            setNewsForm({
                titulo: news.titulo,
                contenido: news.contenido,
                extracto: news.extracto,
                imagen: news.imagen,
                autor: news.autor,
                categoria: news.categoria,
            });
        } else {
            setEditingItem(null);
            resetNewsForm();
        }
        setShowModal(true);
        setActiveTab('news');
    };

    if (!user || user.rol !== 'admin') return null;

    return (
        <div className={styles.container}>
            <section className={styles.header}>
                <h1 className={styles.title}>Panel de Administración</h1>
                <p className={styles.subtitle}>Gestiona juegos, eventos y noticias</p>
            </section>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    onClick={() => setActiveTab('stats')}
                    className={`${styles.tab} ${activeTab === 'stats' ? styles.tabActive : ''}`}
                >
                    📊 Estadísticas
                </button>
                <button
                    onClick={() => setActiveTab('games')}
                    className={`${styles.tab} ${activeTab === 'games' ? styles.tabActive : ''}`}
                >
                    🎮 Juegos
                </button>
                <button
                    onClick={() => setActiveTab('events')}
                    className={`${styles.tab} ${activeTab === 'events' ? styles.tabActive : ''}`}
                >
                    📅 Eventos
                </button>
                <button
                    onClick={() => setActiveTab('news')}
                    className={`${styles.tab} ${activeTab === 'news' ? styles.tabActive : ''}`}
                >
                    📰 Noticias
                </button>
            </div>

            <div className={styles.content}>
                {/* STATS TAB */}
                {activeTab === 'stats' && (
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{stats.totalGames}</span>
                            <span className={styles.statLabel}>Total Juegos</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{stats.availableGames}</span>
                            <span className={styles.statLabel}>Disponibles</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{stats.reservedGames}</span>
                            <span className={styles.statLabel}>Reservados</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{stats.totalEvents}</span>
                            <span className={styles.statLabel}>Total Eventos</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{stats.upcomingEvents}</span>
                            <span className={styles.statLabel}>Próximos</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{stats.totalInscriptions}</span>
                            <span className={styles.statLabel}>Inscripciones</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{stats.totalUsers}</span>
                            <span className={styles.statLabel}>Usuarios</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statValue}>{stats.totalNews}</span>
                            <span className={styles.statLabel}>Noticias</span>
                        </div>
                    </div>
                )}

                {/* GAMES TAB */}
                {activeTab === 'games' && (
                    <div>
                        <div className={styles.tabHeader}>
                            <h2>Gestión de Juegos</h2>
                            <button onClick={() => openGameModal()} className={styles.btnAdd}>
                                + Nuevo Juego
                            </button>
                        </div>

                        <div className={styles.itemsGrid}>
                            {gamesDB.getAll().map(game => (
                                <div key={game.id} className={styles.itemCard}>
                                    <img src={game.imagen} alt={game.nombre} className={styles.itemImage} />
                                    <div className={styles.itemContent}>
                                        <h3>{game.nombre}</h3>
                                        <p className={styles.itemCategory}>{game.categoria}</p>
                                        <p className={styles.itemStatus}>
                                            {game.disponible ? '✅ Disponible' : '🔒 Reservado'}
                                        </p>
                                        <div className={styles.itemActions}>
                                            <button onClick={() => openGameModal(game)} className={styles.btnEdit}>
                                                ✏️
                                            </button>
                                            <button onClick={() => handleDeleteGame(game.id)} className={styles.btnDelete}>
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* EVENTS TAB */}
                {activeTab === 'events' && (
                    <div>
                        <div className={styles.tabHeader}>
                            <h2>Gestión de Eventos</h2>
                            <button onClick={() => openEventModal()} className={styles.btnAdd}>
                                + Nuevo Evento
                            </button>
                        </div>

                        <div className={styles.itemsGrid}>
                            {eventsDB.getAll().map(event => (
                                <div key={event.id} className={styles.itemCard}>
                                    <img src={event.imagen} alt={event.titulo} className={styles.itemImage} />
                                    <div className={styles.itemContent}>
                                        <h3>{event.titulo}</h3>
                                        <p className={styles.itemCategory}>{event.tipo}</p>
                                        <p className={styles.itemInfo}>📅 {event.fecha} - {event.hora}</p>
                                        <p className={styles.itemInfo}>
                                            👥 {event.inscritos.length}/{event.capacidadMaxima}
                                        </p>
                                        <div className={styles.itemActions}>
                                            <button onClick={() => openEventModal(event)} className={styles.btnEdit}>
                                                ✏️
                                            </button>
                                            <button onClick={() => handleDeleteEvent(event.id)} className={styles.btnDelete}>
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* NEWS TAB */}
                {activeTab === 'news' && (
                    <div>
                        <div className={styles.tabHeader}>
                            <h2>Gestión de Noticias</h2>
                            <button onClick={() => openNewsModal()} className={styles.btnAdd}>
                                + Nueva Noticia
                            </button>
                        </div>

                        <div className={styles.itemsList}>
                            {newsDB.getAll().map(news => (
                                <div key={news.id} className={styles.newsItem}>
                                    <div className={styles.newsImage}>
                                        <img src={news.imagen} alt={news.titulo} />
                                    </div>
                                    <div className={styles.newsContent}>
                                        <h3>{news.titulo}</h3>
                                        <p className={styles.newsExtract}>{news.extracto}</p>
                                        <div className={styles.newsMeta}>
                                            <span>{news.categoria}</span>
                                            <span>•</span>
                                            <span>{news.fecha}</span>
                                            <span>•</span>
                                            <span>Por {news.autor}</span>
                                        </div>
                                    </div>
                                    <div className={styles.newsActions}>
                                        <button onClick={() => openNewsModal(news)} className={styles.btnEdit}>
                                            ✏️ Editar
                                        </button>
                                        <button onClick={() => handleDeleteNews(news.id)} className={styles.btnDelete}>
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL */}
            {showModal && (
                <div className={styles.modal} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        {activeTab === 'games' && (
                            <>
                                <h2>{editingItem ? 'Editar Juego' : 'Nuevo Juego'}</h2>
                                <div className={styles.form}>
                                    <input
                                        type="text"
                                        placeholder="Nombre *"
                                        value={gameForm.nombre}
                                        onChange={e => setGameForm({ ...gameForm, nombre: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Descripción *"
                                        value={gameForm.descripcion}
                                        onChange={e => setGameForm({ ...gameForm, descripcion: e.target.value })}
                                        rows={3}
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL de imagen"
                                        value={gameForm.imagen}
                                        onChange={e => setGameForm({ ...gameForm, imagen: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Jugadores (ej: 2-4)"
                                        value={gameForm.jugadores}
                                        onChange={e => setGameForm({ ...gameForm, jugadores: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Duración (ej: 60 min)"
                                        value={gameForm.duracion}
                                        onChange={e => setGameForm({ ...gameForm, duracion: e.target.value })}
                                    />
                                    <select
                                        value={gameForm.dificultad}
                                        onChange={e => setGameForm({ ...gameForm, dificultad: e.target.value as Game['dificultad'] })}
                                    >
                                        <option value="Fácil">Fácil</option>
                                        <option value="Media">Media</option>
                                        <option value="Difícil">Difícil</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Categoría"
                                        value={gameForm.categoria}
                                        onChange={e => setGameForm({ ...gameForm, categoria: e.target.value })}
                                    />
                                    <label className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={gameForm.disponible}
                                            onChange={e => setGameForm({ ...gameForm, disponible: e.target.checked })}
                                        />
                                        <span>Disponible</span>
                                    </label>
                                    <div className={styles.modalActions}>
                                        <button onClick={editingItem ? handleUpdateGame : handleCreateGame} className={styles.btnSave}>
                                            {editingItem ? 'Actualizar' : 'Crear'}
                                        </button>
                                        <button onClick={() => setShowModal(false)} className={styles.btnCancel}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'events' && (
                            <>
                                <h2>{editingItem ? 'Editar Evento' : 'Nuevo Evento'}</h2>
                                <div className={styles.form}>
                                    <input
                                        type="text"
                                        placeholder="Título *"
                                        value={eventForm.titulo}
                                        onChange={e => setEventForm({ ...eventForm, titulo: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Descripción *"
                                        value={eventForm.descripcion}
                                        onChange={e => setEventForm({ ...eventForm, descripcion: e.target.value })}
                                        rows={3}
                                    />
                                    <input
                                        type="date"
                                        value={eventForm.fecha}
                                        onChange={e => setEventForm({ ...eventForm, fecha: e.target.value })}
                                    />
                                    <input
                                        type="time"
                                        value={eventForm.hora}
                                        onChange={e => setEventForm({ ...eventForm, hora: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Lugar"
                                        value={eventForm.lugar}
                                        onChange={e => setEventForm({ ...eventForm, lugar: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL de imagen"
                                        value={eventForm.imagen}
                                        onChange={e => setEventForm({ ...eventForm, imagen: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Capacidad máxima"
                                        value={eventForm.capacidadMaxima}
                                        onChange={e => setEventForm({ ...eventForm, capacidadMaxima: parseInt(e.target.value) })}
                                    />
                                    <select
                                        value={eventForm.tipo}
                                        onChange={e => setEventForm({ ...eventForm, tipo: e.target.value as Event['tipo'] })}
                                    >
                                        <option value="Torneo">Torneo</option>
                                        <option value="Taller">Taller</option>
                                        <option value="Meetup">Meetup</option>
                                        <option value="Especial">Especial</option>
                                    </select>
                                    <div className={styles.modalActions}>
                                        <button onClick={editingItem ? handleUpdateEvent : handleCreateEvent} className={styles.btnSave}>
                                            {editingItem ? 'Actualizar' : 'Crear'}
                                        </button>
                                        <button onClick={() => setShowModal(false)} className={styles.btnCancel}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'news' && (
                            <>
                                <h2>{editingItem ? 'Editar Noticia' : 'Nueva Noticia'}</h2>
                                <div className={styles.form}>
                                    <input
                                        type="text"
                                        placeholder="Título *"
                                        value={newsForm.titulo}
                                        onChange={e => setNewsForm({ ...newsForm, titulo: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Extracto"
                                        value={newsForm.extracto}
                                        onChange={e => setNewsForm({ ...newsForm, extracto: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Contenido *"
                                        value={newsForm.contenido}
                                        onChange={e => setNewsForm({ ...newsForm, contenido: e.target.value })}
                                        rows={5}
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL de imagen"
                                        value={newsForm.imagen}
                                        onChange={e => setNewsForm({ ...newsForm, imagen: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Categoría"
                                        value={newsForm.categoria}
                                        onChange={e => setNewsForm({ ...newsForm, categoria: e.target.value })}
                                    />
                                    <div className={styles.modalActions}>
                                        <button onClick={editingItem ? handleUpdateNews : handleCreateNews} className={styles.btnSave}>
                                            {editingItem ? 'Actualizar' : 'Crear'}
                                        </button>
                                        <button onClick={() => setShowModal(false)} className={styles.btnCancel}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
