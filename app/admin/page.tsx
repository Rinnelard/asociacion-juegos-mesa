'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './admin.module.css';

export default function AdminPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            router.push('/login');
        }
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated || user?.role !== 'admin') {
        return null;
    }

    return (
        <div className={styles.adminPage}>
            <div className="container">
                <div className={styles.header}>
                    <div>
                        <h1>Panel de Administración</h1>
                        <p className={styles.subtitle}>Gestiona tu asociación de juegos de mesa</p>
                    </div>
                    <span className="badge badge-admin">Administrador</span>
                </div>

                <div className={styles.statsGrid}>
                    <div className={`card ${styles.statCard}`}>
                        <div className={styles.statIcon}>👥</div>
                        <div className={styles.statContent}>
                            <div className={styles.statNumber}>524</div>
                            <div className={styles.statLabel}>Miembros Totales</div>
                            <div className={styles.statChange}>+12 este mes</div>
                        </div>
                    </div>

                    <div className={`card ${styles.statCard}`}>
                        <div className={styles.statIcon}>🎮</div>
                        <div className={styles.statContent}>
                            <div className={styles.statNumber}>267</div>
                            <div className={styles.statLabel}>Juegos en Catálogo</div>
                            <div className={styles.statChange}>+5 nuevos</div>
                        </div>
                    </div>

                    <div className={`card ${styles.statCard}`}>
                        <div className={styles.statIcon}>📅</div>
                        <div className={styles.statContent}>
                            <div className={styles.statNumber}>18</div>
                            <div className={styles.statLabel}>Eventos Próximos</div>
                            <div className={styles.statChange}>3 esta semana</div>
                        </div>
                    </div>

                    <div className={`card ${styles.statCard}`}>
                        <div className={styles.statIcon}>⭐</div>
                        <div className={styles.statContent}>
                            <div className={styles.statNumber}>4.8</div>
                            <div className={styles.statLabel}>Valoración Media</div>
                            <div className={styles.statChange}>+0.2 puntos</div>
                        </div>
                    </div>
                </div>

                <div className={styles.sectionsGrid}>
                    <div className={`card ${styles.sectionCard}`}>
                        <div className={styles.sectionHeader}>
                            <h3>👥 Gestión de Usuarios</h3>
                            <span className={styles.badge}>524 usuarios</span>
                        </div>
                        <p className={styles.sectionDescription}>
                            Administra miembros, roles y permisos de la asociación
                        </p>
                        <div className={styles.sectionActions}>
                            <button className="btn btn-primary">Ver Usuarios</button>
                            <button className="btn btn-secondary">Añadir Usuario</button>
                        </div>
                    </div>

                    <div className={`card ${styles.sectionCard}`}>
                        <div className={styles.sectionHeader}>
                            <h3>🎮 Catálogo de Juegos</h3>
                            <span className={styles.badge}>267 juegos</span>
                        </div>
                        <p className={styles.sectionDescription}>
                            Gestiona el inventario de juegos disponibles en la asociación
                        </p>
                        <div className={styles.sectionActions}>
                            <button className="btn btn-primary">Ver Catálogo</button>
                            <button className="btn btn-secondary">Añadir Juego</button>
                        </div>
                    </div>

                    <div className={`card ${styles.sectionCard}`}>
                        <div className={styles.sectionHeader}>
                            <h3>📅 Eventos y Torneos</h3>
                            <span className={styles.badge}>18 próximos</span>
                        </div>
                        <p className={styles.sectionDescription}>
                            Organiza y gestiona eventos, torneos y actividades
                        </p>
                        <div className={styles.sectionActions}>
                            <button className="btn btn-primary">Ver Eventos</button>
                            <button className="btn btn-secondary">Crear Evento</button>
                        </div>
                    </div>

                    <div className={`card ${styles.sectionCard}`}>
                        <div className={styles.sectionHeader}>
                            <h3>📰 Noticias y Anuncios</h3>
                            <span className={styles.badge}>42 publicadas</span>
                        </div>
                        <p className={styles.sectionDescription}>
                            Publica y gestiona noticias para la comunidad
                        </p>
                        <div className={styles.sectionActions}>
                            <button className="btn btn-primary">Ver Noticias</button>
                            <button className="btn btn-secondary">Nueva Noticia</button>
                        </div>
                    </div>

                    <div className={`card ${styles.sectionCard}`}>
                        <div className={styles.sectionHeader}>
                            <h3>📊 Estadísticas</h3>
                            <span className={styles.badge}>Analíticas</span>
                        </div>
                        <p className={styles.sectionDescription}>
                            Visualiza métricas y estadísticas de la asociación
                        </p>
                        <div className={styles.sectionActions}>
                            <button className="btn btn-primary">Ver Dashboard</button>
                            <button className="btn btn-secondary">Exportar Datos</button>
                        </div>
                    </div>

                    <div className={`card ${styles.sectionCard}`}>
                        <div className={styles.sectionHeader}>
                            <h3>⚙️ Configuración</h3>
                            <span className={styles.badge}>Sistema</span>
                        </div>
                        <p className={styles.sectionDescription}>
                            Configura ajustes generales de la plataforma
                        </p>
                        <div className={styles.sectionActions}>
                            <button className="btn btn-primary">Configuración</button>
                            <button className="btn btn-secondary">Backup</button>
                        </div>
                    </div>
                </div>

                <div className={`card ${styles.activityCard}`}>
                    <h3>📈 Actividad Reciente</h3>
                    <div className={styles.activityList}>
                        <div className={styles.activityItem}>
                            <div className={styles.activityIcon}>👤</div>
                            <div className={styles.activityContent}>
                                <div className={styles.activityText}>
                                    <strong>María García</strong> se unió a la asociación
                                </div>
                                <div className={styles.activityTime}>Hace 2 horas</div>
                            </div>
                        </div>
                        <div className={styles.activityItem}>
                            <div className={styles.activityIcon}>🎮</div>
                            <div className={styles.activityContent}>
                                <div className={styles.activityText}>
                                    Nuevo juego añadido: <strong>Catan: Expansión Ciudades y Caballeros</strong>
                                </div>
                                <div className={styles.activityTime}>Hace 5 horas</div>
                            </div>
                        </div>
                        <div className={styles.activityItem}>
                            <div className={styles.activityIcon}>📅</div>
                            <div className={styles.activityContent}>
                                <div className={styles.activityText}>
                                    Evento creado: <strong>Torneo de Magic: The Gathering</strong>
                                </div>
                                <div className={styles.activityTime}>Hace 1 día</div>
                            </div>
                        </div>
                        <div className={styles.activityItem}>
                            <div className={styles.activityIcon}>⭐</div>
                            <div className={styles.activityContent}>
                                <div className={styles.activityText}>
                                    <strong>Pedro López</strong> dejó una valoración de 5 estrellas
                                </div>
                                <div className={styles.activityTime}>Hace 2 días</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
