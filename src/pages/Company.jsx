import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Company.css';

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const historyItems = [
  { yearKey: 'y2024', color: '#0891b2', shadowColor: 'rgba(6,182,212,0.2)', side: 'left' },
  { yearKey: 'y2023', color: '#14b8a6', shadowColor: 'rgba(20,184,166,0.2)', side: 'right' },
  { yearKey: 'y2022', color: '#10b981', shadowColor: 'rgba(16,185,129,0.2)', side: 'left' },
];

const yearLabels = { y2024: '2024', y2023: '2023', y2022: '2022' };

const leadershipMembers = [
  { nameKey: 'company.team.member1.name', roleKey: 'company.team.member1.role', imagePath: '/team/poh.png', desc: 'company.team.member1.desc' },
  { nameKey: 'company.team.member2.name', roleKey: 'company.team.member2.role', imagePath: '/team/Kyle.webp', desc: 'company.team.member2.desc' },
  { nameKey: 'company.team.member3.name', roleKey: 'company.team.member3.role', imagePath: '/team/kenny.png', desc: 'company.team.member3.desc' },
  { nameKey: 'company.team.member4.name', roleKey: 'company.team.member4.role', imagePath: '/team/jade.jpg', desc: 'company.team.member4.desc' },
];

const Company = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'ko';

  const subtitleLines = t('company.page.subtitle').split('\n');

  return (
    <div className="company-page">
      {/* Background blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="animate-blob" style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '50%', borderRadius: '50%', background: 'rgba(34,211,238,0.12)', filter: 'blur(120px)' }} />
        <div className="animate-blob animation-delay-2000" style={{ position: 'absolute', top: '20%', right: '-10%', width: '45%', height: '60%', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', filter: 'blur(140px)' }} />
        <div className="animate-blob animation-delay-4000" style={{ position: 'absolute', bottom: '-20%', left: '20%', width: '50%', height: '50%', borderRadius: '50%', background: 'rgba(59,130,246,0.08)', filter: 'blur(130px)' }} />
      </div>

      <main className="company-main">
        {/* Hero */}
        <section className="company-hero">
          {/* Floating dots */}
          <span className="animate-pulse-slow" style={{ position: 'absolute', top: '80px', left: '20%', width: '12px', height: '12px', borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 15px rgba(34,211,238,0.6)', display: 'block' }} />
          <span className="animate-pulse-slow" style={{ position: 'absolute', bottom: '80px', right: '25%', width: '16px', height: '16px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 20px rgba(52,211,153,0.6)', animationDelay: '1s', display: 'block' }} />
          <span className="animate-pulse-slow" style={{ position: 'absolute', top: '160px', right: '15%', width: '8px', height: '8px', borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 10px rgba(96,165,250,0.6)', animationDelay: '2s', display: 'block' }} />

          <div className="company-network-bg" />
          <motion.div className="company-hero-inner" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="company-badge">
              <span style={{ position: 'relative', display: 'inline-flex', marginRight: '8px', width: '10px', height: '10px' }}>
                <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#06B6D4', opacity: 0.75 }} />
                <span style={{ position: 'relative', display: 'inline-flex', width: '10px', height: '10px', borderRadius: '50%', background: '#0891B2' }} />
              </span>
              {t('company.page.badge')}
            </span>
            <h1 className="company-title">
              <span className="company-gradient-text">{t('company.page.title')}</span>
            </h1>
            <p className="company-subtitle">
              {subtitleLines[0]}{subtitleLines[1] && <><br className="company-br-md" />{subtitleLines[1]}</>}
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="company-section company-mv-section">
          <div className="company-mv-grid">
            {[
              {
                iconColor: 'cyan',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="2" /></svg>,
                titleKey: 'company.page.mission.title',
                descKey: 'company.page.mission.desc',
              },
              {
                iconColor: 'emerald',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>,
                titleKey: 'company.page.vision.title',
                descKey: 'company.page.vision.desc',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="company-glass-panel company-mv-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className={`company-icon-box company-icon-box--${item.iconColor}`}>{item.icon}</div>
                <h3 className="company-mv-title">{t(item.titleKey)}</h3>
                <p className="company-mv-desc">{t(item.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* History */}
        <motion.section
          className="company-section company-history-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="company-section-header">
            <h2 className="company-section-title">{t('company.page.history.title')}</h2>
            <p className="company-section-subtitle">{t('company.page.history.subtitle')}</p>
          </div>
          <div className="company-timeline">
            <div className="company-timeline-line" />
            <div className="company-timeline-items">
              {historyItems.map(({ yearKey, color, shadowColor, side }) => (
                <div key={yearKey} className="company-timeline-row">
                  {side === 'left' ? (
                    <>
                      <div className="company-timeline-content company-timeline-content--right">
                        <h4 className="company-timeline-year" style={{ color }}>{yearLabels[yearKey]}</h4>
                        <p className="company-timeline-item-title">{t(`company.page.history.${yearKey}.title`)}</p>
                        <p className="company-timeline-item-desc">{t(`company.page.history.${yearKey}.desc`)}</p>
                      </div>
                      <div className="company-timeline-dot" style={{ background: color, boxShadow: `0 0 0 4px ${shadowColor}` }} />
                      <div className="company-timeline-content" />
                    </>
                  ) : (
                    <>
                      <div className="company-timeline-content" />
                      <div className="company-timeline-dot" style={{ background: color, boxShadow: `0 0 0 4px ${shadowColor}` }} />
                      <div className="company-timeline-content company-timeline-content--left">
                        <h4 className="company-timeline-year" style={{ color }}>{yearLabels[yearKey]}</h4>
                        <p className="company-timeline-item-title">{t(`company.page.history.${yearKey}.title`)}</p>
                        <p className="company-timeline-item-desc">{t(`company.page.history.${yearKey}.desc`)}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Leadership */}
        <section className="company-section company-leadership-section">
          <motion.div
            className="company-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="company-section-title">{t('company.page.leadership.title')}</h2>
            <p className="company-section-subtitle">{t('company.page.leadership.subtitle')}</p>
          </motion.div>
          <div className="company-leadership-grid">
            {leadershipMembers.map((member, i) => (
              <motion.div
                key={i}
                className="company-leader-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <div className="company-leader-photo">
                  <div className="company-leader-overlay" />
                    <img src={member.imagePath} alt={t(member.nameKey)} className="company-leader-img" />
                </div>
                <h4 className="company-leader-name">{t(member.nameKey)}</h4>
                <p className="company-leader-role">{t(member.roleKey)}</p>
                <h4>{t(member.desc)}</h4>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recruit CTA */}
        <section className="company-section company-cta-section">
          <motion.div
            className="company-cta-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', background: 'rgba(6,182,212,0.2)', borderRadius: '50%', filter: 'blur(120px)', transform: 'translate(33%, -33%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '500px', height: '500px', background: 'rgba(16,185,129,0.2)', borderRadius: '50%', filter: 'blur(120px)', transform: 'translate(-33%, 33%)', pointerEvents: 'none' }} />
            <h2 className="company-cta-title">{t('company.page.recruit.title')}</h2>
            <p className="company-cta-desc">{t('company.page.recruit.desc')}</p>
            <Link
              to={`/${currentLang}/contact`}
              state={{ interest: 'Other' }}
              className="company-cta-btn"
            >
              {t('company.page.recruit.btn')}
            </Link>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Company;
