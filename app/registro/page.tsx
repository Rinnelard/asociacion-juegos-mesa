'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { usersDB } from '@/lib/db';
import Link from 'next/link';
import styles from '../login/login.module.css';

export default function RegisterPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '', dni: '', phone: '', email: '', password: '', confirm: ''
    });
    const [interests, setInterests] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInterest = (val: string) => {
        setInterests(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirm) return setError('Las contraseñas no coinciden');
        if (formData.password.length < 6) return setError('Mínimo 6 caracteres en la contraseña');

        setIsLoading(true);
        await new Promise(r => setTimeout(r, 600));

        if (usersDB.getByEmail(formData.email)) {
            setError('Este correo ya está registrado');
            setIsLoading(false);
            return;
        }

        const user = usersDB.create({
            nombre: formData.name,
            email: formData.email,
            password: formData.password,
            rol: 'user',
            telefono: formData.phone,
            dni: formData.dni,
            intereses: interests,
            fechaRegistro: new Date().toISOString().split('T')[0],
            juegosReservados: [],
            eventosInscritos: [],
        });

        login(user);
        router.push('/');
        setIsLoading(false);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.loginCard} style={{ maxWidth: '600px' }}>
                <header className={styles.cardHeader}>
                    <div className={styles.iconWrapper}><span className={styles.icon}>✨</span></div>
                    <h1>Alta de Socio</h1>
                    <p>Únete a la comunidad de Noctis Ciudad de Juegos</p>
                </header>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Nombre Completo</label>
                            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="form-input" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">DNI / NIE</label>
                            <input type="text" value={formData.dni} onChange={e => setFormData({ ...formData, dni: e.target.value })} className="form-input" placeholder="12345678X" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Teléfono</label>
                        <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="form-input" placeholder="600 000 000" required />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Correo Electrónico</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="form-input" required />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Preferencias</label>
                        <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.4rem' }}>
                            {['Juegos de Mesa', 'Miniaturas', 'Rol'].map((cat) => (
                                <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={interests.includes(cat)} onChange={() => handleInterest(cat)} />
                                    <span>{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Contraseña</label>
                            <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="form-input" minLength={6} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirmar</label>
                            <input type="password" value={formData.confirm} onChange={e => setFormData({ ...formData, confirm: e.target.value })} className="form-input" required />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading} style={{ width: '100%', marginTop: '1rem' }}>
                        {isLoading ? 'Registrando...' : 'Confirmar Registro'}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>¿Ya tienes cuenta?</p>
                    <Link href="/login" className={styles.link}>Entrar ahora</Link>
                </div>
            </div>
        </div>
    );
}
