import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './UseCases.css';

const UseCases = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'ko';
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all',           label: t('usecases.filters.all') },
    { id: 'logistics',     label: t('usecases.filters.logistics') },
    { id: 'manufacturing', label: t('usecases.filters.manufacturing') },
    { id: 'tech',          label: t('usecases.filters.tech') },
    { id: 'finance',       label: t('usecases.filters.finance') },
  ];

  const cases = [
    {
      id: 'lg',
      category: 'manufacturing',
      title: 'LG전자',
      subtitle: t('usecases.flip.lg.subtitle'),
      accent: '#0891B2',
      iconBg: 'linear-gradient(135deg, #ecfeff, #fff)',
      iconBorder: '#cffafe',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ),
      backAccent: '#10b981',
      r1: { label: t('usecases.flip.lg.r1l'), value: '30', suffix: '%', arrow: '↓', valueColor: '#1e293b' },
      r2: { label: t('usecases.flip.lg.r2l'), value: '250', suffix: '%', gradient: true },
    },
    {
      id: 'samsung',
      category: 'tech',
      title: '삼성전자 DS',
      subtitle: t('usecases.flip.samsung.subtitle'),
      accent: '#3b82f6',
      iconBg: 'linear-gradient(135deg, #eff6ff, #fff)',
      iconBorder: '#bfdbfe',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2"/>
          <rect x="9" y="9" width="6" height="6"/>
          <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
          <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
          <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
          <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
        </svg>
      ),
      backAccent: '#3b82f6',
      r1: { label: t('usecases.flip.samsung.r1l'), value: '99.9', suffix: '%', valueColor: '#1e293b', accentColor: '#3b82f6' },
      r2: { label: t('usecases.flip.samsung.r2l'), value: '40', suffix: '%', arrow: '↓', gradient: true },
    },
    {
      id: 'hyosung',
      category: 'logistics',
      title: '효성ITX',
      subtitle: t('usecases.flip.hyosung.subtitle'),
      accent: '#10b981',
      iconBg: 'linear-gradient(135deg, #ecfdf5, #fff)',
      iconBorder: '#a7f3d0',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
          <path d="M15 18H9"/>
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
          <circle cx="7" cy="18" r="2"/>
          <circle cx="17" cy="18" r="2"/>
        </svg>
      ),
      backAccent: '#10b981',
      r1: { label: t('usecases.flip.hyosung.r1l'), value: '2', suffix: '배', arrow: '↑', valueColor: '#1e293b', accentColor: '#10b981' },
      r2: { label: t('usecases.flip.hyosung.r2l'), value: '0.1', suffix: '% 미만', gradient: true },
    },
    {
      id: 'visang',
      category: 'tech',
      title: '비상교육',
      subtitle: t('usecases.flip.visang.subtitle'),
      accent: '#0891B2',
      iconBg: 'linear-gradient(135deg, #ecfeff, #fff)',
      iconBorder: '#cffafe',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
        </svg>
      ),
      backAccent: '#0891B2',
      r1: { label: t('usecases.flip.visang.r1l'), value: '10만', suffix: '명', valueColor: '#1e293b', accentColor: '#0891B2' },
      r2: { label: t('usecases.flip.visang.r2l'), value: '96', suffix: '%', gradient: true },
    },
    {
      id: 'skmagic',
      category: 'logistics',
      title: 'SK매직',
      subtitle: t('usecases.flip.skmagic.subtitle'),
      accent: '#3b82f6',
      iconBg: 'linear-gradient(135deg, #eff6ff, #fff)',
      iconBorder: '#bfdbfe',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      ),
      backAccent: '#3b82f6',
      r1: { label: t('usecases.flip.skmagic.r1l'), value: '150', suffix: '%', arrow: '↑', valueColor: '#1e293b' },
      r2: { label: t('usecases.flip.skmagic.r2l'), value: '99', suffix: '%', gradient: true },
    },
    {
      id: 'homeplus',
      category: 'logistics',
      title: '홈플러스',
      subtitle: t('usecases.flip.homeplus.subtitle'),
      accent: '#10b981',
      iconBg: 'linear-gradient(135deg, #ecfdf5, #fff)',
      iconBorder: '#a7f3d0',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      backAccent: '#10b981',
      r1: { label: t('usecases.flip.homeplus.r1l'), value: '60', suffix: '%', arrow: '↓', valueColor: '#1e293b' },
      r2: { label: t('usecases.flip.homeplus.r2l'), value: '25', suffix: '%', gradient: true },
    },
  ];

  const filtered = filter === 'all' ? cases : cases.filter(c => c.category === filter);

  const categoryLabel = (id) => {
    const map = {
      manufacturing: t('usecases.filters.manufacturing'),
      tech: t('usecases.filters.tech'),
      logistics: t('usecases.filters.logistics'),
      finance: t('usecases.filters.finance'),
    };
    return map[id] || id;
  };

  return (
    <div style={{ background: '#F8FAFC', overflowX: 'hidden', position: 'relative' }}>

      {/* Background blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="animate-blob" style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '50%', borderRadius: '50%', background: 'rgba(34,211,238,0.12)', filter: 'blur(120px)' }} />
        <div className="animate-blob animation-delay-2000" style={{ position: 'absolute', top: '20%', right: '-10%', width: '45%', height: '60%', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', filter: 'blur(140px)' }} />
        <div className="animate-blob animation-delay-4000" style={{ position: 'absolute', bottom: '-20%', left: '20%', width: '50%', height: '50%', borderRadius: '50%', background: 'rgba(59,130,246,0.08)', filter: 'blur(130px)' }} />
      </div>

      {/* ── 1. Hero ── */}
      <section style={{ position: 'relative', zIndex: 1, paddingTop: '160px', paddingBottom: '80px', overflow: 'hidden' }}>
        <div className="uc-network-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, mixBlendMode: 'multiply', pointerEvents: 'none' }} />

        {/* Floating dots */}
        <span className="animate-pulse-slow" style={{ position: 'absolute', top: '80px', left: '20%', width: '12px', height: '12px', borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 15px rgba(34,211,238,0.6)', display: 'block' }} />
        <span className="animate-pulse-slow" style={{ position: 'absolute', bottom: '80px', right: '25%', width: '16px', height: '16px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 20px rgba(52,211,153,0.6)', animationDelay: '1s', display: 'block' }} />
        <span className="animate-pulse-slow" style={{ position: 'absolute', top: '160px', right: '15%', width: '8px', height: '8px', borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 10px rgba(96,165,250,0.6)', animationDelay: '2s', display: 'block' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '50px', background: 'rgba(8,145,178,0.07)', border: '1px solid rgba(8,145,178,0.15)', color: '#0891B2', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '24px' }}>
              <span style={{ position: 'relative', display: 'inline-flex', marginRight: '8px', width: '10px', height: '10px' }}>
                <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#06B6D4', opacity: 0.75 }} />
                <span style={{ position: 'relative', display: 'inline-flex', width: '10px', height: '10px', borderRadius: '50%', background: '#0891B2' }} />
              </span>
              {t('usecases.hero.badge')}
            </span>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px' }}>
              <span style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0D9488 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Use Cases
              </span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#475569', fontWeight: 500, maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              {t('usecases.hero.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Filter + Cards ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Filter pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '56px' }}>
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '10px 24px', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.25s', border: '1px solid',
                background: filter === f.id ? 'rgba(8,145,178,0.08)' : 'rgba(255,255,255,0.6)',
                color: filter === f.id ? '#0891B2' : '#475569',
                borderColor: filter === f.id ? 'rgba(8,145,178,0.3)' : '#E2E8F0',
                backdropFilter: 'blur(8px)',
                boxShadow: filter === f.id ? '0 2px 8px rgba(8,145,178,0.12)' : 'none',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Flip cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px', marginBottom: '80px' }}>
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              className="uc-flip-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <div className="uc-flip-card-inner">
                {/* Front */}
                <div className="uc-flip-card-front" style={{ borderColor: 'rgba(255,255,255,0.8)' }}>
                  <div>
                    <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: '50px', background: '#f1f5f9', color: '#475569', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '20px' }}>
                      {categoryLabel(c.category)}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>{c.title}</h3>
                    <p style={{ color: '#64748B', fontWeight: 500, fontSize: '1rem', lineHeight: 1.55 }}>{c.subtitle}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: c.iconBg, border: `1px solid ${c.iconBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="uc-flip-card-back">
                  <h4 style={{ fontSize: '0.72rem', fontWeight: 800, color: c.backAccent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>
                    {t('usecases.flip.keyresults')}
                  </h4>
                  <div style={{ width: '100%' }}>
                    {/* Result 1 */}
                    <div style={{ marginBottom: '20px' }}>
                      <p style={{ color: '#64748B', fontSize: '0.8rem', fontWeight: 500, marginBottom: '4px' }}>{c.r1.label}</p>
                      <p style={{ fontSize: '2rem', fontWeight: 900, color: c.r1.valueColor || '#0F172A', lineHeight: 1 }}>
                        {c.r1.value}
                        <span style={{ fontSize: '1.1rem', color: c.r1.accentColor || c.backAccent }}>{c.r1.suffix}</span>
                        {c.r1.arrow && <span style={{ fontSize: '1rem', color: c.backAccent, marginLeft: '4px' }}>{c.r1.arrow}</span>}
                      </p>
                    </div>
                    <div style={{ width: '100%', height: '1px', background: 'rgba(203,213,225,0.5)', marginBottom: '20px' }} />
                    {/* Result 2 */}
                    <div>
                      <p style={{ color: '#64748B', fontSize: '0.8rem', fontWeight: 500, marginBottom: '4px' }}>{c.r2.label}</p>
                      <p style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1, ...(c.r2.gradient ? { background: 'linear-gradient(135deg, #00B4D8, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : { color: '#0F172A' }) }}>
                        {c.r2.value}
                        <span style={{ fontSize: '1.1rem', WebkitTextFillColor: c.r2.gradient ? 'transparent' : undefined }}>{c.r2.suffix}</span>
                        {c.r2.arrow && <span style={{ fontSize: '1rem', color: c.backAccent, marginLeft: '4px', WebkitTextFillColor: 'initial' }}>{c.r2.arrow}</span>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Impact metrics ── */}
        <motion.div
          className="uc-impact-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ background: '#0f172a', padding: 'clamp(40px, 6vw, 56px)', marginBottom: '80px' }}
        >
          <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', background: 'rgba(6,182,212,0.2)', borderRadius: '50%', filter: 'blur(120px)', transform: 'translate(33%, -33%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '500px', height: '500px', background: 'rgba(16,185,129,0.2)', borderRadius: '50%', filter: 'blur(120px)', transform: 'translate(-33%, 33%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>
                {t('usecases.impact.title')}
              </h1>
              <h3 style={{ color: '#64748B', fontSize: '1rem', fontWeight: 500 }}>
                {t('usecases.impact.subtitle')}
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0', textAlign: 'center' }}>
              {[
                { label: t('usecases.impact.s1l'), value: '60', suffix: '%', arrow: '↓', suffixColor: '#0891B2', arrowColor: '#10b981' },
                { label: t('usecases.impact.s2l'), value: '95', suffix: '%', suffixColor: '#0891B2' },
                { label: t('usecases.impact.s3l'), value: '300', suffix: '%', gradient: true, suffixColor: '#10b981' },
                { label: t('usecases.impact.s4l'), value: t('usecases.impact.s4v'), suffixColor: '#0891B2' },
              ].map((stat, i) => (
                <div key={i} style={{ padding: '16px', borderLeft: i > 0 ? '1px solid rgba(203,213,225,0.4)' : 'none' }}>
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B', marginBottom: '8px' }}>{stat.label}</h3>
                  <h1 style={{
                    fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.02em',
                    ...(stat.gradient
                      ? { background: 'linear-gradient(135deg, #00B4D8, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
                      : { color: '#fff' })
                  }}>
                    {stat.value}
                    {stat.suffix && <span style={{ fontSize: '1.2rem', color: stat.suffixColor, WebkitTextFillColor: stat.gradient ? 'transparent' : stat.suffixColor }}>{stat.suffix}</span>}
                    {stat.arrow && <span style={{ fontSize: '1.2rem', color: stat.arrowColor, WebkitTextFillColor: 'initial', marginLeft: '2px' }}>{stat.arrow}</span>}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 5. CTA ── */}
      <section style={{ padding: '80px 24px 128px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#0F172A', marginBottom: '48px', lineHeight: 1.2 }}>
              {t('usecases.cta.title').split('\n').map((line, i, arr) => (
                <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
              ))}
            </h2>
            <Link
              to={`/${currentLang}/contact`}
              state={{interest: 'Other'}}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                background: 'linear-gradient(135deg, #0891B2, #0D9488)', color: '#fff',
                padding: '20px 40px', borderRadius: '50px',
                fontSize: '1.05rem', fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(8, 145, 178, 0.25)',
                transition: 'all 0.25s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(8, 145, 178, 0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(8, 145, 178,0.2)';
              }}
            >
              {t('usecases.cta.btn')}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default UseCases;
