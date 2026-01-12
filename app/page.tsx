'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('mesa');

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient}></div>
          <div className={styles.heroPattern}></div>
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.heroTitle}>
                <div className={styles.heroLogoWrapper}>
                  <span className={styles.heroLetterN}>n</span>
                  <img src={getAssetPath('/noctis.jpg')} alt="Noctis Icon" className={styles.heroIconCircle} />
                  <span className={styles.heroLetterCtis}>ctis</span>
                </div>
                <div className={styles.heroLogoClaim}>CIUDAD DE JUEGOS</div>
              </div>
              <p className={styles.heroSubtitle}>
                Mucho más que una asociación. Un espacio donde la estrategia, la narrativa y la comunidad se encuentran para crear experiencias inolvidables.
              </p>
              <div className={styles.heroButtons}>
                {isAuthenticated ? (
                  <>
                    <Link href="/eventos" className="btn btn-primary btn-lg">
                      <span>📅</span> Próximos Eventos
                    </Link>
                    <Link href="/juegos" className="btn btn-secondary btn-lg">
                      Catálogo y Ludoteca
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/registro" className="btn btn-primary btn-lg">
                      <span>✨</span> Hazte Socio
                    </Link>
                    <a href="https://www.instagram.com/asociacion_noctis/" target="_blank" className="btn btn-secondary btn-lg">
                      <span>📸</span> Comunidad IG
                    </a>
                  </>
                )}
              </div>
            </div>

            <div className={styles.heroImage}>
              <div className={styles.heroCard}>
                <img src={getAssetPath('/noctis.jpg')} alt="Noctis Logo" className={styles.logoHero} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.history}>
        <div className="container">
          <div className={styles.historyGrid}>
            <div className={styles.historyText}>
              <h2 className={styles.accentTitle}>Nuestra Historia</h2>
              <p>
                Lo que comenzó como un pequeño grupo de apasionados por los tableros ha evolucionado en <strong>Noctis Ciudad de Juegos</strong>.
                Un proyecto nacido de la ilusión por compartir el ocio alternativo en todas sus formas.
              </p>
              <p>
                Ofrecemos un entorno seguro e inclusivo para el aprendizaje y la competición sana.
                Desde nuestra sede equipada, impulsamos una ludoteca dinámica y una comunidad que vive el juego los 365 días del año.
              </p>
              <div className={styles.historyHighlight}>
                <h3>Ocio con Propósito</h3>
                <p>
                  Promovemos el juego como herramienta de desarrollo social y cognitivo. Colaboramos con centros y otras entidades
                  para llevar el ocio saludable más allá de nuestras mesas.
                </p>
              </div>
            </div>
            <div className={styles.historyImages}>
              <div className={styles.imageGrid}>
                <article className={styles.imageWrapper}>
                  <img src={getAssetPath('/christmas.png')} alt="Momentos Noctis" />
                  <span>Comunidad</span>
                </article>
                <article className={styles.imageWrapper}>
                  <img src={getAssetPath('/anniversary.png')} alt="Eventos Especiales" />
                  <span>Aniversarios</span>
                </article>
                <article className={styles.imageWrapper}>
                  <img src={getAssetPath('/board-games.png')} alt="Ludoteca" />
                  <span>Partidas</span>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.categories}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Secciones Especializadas</h2>

          <div className={styles.tabContainer}>
            <button className={`${styles.tabBtn} ${activeTab === 'mesa' ? styles.tabActive : ''}`} onClick={() => setActiveTab('mesa')}>🎲 Mesa</button>
            <button className={`${styles.tabBtn} ${activeTab === 'miniaturas' ? styles.tabActive : ''}`} onClick={() => setActiveTab('miniaturas')}>⚔️ Wargames</button>
            <button className={`${styles.tabBtn} ${activeTab === 'rol' ? styles.tabActive : ''}`} onClick={() => setActiveTab('rol')}>📜 Rol</button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'mesa' && (
              <div className={styles.tabPane}>
                <div className={styles.paneGrid}>
                  <img src={getAssetPath('/board-games.png')} alt="Mesa" className={styles.paneImage} />
                  <div className={styles.paneInfo}>
                    <h3>Ludoteca Física</h3>
                    <p>Desde Eurogames profundos hasta dinámicas rápidas. Todo un universo de cartón y madera a tu disposición.</p>
                    <Link href="/juegos" className="btn btn-primary">Explorar Catálogos</Link>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'miniaturas' && (
              <div className={styles.tabPane}>
                <div className={styles.paneGrid}>
                  <img src={getAssetPath('/miniatures.png')} alt="Miniaturas" className={styles.paneImage} />
                  <div className={styles.paneInfo}>
                    <h3>Miniaturas y Modelismo</h3>
                    <p>Talleres de pintura, mesas escenográficas y torneos regulares de los principales sistemas del mercado.</p>
                    <Link href="/juegos" className="btn btn-primary">Talleres Activos</Link>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'rol' && (
              <div className={styles.tabPane}>
                <div className={styles.paneGrid}>
                  <img src={getAssetPath('/roleplay.png')} alt="Rol" className={styles.paneImage} />
                  <div className={styles.paneInfo}>
                    <h3>Narrativa y Rol</h3>
                    <p>Viaja a otros mundos con nuestros Directores de Juego. Campañas estables y sesiones de iniciación.</p>
                    <Link href="/juegos" className="btn btn-primary">Próximas Sesiones</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>¿Te apuntas a la próxima partida?</h2>
            <p>Visítanos en nuestra sede para conocernos en persona.</p>
            {!isAuthenticated && (
              <Link href="/registro" className="btn btn-accent btn-lg">Inscribirme ahora</Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
