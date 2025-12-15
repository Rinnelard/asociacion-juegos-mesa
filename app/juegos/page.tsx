'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { gamesDB, usersDB, type Game } from '@/lib/db';
import styles from './juegos.module.css';

export default function JuegosPage() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [games, setGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [selectedDifficulty, setSelectedDifficulty] = useState('Todas');
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        loadGames();
    }, []);

    useEffect(() => {
        filterGames();
    }, [games, searchTerm, selectedCategory, selectedDifficulty, onlyAvailable]);

    const loadGames = () => {
        const allGames = gamesDB.getAll();
        setGames(allGames);
    };

    const filterGames = () => {
        let filtered = [...games];

        // Búsqueda por nombre
        if (searchTerm) {
            filtered = filtered.filter(game =>
                game.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtro por categoría
        if (selectedCategory !== 'Todas') {
            filtered = filtered.filter(game => game.categoria === selectedCategory);
        }

        // Filtro por dificultad
        if (selectedDifficulty !== 'Todas') {
            filtered = filtered.filter(game => game.dificultad === selectedDifficulty);
        }

        // Filtro solo disponibles
        if (onlyAvailable) {
            filtered = filtered.filter(game => game.disponible);
        }

        setFilteredGames(filtered);
    };

    const handleReservar = (game: Game) => {
        if (!user) {
            showToast('Debes iniciar sesión para reservar juegos', 'warning');
            return;
        }

        if (!game.disponible) {
            showToast('Este juego ya está reservado', 'error');
            return;
        }

        const success = usersDB.reservarJuego(user.id, game.id);
        if (success) {
            showToast(`¡Has reservado "${game.nombre}" exitosamente!`, 'success');
            loadGames();
        } else {
            showToast('No se pudo reservar el juego', 'error');
        }
    };

    const handleDevolver = (game: Game) => {
        if (!user) return;

        const success = usersDB.devolverJuego(user.id, game.id);
        if (success) {
            showToast(`Has devuelto "${game.nombre}"`, 'success');
            loadGames();
        } else {
            showToast('No se pudo devolver el juego', 'error');
        }
    };

    const handleRating = (game: Game) => {
        if (!user) {
            showToast('Debes iniciar sesión para valorar juegos', 'warning');
            return;
        }
        setSelectedGame(game);
        setRating(5);
        setComment('');
        setShowRatingModal(true);
    };

    const submitRating = () => {
        if (!selectedGame || !user) return;

        const success = gamesDB.addRating(selectedGame.id, user.id, rating, comment);
        if (success) {
            showToast('¡Valoración enviada!', 'success');
            loadGames();
            setShowRatingModal(false);
        } else {
            showToast('Error al enviar la valoración', 'error');
        }
    };

    const categories = ['Todas', ...new Set(games.map(g => g.categoria))];
    const difficulties = ['Todas', 'Fácil', 'Media', 'Difícil'];

    const userReservedGames = user?.juegosReservados || [];

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.title}>Catálogo de Juegos</h1>
                <p className={styles.subtitle}>
                    Explora nuestra colección de {games.length} juegos de mesa
                </p>
            </section>

            {/* Filtros y Búsqueda */}
            <section className={styles.filters}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="🔍 Buscar juegos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filterRow}>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={styles.select}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className={styles.select}
                    >
                        {difficulties.map(diff => (
                            <option key={diff} value={diff}>{diff}</option>
                        ))}
                    </select>

                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={onlyAvailable}
                            onChange={(e) => setOnlyAvailable(e.target.checked)}
                        />
                        <span>Solo disponibles</span>
                    </label>
                </div>

                <div className={styles.resultsInfo}>
                    Mostrando {filteredGames.length} de {games.length} juegos
                </div>
            </section>

            {/* Grid de Juegos */}
            <section className={styles.gamesGrid}>
                {filteredGames.map((game) => {
                    const isReservedByUser = userReservedGames.includes(game.id);
                    const userRating = game.valoraciones.find(v => v.usuarioId === user?.id);

                    return (
                        <div key={game.id} className={styles.gameCard}>
                            <div className={styles.gameImage}>
                                <img src={game.imagen} alt={game.nombre} />
                                {!game.disponible && (
                                    <div className={styles.reservedBadge}>
                                        {isReservedByUser ? '✓ Tuyo' : 'Reservado'}
                                    </div>
                                )}
                            </div>

                            <div className={styles.gameContent}>
                                <h3 className={styles.gameName}>{game.nombre}</h3>
                                <p className={styles.gameDescription}>{game.descripcion}</p>

                                <div className={styles.gameInfo}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}>👥</span>
                                        <span>{game.jugadores}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}>⏱️</span>
                                        <span>{game.duracion}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}>📊</span>
                                        <span>{game.dificultad}</span>
                                    </div>
                                </div>

                                <div className={styles.gameCategory}>
                                    {game.categoria}
                                </div>

                                {game.puntuacionMedia > 0 && (
                                    <div className={styles.rating}>
                                        <span className={styles.stars}>
                                            {'⭐'.repeat(Math.round(game.puntuacionMedia))}
                                        </span>
                                        <span className={styles.ratingValue}>
                                            {game.puntuacionMedia.toFixed(1)} ({game.valoraciones.length})
                                        </span>
                                    </div>
                                )}

                                <div className={styles.gameActions}>
                                    {isReservedByUser ? (
                                        <button
                                            onClick={() => handleDevolver(game)}
                                            className={`${styles.btn} ${styles.btnReturn}`}
                                        >
                                            Devolver Juego
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleReservar(game)}
                                            disabled={!game.disponible}
                                            className={`${styles.btn} ${styles.btnReserve}`}
                                        >
                                            {game.disponible ? 'Reservar' : 'No disponible'}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleRating(game)}
                                        className={`${styles.btn} ${styles.btnRate}`}
                                        title={userRating ? 'Actualizar valoración' : 'Valorar'}
                                    >
                                        {userRating ? '⭐ Editar' : '⭐ Valorar'}
                                    </button>
                                </div>

                                {/* Mostrar valoraciones */}
                                {game.valoraciones.length > 0 && (
                                    <details className={styles.reviews}>
                                        <summary>Ver {game.valoraciones.length} valoraciones</summary>
                                        <div className={styles.reviewsList}>
                                            {game.valoraciones.slice(0, 3).map((val, idx) => {
                                                const userInfo = usersDB.getById(val.usuarioId);
                                                return (
                                                    <div key={idx} className={styles.review}>
                                                        <div className={styles.reviewHeader}>
                                                            <strong>{userInfo?.nombre || 'Usuario'}</strong>
                                                            <span className={styles.reviewStars}>
                                                                {'⭐'.repeat(val.puntuacion)}
                                                            </span>
                                                        </div>
                                                        {val.comentario && (
                                                            <p className={styles.reviewComment}>{val.comentario}</p>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </details>
                                )}
                            </div>
                        </div>
                    );
                })}
            </section>

            {filteredGames.length === 0 && (
                <div className={styles.noResults}>
                    <p>No se encontraron juegos con los filtros aplicados.</p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('Todas');
                            setSelectedDifficulty('Todas');
                            setOnlyAvailable(false);
                        }}
                        className={styles.btnClearFilters}
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}

            {/* Modal de Valoración */}
            {showRatingModal && selectedGame && (
                <div className={styles.modal} onClick={() => setShowRatingModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2>Valorar "{selectedGame.nombre}"</h2>

                        <div className={styles.ratingInput}>
                            <label>Puntuación:</label>
                            <div className={styles.starSelector}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={star <= rating ? styles.starActive : styles.starInactive}
                                    >
                                        ⭐
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.commentInput}>
                            <label>Comentario (opcional):</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Comparte tu opinión sobre este juego..."
                                rows={4}
                            />
                        </div>

                        <div className={styles.modalActions}>
                            <button onClick={submitRating} className={styles.btnSubmit}>
                                Enviar Valoración
                            </button>
                            <button onClick={() => setShowRatingModal(false)} className={styles.btnCancel}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
