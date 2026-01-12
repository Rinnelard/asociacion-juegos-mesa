'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { usersDB } from '@/lib/db';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulation
        await new Promise(r => setTimeout(r, 600));

        const user = usersDB.getByEmail(email);
        if (user && user.password === password) {
            login(user);
            router.push('/');
        } else {
            setError('Credenciales incorrectas. Revisa los datos introducidos.');
        }

        setIsLoading(false);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.loginCard}>
                <header className={styles.cardHeader}>
                    <div className={styles.iconWrapper}><span className={styles.icon}>🎲</span></div>
                    <h1>Acceso SOCIOS</h1>
                    <p>Introduce tus datos para acceder a la ludoteca</p>
                </header>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className="form-group">
                        <label className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="ejemplo@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading} style={{ width: '100%', marginTop: '1rem' }}>
                        {isLoading ? 'Autenticando...' : 'Entrar en Noctis'}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>¿Aún no eres socio?</p>
                    <Link href="/registro" className={styles.link}>Regístrate en la asociación</Link>
                </div>

                <div className={styles.accessNote}>
                    <h5>Acceso Rápido (Demo):</h5>
                    <ul>
                        <li><strong>Socio:</strong> user@noctis.com / usuario_</li>
                        <li><strong>Gestión:</strong> admin@noctis.com / admin_</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
