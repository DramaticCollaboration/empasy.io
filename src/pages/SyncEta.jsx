import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './SyncEta.css';

const featureCards = [
  {
    color: 'cyan',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    titleKey: 'synceta.page.feature1.title',
    descKey: 'synceta.page.feature1.desc',
  },
  {
    color: 'emerald',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    titleKey: 'synceta.page.feature2.title',
    descKey: 'synceta.page.feature2.desc',
  },
  {
    color: 'blue',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M19 9l-5 5-4-4-3 3" />
      </svg>
    ),
    titleKey: 'synceta.page.feature3.title',
    descKey: 'synceta.page.feature3.desc',
  },
];

const controlItems = [
  { titleKey: 'synceta.page.ctrl1.title', descKey: 'synceta.page.ctrl1.desc' },
  { titleKey: 'synceta.page.ctrl2.title', descKey: 'synceta.page.ctrl2.desc' },
  { titleKey: 'synceta.page.ctrl3.title', descKey: 'synceta.page.ctrl3.desc' },
];

const barDefs = [
  { h: 48,  bg: '#a5f3fc' },
  { h: 64,  bg: '#67e8f9' },
  { h: 96,  bg: '#22d3ee' },
  { h: 80,  bg: '#06b6d4' },
  { h: 112, bg: '#34d399' },
  { h: 128, bg: null, pulse: true },
];

