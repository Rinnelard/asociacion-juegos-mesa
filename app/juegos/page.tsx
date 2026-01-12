'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { gamesDB, usersDB } from '@/lib/db';
import { Game } from '@/lib/types';
import styles from './juegos.module.css';

export default function JuegosPage() {
    const { user } = useAuth();
    const { showToast } = useToast();

    const [games, setGames] = useState<Game[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('Todas');
    const [difficulty, setDifficulty] = useState('Todas');
    const [onlyAvailable, setOnlyAvailable] = useState(false);

    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [modals, setModals] = useState({ rating: false, reserve: false });

    const [reservaDate, setReservaDate] = useState(new Date().toISOString().split('T')[0]);
    const [todoElDia, setTodoElDia] = useState(true);
    const [selectedHorarios, setSelectedHorarios] = useState<string[]>([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => { loadData(); }, []);

    const loadData = () => {
        setGames(gamesDB.getAll());
    };

    const filteredGames = useMemo(() => {
        return games.filter(game => {
            const matchesSearch = !searchTerm ||
                game.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = category === 'Todas' || game.categoria === category;
            const matchesDifficulty = difficulty === 'Todas' || game.dificultad === difficulty;
            const matchesAvailability = !onlyAvailable || game.disponible;

            return matchesSearch && matchesCategory && matchesDifficulty && matchesAvailability;
        });
    }, [games, searchTerm, category, difficulty, onlyAvailable]);

    const handleReserveInit = (game: Game) => {
        if (!user) return showToast('Inicia sesión para reservar', 'warning');
        if (!game.disponible) return showToast('No disponible', 'error');

        setSelectedGame(game);
        setReservaDate(new Date().toISOString().split('T')[0]);
        setTodoElDia(true);
        setSelectedHorarios([]);
        setModals(m => ({ ...m, reserve: true }));
    };

    const onConfirmReservation = () => {
        if (!selectedGame || !user) return;
        if (!todoElDia && selectedHorarios.length === 0) {
            return showToast('Elige al menos un tramo horario', 'warning');
        }

        const ok = usersDB.reservarJuego(user.id, selectedGame.id, reservaDate, todoElDia, todoElDia ? undefined : selectedHorarios);

        if (ok) {
            showToast(`¡Reserva confirmada!`, 'success');
            loadData();
            setModals(m => ({ ...m, reserve: false }));
        } else {
            showToast('Horario ocupado para este día', 'error');
        }
    };

    const handleReturn = (game: Game, resId?: string) => {
        if (!user) return;
        if (usersDB.devolverJuego(user.id, game.id, resId)) {
            showToast(`Devuelto: ${game.nombre}`, 'success');
            loadData();
        }
    };

    const handleRatingInit = (game: Game) => {
        if (!user) return showToast('Inicia sesión para valorar', 'warning');
        setSelectedGame(game);
        setRating(5);
        setComment('');
        setModals(m => ({ ...m, rating: true }));
    };

    const onRatingSubmit = () => {
        if (!selectedGame || !user) return;
        if (gamesDB.addRating(selectedGame.id, user.id, rating, comment)) {
            showToast('¡Gracias por tu valoración!', 'success');
            loadData();
            setModals(m => ({ ...m, rating: false }));
        }
    };

    const categories = ['Todas', ...new Set(games.map(g => g.categoria))];
    const difficulties = ['Todas', 'Fácil', 'Media', 'Difícil'];

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.title}>Catálogo de Juegos</h1>
                <p className={styles.subtitle}>Explora la colección oficial de Noctis Ciudad de Juegos.</p>
            </section>

            <section className={styles.canvaSection}>
                <h2 className={styles.sectionTitle}>Nuestros Catálogos en Canva</h2>
                <div className={styles.canvaGrid}>
                    {[
                        { icon: '🎲', title: 'Juegos de Mesa', desc: 'Ludoteca física completa.' },
                        { icon: '⚔️', title: 'Miniaturas', desc: 'Ejércitos y escenografía.' },
                        { icon: '📜', title: 'Libros de Rol', desc: 'Manuales y sistemas.' }
                    ].map(card => (
                        <a key={card.title} href="#" target="_blank" className={styles.canvaCard}>
                            <span className={styles.canvaIcon}>{card.icon}</span>
                            <div className={styles.canvaText}>
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            <section className={styles.filters}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="🔍 Buscar por nombre o descripción..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filterRow}>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.select}>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={styles.select}>
                        {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>

                    <label className={styles.checkbox}>
                        <input type="checkbox" checked={onlyAvailable} onChange={(e) => setOnlyAvailable(e.target.checked)} />
                        <span>Solo disponibles</span>
                    </label>
                </div>
                <div className={styles.resultsInfo}>
                    Encontrados {filteredGames.length} títulos
                </div>
            </section>

            <section className={styles.gamesGrid}>
                {filteredGames.map((game) => {
                    const myRes = (game.reservas || []).filter(r => r.usuarioId === user?.id);
                    const isReservedByMe = myRes.length > 0;
                    const userRating = game.valoraciones.find(v => v.usuarioId === user?.id);

                    return (
                        <div key={game.id} className={styles.gameCard}>
                            <div className={styles.gameImage}>
                                <img src={game.imagen} alt={game.nombre} />
                                {!game.disponible && (
                                    <div className={styles.reservedBadge}>
                                        {isReservedByMe ? '✓ Tuyo' : 'Reservado'}
                                    </div>
                                )}
                            </div>

                            <div className={styles.gameContent}>
                                <h3 className={styles.gameName}>{game.nombre}</h3>
                                <p className={styles.gameDescription}>{game.descripcion}</p>

                                <div className={styles.gameInfo}>
                                    <div className={styles.infoItem}><span>👥</span> {game.jugadores}</div>
                                    <div className={styles.infoItem}><span>⏱️</span> {game.duracion}</div>
                                    <div className={styles.infoItem}><span>📊</span> {game.dificultad}</div>
                                </div>

                                <div className={styles.gameCategory}>{game.categoria}</div>

                                {game.puntuacionMedia > 0 && (
                                    <div className={styles.rating}>
                                        <span className={styles.stars}>{'⭐'.repeat(Math.round(game.puntuacionMedia))}</span>
                                        <span className={styles.ratingValue}>
                                            {game.puntuacionMedia.toFixed(1)} ({game.valoraciones.length})
                                        </span>
                                    </div>
                                )}

                                <div className={styles.gameActions}>
                                    <button onClick={() => handleReserveInit(game)} disabled={!game.disponible} className={`${styles.btn} ${styles.btnReserve}`}>
                                        {game.disponible ? 'Reservar' : 'No disponible'}
                                    </button>
                                    <button onClick={() => handleRatingInit(game)} className={`${styles.btn} ${styles.btnRate}`}>
                                        {userRating ? '⭐ Editar' : '⭐ Valorar'}
                                    </button>
                                </div>

                                {isReservedByMe && (
                                    <div className={styles.myReservationsList}>
                                        <h4>Tus reservas activas:</h4>
                                        {myRes.map(res => (
                                            <div key={res.id} className={styles.miniReservation}>
                                                <span>📅 {res.fecha} {res.todoElDia ? '(Día completo)' : `(${res.horarios?.join(', ')})`}</span>
                                                <button onClick={() => handleReturn(game, res.id)} className={styles.btnMiniReturn}>×</button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {game.valoraciones.length > 0 && (
                                    <details className={styles.reviews}>
                                        <summary>Opiniones de socios ({game.valoraciones.length})</summary>
                                        <div className={styles.reviewsList}>
                                            {game.valoraciones.slice(0, 3).map((val, idx) => (
                                                <div key={idx} className={styles.review}>
                                                    <div className={styles.reviewHeader}>
                                                        <strong>Socio #{val.usuarioId.slice(-3)}</strong>
                                                        <span>{'⭐'.repeat(val.puntuacion)}</span>
                                                    </div>
                                                    {val.comentario && <p className={styles.reviewComment}>{val.comentario}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                )}
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Modal: Reservas */}
            {modals.reserve && selectedGame && (
                <div className={styles.modal} onClick={() => setModals(m => ({ ...m, reserve: false }))}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <h2>Reservas: {selectedGame.nombre}</h2>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Fecha:</label>
                            <input type="date" value={reservaDate} onChange={e => setReservaDate(e.target.value)} className={styles.input} min={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.checkbox}>
                                <input type="checkbox" checked={todoElDia} onChange={e => setTodoElDia(e.target.checked)} />
                                <span>Reserva de día completo</span>
                            </label>
                        </div>
                        {!todoElDia && (
                            <div className={styles.horariosGrid}>
                                {['10:00-12:00', '12:00-14:00', '16:00-18:00', '18:00-20:00', '20:00-22:00'].map(h => (
                                    <label key={h} className={styles.horarioItem}>
                                        <input type="checkbox" checked={selectedHorarios.includes(h)} onChange={e => {
                                            if (e.target.checked) setSelectedHorarios([...selectedHorarios, h]);
                                            else setSelectedHorarios(selectedHorarios.filter(i => i !== h));
                                        }} />
                                        <span>{h}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                        <div className={styles.modalActions}>
                            <button onClick={onConfirmReservation} className={styles.btnSubmit}>Confirmar</button>
                            <button onClick={() => setModals(m => ({ ...m, reserve: false }))} className={styles.btnCancel}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Valoraciones */}
            {modals.rating && selectedGame && (
                <div className={styles.modal} onClick={() => setModals(m => ({ ...m, rating: false }))}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <h2>Valorar {selectedGame.nombre}</h2>
                        <div className={styles.starSelector}>
                            {[1, 2, 3, 4, 5].map(s => (
                                <button key={s} onClick={() => setRating(s)} className={s <= rating ? styles.starActive : styles.starInactive}>⭐</button>
                            ))}
                        </div>
                        <div className={styles.commentInput}>
                            <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="¿Qué te ha parecido el juego?" rows={4} />
                        </div>
                        <div className={styles.modalActions}>
                            <button onClick={onRatingSubmit} className={styles.btnSubmit}>Enviar</button>
                            <button onClick={() => setModals(m => ({ ...m, rating: false }))} className={styles.btnCancel}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
