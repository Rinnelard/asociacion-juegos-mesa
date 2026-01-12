'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoWrapper}>
                        <span className={styles.letterN}>n</span>
                        <img src={getAssetPath('/noctis.jpg')} alt="Noctis Icon" className={styles.logoIconCircle} />
                        <span className={styles.letterCtis}>ctis</span>
                    </div>
                    <div className={styles.logoClaim}>CIUDAD DE JUEGOS</div>
                </Link>

                <button
                    className={styles.mobileToggle}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
                    <Link href="/" className={styles.navLink}>Inicio</Link>
                    <Link href="/juegos" className={styles.navLink}>Catálogo</Link>
                    <Link href="/eventos" className={styles.navLink}>Eventos</Link>
                    <Link href="/noticias" className={styles.navLink}>Noticias</Link>
                    <Link href="/contacto" className={styles.navLink}>Contacto</Link>

                    {isAuthenticated ? (
                        <>
                            {user?.rol === 'admin' && (
                                <Link href="/admin" className={`${styles.navLink} ${styles.adminLink}`}>
                                    <span className={styles.adminIcon}>⚙️</span> Admin
                                </Link>
                            )}

                            <div className={styles.userMenu}>
                                <button
                                    className={styles.userButton}
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                >
                                    <div className={styles.userAvatar}>
                                        {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <span className={styles.userName}>{user?.nombre || 'Usuario'}</span>
                                    {user?.rol === 'admin' && (
                                        <span className="badge badge-admin">Admin</span>
                                    )}
                                </button>

                                {userMenuOpen && (
                                    <div className={styles.userDropdown}>
                                        <Link href="/perfil" className={styles.dropdownItem}>
                                            👤 Mi Perfil
                                        </Link>
                                        <Link href="/mis-juegos" className={styles.dropdownItem}>
                                            🎮 Mis Juegos
                                        </Link>
                                        <button onClick={logout} className={styles.dropdownItem}>
                                            🚪 Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className={styles.authButtons}>
                            <Link href="/login" className="btn btn-secondary btn-sm">
                                Iniciar Sesión
                            </Link>
                            <Link href="/registro" className="btn btn-primary btn-sm">
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