const SyncEta = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'ko';

  return (
    <div className="se-page">
      {/* Background blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="animate-blob" style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '50%', borderRadius: '50%', background: 'rgba(34,211,238,0.12)', filter: 'blur(120px)' }} />
        <div className="animate-blob animation-delay-2000" style={{ position: 'absolute', top: '20%', right: '-10%', width: '45%', height: '60%', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', filter: 'blur(140px)' }} />
        <div className="animate-blob animation-delay-4000" style={{ position: 'absolute', bottom: '-20%', left: '20%', width: '50%', height: '50%', borderRadius: '50%', background: 'rgba(59,130,246,0.08)', filter: 'blur(130px)' }} />
      </div>

      <main className="se-main">
        {/* Hero */}
        <section className="se-hero-section">
          {/* Floating dots */}
          <span className="animate-pulse-slow" style={{ position: 'absolute', top: '80px', left: '20%', width: '12px', height: '12px', borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 15px rgba(34,211,238,0.6)', display: 'block' }} />
          <span className="animate-pulse-slow" style={{ position: 'absolute', bottom: '80px', right: '25%', width: '16px', height: '16px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 20px rgba(52,211,153,0.6)', animationDelay: '1s', display: 'block' }} />
          <span className="animate-pulse-slow" style={{ position: 'absolute', top: '160px', right: '15%', width: '8px', height: '8px', borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 10px rgba(96,165,250,0.6)', animationDelay: '2s', display: 'block' }} />

          <div className="se-section-inner se-hero-inner">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="se-badge">
                <span style={{ position: 'relative', display: 'inline-flex', marginRight: '8px', width: '10px', height: '10px' }}>
                  <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#06B6D4', opacity: 0.75 }} />
                  <span style={{ position: 'relative', display: 'inline-flex', width: '10px', height: '10px', borderRadius: '50%', background: '#0891B2' }} />
                </span>
                {t('synceta.page.badge')}
              </span>
              <h1 className="se-hero-title">
                {t('synceta.page.heroLine1')}<br />
                <span className="se-gradient-text">{t('synceta.page.heroLine2')}</span>
              </h1>
              <p className="se-hero-desc">{t('synceta.page.heroDesc')}</p>

              {/* Status card */}
              <div className="se-glass-panel-solid se-status-card">
                <div className="se-status-left">
                  <div className="se-status-live">
                    <span className="se-live-dot" />
                    <span className="se-live-label">{t('synceta.page.activePipeline')}</span>
                  </div>
                  <h4 className="se-status-title">{t('synceta.page.syncStatus')}</h4>
                  <div className="se-status-eta">
                    <span className="se-eta-time">08:42</span>
                    <span className="se-eta-unit">{t('synceta.page.minToComplete')}</span>
                  </div>
                </div>
                <div className="se-status-divider" />
                <div className="se-status-right">
                  <p className="se-reliability-label">{t('synceta.page.reliabilityScore')}</p>
                  <div className="se-reliability-bar-row">
                    <div className="se-reliability-track">
                      <div className="se-reliability-fill" style={{ width: '94%' }} />
                    </div>
                    <span className="se-reliability-pct">94.8%</span>
                  </div>
                  <p className="se-reliability-sub">{t('synceta.page.reliabilitySub')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="se-section-inner se-features-section">
          <div className="se-features-grid">
            {featureCards.map((card, i) => (
              <motion.div
                key={i}
                className={`se-feature-card se-glass-panel se-feature-card--${card.color}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <div className={`se-feat-icon se-feat-icon--${card.color}`}>{card.icon}</div>
                <h3 className="se-feat-title">{t(card.titleKey)}</h3>
                <p className="se-feat-desc">{t(card.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Control Center */}
        <section className="se-section-inner se-control-section">
          <motion.div
            className="se-glass-panel-solid se-control-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="se-control-text">
              <span className="se-ctrl-eyebrow">{t('synceta.page.ctrlEyebrow')}</span>
              <h2 className="se-ctrl-title">
                {t('synceta.page.ctrlTitle').split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
                ))}
              </h2>
              <ul className="se-ctrl-list">
                {controlItems.map((item, i) => (
                  <li key={i} className="se-ctrl-item">
                    <div className="se-ctrl-check">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="se-ctrl-item-title">{t(item.titleKey)}</h4>
                      <p className="se-ctrl-item-desc">{t(item.descKey)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="se-control-visual">
              <div className="se-glass-panel se-dashboard">
                <div className="se-dash-header">
                  <div className="se-dash-dots">
                    <span className="se-d-red" /><span className="se-d-amber" /><span className="se-d-green" />
                  </div>
                  <span className="se-dash-tag">PREDICTIVE DASHBOARD V2.4</span>
                </div>
                <div className="se-dash-rows">
                  <div className="se-pipeline-row">
                    <div className="se-pip-left">
                      <div className="se-pip-icon se-pip-icon--cyan">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        </svg>
                      </div>
                      <div>
                        <p className="se-pip-region">Region: Tokyo-A</p>
                        <p className="se-pip-name">Database Replication</p>
                      </div>
                    </div>
                    <div className="se-pip-right">
                      <p className="se-pip-status se-pip-status--on">On Track</p>
                      <p className="se-pip-time">02:14s</p>
                    </div>
                  </div>
                  <div className="se-pipeline-row se-pipeline-row--warn">
                    <div className="se-pip-left">
                      <div className="se-pip-icon se-pip-icon--blue">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      </div>
                      <div>
                        <p className="se-pip-region">Region: US-East</p>
                        <p className="se-pip-name">API Log Sync</p>
                      </div>
                    </div>
                    <div className="se-pip-right">
                      <p className="se-pip-status se-pip-status--warn">Slowdown</p>
                      <p className="se-pip-time">14:58m</p>
                    </div>
                  </div>
                  <div className="se-mini-chart">
                    {barDefs.map((bar, i) => (
                      <div
                        key={i}
                        className={`se-mini-bar${bar.pulse ? ' se-mini-bar--pulse' : ''}`}
                        style={{
                          height: `${bar.h}px`,
                          background: bar.bg || 'linear-gradient(135deg,#00B4D8 0%,#48CAE4 50%,#10b981 100%)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats */}
        <motion.section
          className="se-section-inner se-stats-section"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="se-stats-title">{t('synceta.page.statsTitle')}</h2>
          <div className="se-stats-grid">
            <div><p className="se-stat-val se-gradient-text">99.8%</p><p className="se-stat-label">{t('synceta.page.stat1')}</p></div>
            <div><p className="se-stat-val">45%</p><p className="se-stat-label">{t('synceta.page.stat2')}</p></div>
            <div><p className="se-stat-val">24/7</p><p className="se-stat-label">{t('synceta.page.stat3')}</p></div>
            <div><p className="se-stat-val">10x</p><p className="se-stat-label">{t('synceta.page.stat4')}</p></div>
          </div>
        </motion.section>

        {/* CTA */}
        <section className="se-section-inner se-cta-section">
          <motion.div
            className="se-cta-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', background: 'rgba(6,182,212,0.2)', borderRadius: '50%', filter: 'blur(120px)', transform: 'translate(33%, -33%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '500px', height: '500px', background: 'rgba(16,185,129,0.2)', borderRadius: '50%', filter: 'blur(120px)', transform: 'translate(-33%, 33%)', pointerEvents: 'none' }} />
            <div className="se-cta-network-bg" />
            <div className="se-cta-inner">
              <h2 className="se-cta-title">
                {t('synceta.page.ctaTitle')}
              </h2>
              <p className="se-cta-desc">{t('synceta.page.ctaDesc')}</p>
              <div className="se-cta-btns">
                <Link to={`/${currentLang}/contact`} state={{ interest: 'Other' }} className="se-cta-btn-primary">
                  {t('synceta.page.ctaBtn1')}
                </Link>
                <button 
                  className="se-cta-btn-secondary"
                  onClick={() => window.open('https://doc.empasy.com/synceta/', '_blank', 'noopener,noreferrer')}
                >
                  {t('synceta.page.ctaBtn2')}
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default SyncEta;
