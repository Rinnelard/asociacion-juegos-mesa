'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';
import { usersDB, eventsDB } from '@/lib/db';
import { User, Event } from '@/lib/types';
import Link from 'next/link';
import styles from './perfil.module.css';

export default function PerfilPage() {
    const { user, login } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        setNombre(user.nombre);
        setTelefono(user.telefono || '');
    }, [user, router]);

    if (!user) return null;

    const handleUpdate = () => {
        if (!nombre.trim()) return showToast('Nombre requerido', 'error');
        if (password && password !== confirm) return showToast('Las contraseñas no coinciden', 'error');

        const ok = usersDB.update(user.id, {
            nombre: nombre.trim(),
            telefono: telefono.trim(),
            ...(password && { password })
        });

        if (ok) {
            login(ok);
            showToast('Perfil actualizado', 'success');
            setIsEditing(false);
            setPassword('');
            setConfirm('');
        }
    };

    const myEvents = user.eventosInscritos.map(id => eventsDB.getById(id)).filter(Boolean) as Event[];
    const registrationDate = new Date(user.fechaRegistro).toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.profileHeader}>
                    <div className={styles.avatar}>{user.nombre.charAt(0)}</div>
                    <div>
                        <h1 className={styles.title}>{user.nombre}</h1>
                        <p className={styles.email}>{user.email}</p>
                        <span className={styles.role}>{user.rol === 'admin' ? 'Coordinador Noctis' : 'Socio Noctis'}</span>
                    </div>
                </div>
            </section>

            <div className={styles.content}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Mi Membresía</h2>
                        {!isEditing && <button onClick={() => setIsEditing(true)} className={styles.btnEdit}>Editar Datos</button>}
                    </div>

                    <div className={styles.infoCard}>
                        {isEditing ? (
                            <div className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label>Nombre Completo</label>
                                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Teléfono de Contacto</label>
                                    <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Nueva Contraseña (vacío para mantener)</label>
                                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                                {password && (
                                    <div className={styles.formGroup}>
                                        <label>Confirmar Contraseña</label>
                                        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
                                    </div>
                                )}
                                <div className={styles.formActions}>
                                    <button onClick={handleUpdate} className={styles.btnSave}>Guardar Cambios</button>
                                    <button onClick={() => setIsEditing(false)} className={styles.btnCancel}>Cancelar</button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Nombre:</span>
                                    <span>{user.nombre}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Email:</span>
                                    <span>{user.email}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Socio desde:</span>
                                    <span>{registrationDate}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Teléfono:</span>
                                    <span>{user.telefono || 'No registrado'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Préstamos y Ludoteca</h2>
                        <Link href="/mis-juegos" className="btn btn-primary">Dashboard de Préstamos</Link>
                    </div>
                    <p className={styles.emptyMessage}>Consulta tus juegos reservados y revisa el calendario de entregas.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Inscripciones a Eventos</h2>
                    {myEvents.length > 0 ? (
                        <div className={styles.itemsGrid}>
                            {myEvents.map(ev => (
                                <div key={ev.id} className={styles.itemCard}>
                                    <div className={styles.itemImage}><img src={ev.imagen} alt={ev.titulo} /></div>
                                    <div className={styles.itemInfo}>
                                        <h4>{ev.titulo}</h4>
                                        <p>📅 {new Date(ev.fecha).toLocaleDateString()} — {ev.hora}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.emptyMessage}>No tienes inscripciones pendientes.</p>
                    )}
                </section>
            </div>
        </div>
    );
}
