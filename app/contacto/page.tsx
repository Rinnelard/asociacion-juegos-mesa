'use client';

import styles from '../login/login.module.css';

export default function ContactoPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Mensaje enviado. Te contactaremos pronto!');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.loginCard} style={{ maxWidth: '600px' }}>
                <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                        <span className={styles.icon}>📧</span>
                    </div>
                    <h1>Contáctanos</h1>
                    <p>Noctis Ciudad de Juegos está a tu disposición para cualquier duda.</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            className="form-input"
                            placeholder="Tu nombre"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject" className="form-label">Asunto</label>
                        <select id="subject" className="form-select" required>
                            <option value="">Selecciona un asunto</option>
                            <option>Membresía</option>
                            <option>Eventos</option>
                            <option>Préstamo de juegos</option>
                            <option>Otro</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message" className="form-label">Mensaje</label>
                        <textarea
                            id="message"
                            className="form-textarea"
                            placeholder="Cuéntanos en qué podemos ayudarte..."
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                        Enviar Mensaje
                    </button>
                </form>

                <div className={styles.demoCredentials}>
                    <h4>📍 Información de Contacto</h4>
                    <div className={styles.demoItem}>
                        📧 Email: junta@noctisjuegos.com
                    </div>
                    <div className={styles.demoItem}>
                        📞 Teléfono: +34 9XX XX XX XX
                    </div>
                    <div className={styles.demoItem}>
                        🏢 Dirección: [Tu dirección aquí], Ciudad de Juegos
                    </div>
                </div>
            </div>
        </div>
    );
}
