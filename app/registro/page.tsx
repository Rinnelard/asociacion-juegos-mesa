'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../login/login.module.css';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);

        const success = await register(name, email, password);

        if (success) {
            router.push('/');
        } else {
            setError('Este email ya está registrado');
        }

        setLoading(false);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.loginCard}>
                <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                        <span className={styles.icon}>⭐</span>
                    </div>
                    <h1>Crear Cuenta</h1>
                    <p>Únete a nuestra comunidad de jugadores</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && (
                        <div className={styles.error}>
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nombre Completo</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            placeholder="Tu nombre"
                            required
                            disabled={loading}
                        />
                    </div>

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
                            placeholder="Mínimo 6 caracteres"
                            required
                            disabled={loading}
                            minLength={6}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-input"
                            placeholder="Repite tu contraseña"
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
                        {loading ? 'Creando cuenta...' : 'Registrarse'}
                    </button>
                </form>

                <div className={styles.divider}>
                    <span>o</span>
                </div>

                <div className={styles.footer}>
                    <p>¿Ya tienes una cuenta?</p>
                    <Link href="/login" className={styles.link}>
                        Inicia sesión aquí
                    </Link>
                </div>
            </div>
        </div>
    );
}
