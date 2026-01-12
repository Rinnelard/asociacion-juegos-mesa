'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';
import { gamesDB, usersDB } from '@/lib/db';
import { Reservation } from '@/lib/types';
import styles from './mis-juegos.module.css';
import Link from 'next/link';

interface ActiveReservation extends Reservation {
    gameName: string;
    gameImage: string;
    gameId: string;
}

export default function MisJuegosPage() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();

    const [reservas, setReservas] = useState<ActiveReservation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) router.push('/login');
        else syncReservas();
    }, [user, router]);

    const syncReservas = () => {
        if (!user) return;

        const all = gamesDB.getAll();
        const found: ActiveReservation[] = [];

        all.forEach(game => {
            (game.reservas || []).forEach(res => {
                if (res.usuarioId === user.id) {
                    found.push({
                        ...res,
                        gameName: game.nombre,
                        gameImage: game.imagen,
                        gameId: game.id
                    });
                }
            });
        });

        setReservas(found.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()));
        setIsLoading(false);
    };

    const handleCancel = (gameId: string, resId: string) => {
        if (usersDB.devolverJuego(user!.id, gameId, resId)) {
            showToast('Reserva liberada', 'success');
            syncReservas();
        }
    };

    if (isLoading) return null;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Mis Juegos y Reservas</h1>
                    <p className={styles.subtitle}>Gestión de préstamos y próximas sesiones en la asociación.</p>
                </div>
            </header>

            <main className="container">
                {reservas.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>🎲</div>
                        <h2>No hay reservas activas</h2>
                        <p>Visita el catálogo para reservar tu próximo juego.</p>
                        <Link href="/juegos" className="btn btn-primary">Ver Catálogo</Link>
                    </div>
                ) : (
                    <div className={styles.reservasGrid}>
                        {reservas.map((res) => (
                            <div key={res.id} className={styles.reservaCard}>
                                <div className={styles.cardImage}>
                                    <img src={res.gameImage} alt={res.gameName} />
                                    <div className={styles.dateBadge}>
                                        <span className={styles.day}>{new Date(res.fecha).getDate()}</span>
                                        <span className={styles.month}>{new Date(res.fecha).toLocaleString('es-ES', { month: 'short' }).toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className={styles.cardInfo}>
                                    <h3>{res.gameName}</h3>
                                    <div className={styles.details}>
                                        <div className={styles.detailItem}>
                                            <span>📅 Día:</span>
                                            <strong>{new Date(res.fecha).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</strong>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span>🕐 Hora:</span>
                                            <strong>{res.todoElDia ? 'Día completo' : res.horarios?.join(', ')}</strong>
                                        </div>
                                    </div>
                                    <button onClick={() => handleCancel(res.gameId, res.id)} className={styles.btnCancel}>
                                        Anular Reserva
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
