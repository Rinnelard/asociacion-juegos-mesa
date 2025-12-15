'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient}></div>
          <div className={styles.heroPattern}></div>
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Descubre el Mundo de los Juegos de Mesa
              </h1>
              <p className={styles.heroSubtitle}>
                Únete a nuestra comunidad apasionada por los juegos de estrategia,
                rol, cartas y mucho más. Participa en eventos, descubre nuevos juegos
                y conecta con otros jugadores.
              </p>
              <div className={styles.heroButtons}>
                {isAuthenticated ? (
                  <>
                    <Link href="/eventos" className="btn btn-primary btn-lg">
                      <span>🎲</span> Ver Eventos
                    </Link>
                    <Link href="/juegos" className="btn btn-secondary btn-lg">
                      Explorar Catálogo
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/registro" className="btn btn-primary btn-lg">
                      <span>⭐</span> Únete Ahora
                    </Link>
                    <Link href="/login" className="btn btn-secondary btn-lg">
                      Iniciar Sesión
                    </Link>
                  </>
                )}
              </div>

              {isAuthenticated && (
                <div className={styles.welcomeMessage}>
                  👋 ¡Bienvenido de vuelta, <strong>{user?.nombre}</strong>!
                  {user?.rol === 'admin' && <span className="badge badge-admin">Administrador</span>}
                </div>
              )}
            </div>

            <div className={styles.heroImage}>
              <div className={styles.heroCard}>
                <img src="/noctis.jpg" alt="Dado 3D" className={styles.diceAnimation} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>¿Qué Ofrecemos?</h2>
          <div className={styles.featuresGrid}>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>🎮</div>
              <h3>Amplio Catálogo</h3>
              <p>
                Explora nuestra colección de juegos de mesa, desde clásicos
                hasta las últimas novedades del mercado.
              </p>
            </div>

            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>📅</div>
              <h3>Eventos Regulares</h3>
              <p>
                Participa en torneos, sesiones de juego y eventos temáticos
                organizados por la comunidad.
              </p>
            </div>

            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>👥</div>
              <h3>Comunidad Activa</h3>
              <p>
                Conecta con otros entusiastas, forma grupos de juego y
                comparte tu pasión por los juegos de mesa.
              </p>
            </div>

            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>📚</div>
              <h3>Recursos y Guías</h3>
              <p>
                Accede a reseñas, tutoriales y guías para aprender nuevos
                juegos y mejorar tus estrategias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Miembros</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>250+</div>
              <div className={styles.statLabel}>Juegos</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>100+</div>
              <div className={styles.statLabel}>Eventos al Año</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>10</div>
              <div className={styles.statLabel}>Años de Historia</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>¿Listo para Empezar?</h2>
            <p>
              Únete a nuestra asociación y descubre un mundo de diversión y estrategia.
            </p>
            {!isAuthenticated && (
              <Link href="/registro" className="btn btn-accent btn-lg">
                Regístrate Gratis
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
