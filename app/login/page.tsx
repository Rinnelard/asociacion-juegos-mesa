'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { usersDB } from '@/lib/db';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));

        // Buscar usuario en la base de datos
        const user = usersDB.getByEmail(email);

        if (user && user.password === password) {
            login(user);
            router.push('/');
        } else {
            setError('Email o contraseña incorrectos');
        }

        setLoading(false);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.loginCard}>
                <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                        <span className={styles.icon}>🎲</span>
                    </div>
                    <h1>Iniciar Sesión</h1>
                    <p>Accede a tu cuenta de la asociación</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && (
                        <div className={styles.error}>
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="tu@email.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                        style={{ width: '100%' }}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className={styles.divider}>
                    <span>o</span>
                </div>

                <div className={styles.footer}>
                    <p>¿No tienes una cuenta?</p>
                    <Link href="/registro" className={styles.link}>
                        Regístrate aquí
                    </Link>
                </div>

                <div className={styles.demoCredentials}>
                    <h4>🔑 Credenciales de prueba:</h4>
                    <div className={styles.demoItem}>
                        <strong>Admin:</strong> admin@juegosdemesa.com / admin123
                    </div>
                    <div className={styles.demoItem}>
                        <strong>Usuario:</strong> usuario@juegosdemesa.com / user123
                    </div>
                </div>
            </div>
        </div>
    );
}
