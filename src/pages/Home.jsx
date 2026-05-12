import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const useTypewriter = (text, speed = 50, startDelay = 800) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
};

const Home = () => {
  const { t } = useTranslation();
  const { lang = 'ko' } = useParams();
  const subtitleText = t('hero.subtitle', 'AI-DLC 기반의 완벽한 디지털 혁신 생태계');
  const { displayed, done } = useTypewriter(subtitleText, 45, 1000);

  return (
    <div style={{ background: '#F8FAFC', overflowX: 'hidden' }}>

      {/* ── Hero Section ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

        {/* Grid overlay */}
        <div className="bg-grid" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

        {/* Animated blobs */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}>
          <div
            className="animate-blob"
            style={{
              position: 'absolute', top: '10%', left: '15%',
              width: '360px', height: '360px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(8,145,178,0.18) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />
          <div
            className="animate-blob animation-delay-2000"
            style={{
              position: 'absolute', top: '50%', right: '10%',
              width: '420px', height: '420px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 70%)',
              filter: 'blur(50px)'
            }}
          />
          <div
            className="animate-blob animation-delay-4000"
            style={{
              position: 'absolute', bottom: '10%', left: '40%',
              width: '300px', height: '300px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />
        </div>

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '900px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(8, 145, 178, 0.07)', border: '1px solid rgba(8, 145, 178, 0.15)', borderRadius: '50px', padding: '4px 14px', marginBottom: '32px', textTransform: 'uppercase' }}>
              <span style={{ position: 'relative', display: 'inline-flex', width: '10px', height: '10px' }}>
                <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#06B6D4', opacity: 0.75 }} />
                <span style={{ position: 'relative', display: 'inline-flex', width: '10px', height: '10px', borderRadius: '50%', background: '#0891B2' }} />
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0891B2', letterSpacing: '0.1em' }}>The Next Generation AI Platform</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hero-title"
            style={{ fontWeight: 900, margin: '0 0 24px', letterSpacing: '-0.03em' }}
          >
            <span className="text-gradient-primary">
              {t('hero.headline', 'Boon to business')}
            </span>
            <br />
            <span style={{ color: '#0F172A' }}>
              {t('hero.headline2', 'by agility')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
            style={{ fontSize: '1.1rem', color: '#475569', maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.7, minHeight: '1.7em' }}
          >
            {displayed}
            <span className="animate-blink" style={{ color: '#0891B2', fontWeight: 300 }}>|</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link
              to={`/${lang}/contact`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(135deg, #0891B2, #0D9488)',
                color: '#fff', padding: '14px 32px', borderRadius: '12px',
                fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(8,145,178,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(8,145,178,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(8,145,178,0.3)'; }}
            >
              {t('hero.cta.contact', '상담 시작하기')}
            </Link>
            <Link
              to={`/${lang}/hydra`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.8)', border: '1px solid #E2E8F0',
                color: '#0F172A', padding: '14px 32px', borderRadius: '12px',
                fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s, border-color 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#67e8f9'; e.currentTarget.style.color = '#0891b2'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
            >
              {t('hero.cta.explore', 'Hydra 보기')}
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <div
            className="animate-float"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '0.75rem', letterSpacing: '0.1em' }}
          >
            <span>{t('hero.scroll', 'SCROLL')}</span>
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>↓</span>
          </div>
        </div>
      </section>

      {/* ── Ecosystem Bento Grid ── */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div style={{ display: 'inline-block', background: 'rgba(8,145,178,0.08)', border: '1px solid rgba(8,145,178,0.15)', borderRadius: '50px', padding: '4px 14px', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0891B2', letterSpacing: '0.12em' }}>ECOSYSTEM</span>
          </div>
          <h2 className="section-title" style={{ color: '#0F172A', marginBottom: '12px' }}>
            {t('home.ecosystem.title', '하나의 플랫폼, 모든 솔루션')}
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            {t('home.ecosystem.subtitle', 'AI 인프라부터 커머스 물류까지 통합된 엔터프라이즈 솔루션')}
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="bento-grid-responsive">

          {/* Hydra – 2×2 large */}
          <BentoCard
            delay={0}
            className="bento-span-2 bento-span-2-rows"
            style={{ gridColumn: 'span 2', gridRow: 'span 2' }}
            variant="primary"
          >
            <Link to={`/${lang}/hydra`}>
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit' }}>
                <div style={{
                  position: 'absolute', top: '-60px', right: '-60px',
                  width: '280px', height: '280px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(8,145,178,0.25) 0%, transparent 70%)',
                  filter: 'blur(30px)'
                }} />
              </div>
              <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', padding: '40px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(8,145,178,0.12)', borderRadius: '8px', padding: '6px 12px', width: 'fit-content', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0891B2', letterSpacing: '0.1em' }}>AI INFRA</span>
                </div>
                <h3 className="bento-card-title-lg" style={{ color: '#0F172A', marginBottom: '12px', lineHeight: 1.2 }}>
                  Hydra Platform
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 'auto', maxWidth: '340px' }}>
                  {t('home.bento.hydra.desc', 'AI 기반 품질 엔지니어링 플랫폼으로 TC 생성부터 자동화 실행, 피드백 루프까지 완전 자동화')}
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
                  {['SyncBoot', 'SyncEta', 'SyncCMS', 'SyncAPIM'].map(tag => (
                    <span key={tag} style={{ background: 'rgba(8,145,178,0.08)', border: '1px solid rgba(8,145,178,0.2)', borderRadius: '6px', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 600, color: '#0891B2' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0891B2', fontWeight: 700, fontSize: '0.85rem' }}>
                  <span>{t('home.bento.explore', '자세히 보기')}</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          </BentoCard>

          {/* Sync Series – 2×1 */}
          <BentoCard
            delay={0.1}
            className="bento-span-2"
            style={{ gridColumn: 'span 2' }}
            variant="light"
          >
            <Link to={`/${lang}/sync-series`}>
              <div style={{ padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    {[
                      { color: '#0891B2', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
                      { color: '#0D9488', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                      { color: '#3B82F6', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                      { color: '#8B5CF6', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg> },
                    ].map((item, i) => (
                      <div key={i} style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        background: item.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{item.icon}</div>
                    ))}
                  </div>
                  <h3 className="bento-card-title-md" style={{ color: '#0F172A', marginBottom: '8px' }}>Sync Series</h3>
                  <p style={{ color: '#64748B', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {t('home.bento.sync.desc', '모든 테스트 워크플로우를 하나의 파이프라인으로 통합')}
                  </p>
                </div>
                <div style={{ color: '#0891B2', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{t('home.bento.explore', '자세히 보기')}</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          </BentoCard>

          {/* Commerce & Logi – 1×1 */}
          <BentoCard
            delay={0.15}
            style={{ gridColumn: 'span 1' }}
            variant="teal"
          >
            <Link to={`/${lang}/commercelogi`}>
              <div style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'linear-gradient(135deg,#0891b2,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 4px 12px rgba(6,182,212,0.3)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  </div>
                  <h3 className="bento-card-title-sm" style={{ color: '#0F172A', marginBottom: '6px', lineHeight: 1.3 }}>
                    Commerce<br/>& Logi
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.5 }}>
                    {t('home.bento.commerce.desc', 'AI 커머스 & 스마트 물류')}
                  </p>
                </div>
                <div style={{ color: '#0D9488', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>→</span>
                </div>
              </div>
            </Link>
          </BentoCard>

          {/* Let's Talk CTA – 1×1 dark */}
          <BentoCard
            delay={0.2}
            style={{ gridColumn: 'span 1' }}
            variant="dark"
          >
            <Link to={`/${lang}/contact`}>
              <div style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'linear-gradient(135deg,#0891b2,#10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 4px 12px rgba(8,145,178,0.3)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <h3 className="bento-card-title-sm" style={{ color: '#FFFFFF', marginBottom: '6px', lineHeight: 1.3 }}>
                    {t('home.bento.contact.title', "Let's Talk")}
                  </h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.8rem', lineHeight: 1.5 }}>
                    {t('home.bento.contact.desc', '전문가와 직접 상담')}
                  </p>
                </div>
                <div style={{ color: '#00D1B2', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>→</span>
                </div>
              </div>
            </Link>
          </BentoCard>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
          {[
            { value: '100%', label: t('home.performance.stat1', '테스트 케이스 검증율') },
            { value: '< 0.8s', label: t('home.performance.stat2', '평균 응답 시간') },
            { value: '80%', label: t('home.performance.stat3', 'TC 생성 시간 절감') },
            { value: '10,000+', label: t('home.performance.stat4', '월간 실행 테스트 수') },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-gradient-primary stat-value" style={{ marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: 500 }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Trusted Clients Marquee ── */}
      <section style={{ padding: '60px 0', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px', color: '#94A3B8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em' }}>
          {t('home.trusted.title', 'TRUSTED BY ENTERPRISE')}
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 32s linear infinite', willChange: 'transform' }}>
            {[...Array(4)].map((_, setIdx) =>
              ['LG전자', '삼성전자 DS', '효성ITX', '비상교육', 'SK매직', '홈플러스', '펜타시큐리티', 'LX하우시스'].map((name, i) => (
                <span key={`${setIdx}-${i}`} style={{ color: '#94A3B8', fontSize: '0.9rem', fontWeight: 600, padding: '0 36px', whiteSpace: 'nowrap', flexShrink: 0 }}>{name}</span>
              ))
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

const variantStyles = {
  primary: {
    background: 'rgba(255, 255, 255, 0.95)',
  },
  light: {
    background: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(255, 255, 255, 1)'
  },
  teal: {
    background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',

  },
  dark: {
    background: 'linear-gradient(135deg, #0F172A 0%, #0C2340 50%, #0F172A 100%)',
  }
};

const BentoCard = ({ children, style, className, href, delay = 0, variant = 'light' }) => {
  const vs = variantStyles[variant];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className={className}
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
        backdropFilter: 'blur(20px)',
        ...vs,
        ...style
      }}
      onClick={() => { if (href) window.location.href = href; }}
    >
      {children}
    </motion.div>
  );
};

export default Home;
