'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';
import { usersDB, gamesDB, eventsDB } from '@/lib/db';
import styles from './perfil.module.css';

export default function PerfilPage() {
    const { user, login } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        setNombre(user.nombre);
        setTelefono(user.telefono || '');
    }, [user, router]);

    if (!user) return null;

    const handleSave = () => {
        if (!nombre.trim()) {
            showToast('El nombre no puede estar vacío', 'error');
            return;
        }

        if (password && password !== confirmPassword) {
            showToast('Las contraseñas no coinciden', 'error');
            return;
        }

        const updates: any = {
            nombre: nombre.trim(),
            telefono: telefono.trim(),
        };

        if (password) {
            updates.password = password;
        }

        const updatedUser = usersDB.update(user.id, updates);
        if (updatedUser) {
            login(updatedUser);
            showToast('Perfil actualizado exitosamente', 'success');
            setIsEditing(false);
            setPassword('');
            setConfirmPassword('');
        } else {
            showToast('Error al actualizar el perfil', 'error');
        }
    };

    const reservedGames = user.juegosReservados.map(id => gamesDB.getById(id)).filter(Boolean);
    const inscribedEvents = user.eventosInscritos.map(id => eventsDB.getById(id)).filter(Boolean);

    const memberDays = Math.floor((Date.now() - new Date(user.fechaRegistro).getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.profileHeader}>
                    <div className={styles.avatar}>
                        {user.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className={styles.title}>{user.nombre}</h1>
                        <p className={styles.email}>{user.email}</p>
                        <span className={styles.role}>
                            {user.rol === 'admin' ? '👑 Administrador' : '🎮 Miembro'}
                        </span>
                    </div>
                </div>
            </section>

            <div className={styles.content}>
                {/* Stats */}
                <section className={styles.stats}>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{reservedGames.length}</span>
                        <span className={styles.statLabel}>Juegos Reservados</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{inscribedEvents.length}</span>
                        <span className={styles.statLabel}>Eventos Inscritos</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>{memberDays}</span>
                        <span className={styles.statLabel}>Días como Miembro</span>
                    </div>
                </section>

                {/* Información Personal */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Información Personal</h2>
                        {!isEditing && (
                            <button onClick={() => setIsEditing(true)} className={styles.btnEdit}>
                                ✏️ Editar
                            </button>
                        )}
                    </div>

                    <div className={styles.infoCard}>
                        {isEditing ? (
                            <div className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Tu nombre"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        disabled
                                        className={styles.inputDisabled}
                                    />
                                    <small>El email no se puede cambiar</small>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Teléfono</label>
                                    <input
                                        type="tel"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        placeholder="Tu teléfono"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Nueva Contraseña (opcional)</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Dejar en blanco para no cambiar"
                                    />
                                </div>

                                {password && (
                                    <div className={styles.formGroup}>
                                        <label>Confirmar Contraseña</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirmar nueva contraseña"
                                        />
                                    </div>
                                )}

                                <div className={styles.formActions}>
                                    <button onClick={handleSave} className={styles.btnSave}>
                                        💾 Guardar Cambios
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setNombre(user.nombre);
                                            setTelefono(user.telefono || '');
                                            setPassword('');
                                            setConfirmPassword('');
                                        }}
                                        className={styles.btnCancel}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Nombre:</span>
                                    <span className={styles.infoValue}>{user.nombre}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Email:</span>
                                    <span className={styles.infoValue}>{user.email}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Teléfono:</span>
                                    <span className={styles.infoValue}>{user.telefono || 'No especificado'}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Miembro desde:</span>
                                    <span className={styles.infoValue}>
                                        {new Date(user.fechaRegistro).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Juegos Reservados */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Mis Juegos Reservados</h2>
                    {reservedGames.length > 0 ? (
                        <div className={styles.itemsGrid}>
                            {reservedGames.map((game: any) => (
                                <div key={game.id} className={styles.itemCard}>
                                    <div className={styles.itemImage}>
                                        <img src={game.imagen} alt={game.nombre} />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h4>{game.nombre}</h4>
                                        <p>{game.categoria}</p>
                                        <button
                                            onClick={() => {
                                                usersDB.devolverJuego(user.id, game.id);
                                                showToast('Juego devuelto', 'success');
                                                window.location.reload();
                                            }}
                                            className={styles.btnReturn}
                                        >
                                            Devolver
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.emptyMessage}>No tienes juegos reservados actualmente.</p>
                    )}
                </section>

                {/* Eventos Inscritos */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Mis Eventos Inscritos</h2>
                    {inscribedEvents.length > 0 ? (
                        <div className={styles.itemsGrid}>
                            {inscribedEvents.map((event: any) => (
                                <div key={event.id} className={styles.itemCard}>
                                    <div className={styles.itemImage}>
                                        <img src={event.imagen} alt={event.titulo} />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h4>{event.titulo}</h4>
                                        <p>📅 {new Date(event.fecha).toLocaleDateString('es-ES')}</p>
                                        <p>🕐 {event.hora}</p>
                                        <p>📍 {event.lugar}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.emptyMessage}>No estás inscrito en ningún evento.</p>
                    )}
                </section>
            </div>
        </div>
    );
}
