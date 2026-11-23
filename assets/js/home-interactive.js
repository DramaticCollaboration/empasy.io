/**
 * Generic DOM-driven controller for the Empasy landing pages (KO / EN / JA).
 * Reads localized copy and matching metadata from #ed-landing-data JSON in the page.
 */
(function () {
  function initLandingInteractive() {
    var configEl = document.getElementById('ed-landing-data');
    var config = null;
    if (configEl) {
      try {
        config = JSON.parse(configEl.textContent || '{}');
      } catch (err) {
        console.error('Failed to parse landing configuration:', err);
      }
    }

    // 1. Hero Screen Preview Tabs & Visual Callout Pills
    var previewTitle = document.getElementById('preview-title');
    var previewLink = document.getElementById('preview-link');
    var previewImg = document.getElementById('preview-img');
    var previewCaption = document.getElementById('preview-caption');
    var previewCallout = document.getElementById('preview-callout');
    var previewMap = config && config.previews ? config.previews : null;

    function renderCallouts(list) {
      if (!previewCallout || !Array.isArray(list)) return;
      previewCallout.innerHTML = '';
      list.forEach(function (text) {
        var pill = document.createElement('span');
        pill.className = 'ed-callout-pill';
        var dot = document.createElement('span');
        dot.className = 'ed-callout-dot';
        dot.setAttribute('aria-hidden', 'true');
        var label = document.createElement('span');
        label.textContent = text;
        pill.appendChild(dot);
        pill.appendChild(label);
        previewCallout.appendChild(pill);
      });
    }

    document.querySelectorAll('[data-preview]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-preview');
        var item = previewMap && previewMap[key];
        if (!item) return;
        document.querySelectorAll('[data-preview]').forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        if (previewTitle) previewTitle.textContent = item.title;
        if (previewLink) previewLink.setAttribute('href', item.link);
        if (previewImg) {
          previewImg.setAttribute('src', item.img);
          previewImg.setAttribute('alt', item.title);
        }
        if (previewCaption) previewCaption.textContent = item.caption;
        if (item.callouts) renderCallouts(item.callouts);
      });
    });

    // 2. Extension Module Category Tabs
    function activateExtTab(key) {
      var targetBtn = document.querySelector('[data-ext="' + key + '"]');
      if (!targetBtn) return;
      document.querySelectorAll('[data-ext]').forEach(function (b) {
        var active = b.getAttribute('data-ext') === key;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      document.querySelectorAll('[data-ext-pane]').forEach(function (pane) {
        pane.classList.toggle('active', pane.getAttribute('data-ext-pane') === key);
      });
    }

    document.querySelectorAll('[data-ext]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateExtTab(btn.getAttribute('data-ext'));
      });
    });

    // Role cards that jump directly to a specific extension module tab
    document.querySelectorAll('[data-jump-ext]').forEach(function (link) {
      link.addEventListener('click', function () {
        var extKey = link.getAttribute('data-jump-ext');
        if (extKey) activateExtTab(extKey);
      });
    });

    // 3. 30-Second Interactive Module Finder
    var finderRoot = document.getElementById('ed-finder-app');
    if (finderRoot && config && config.finder) {
      var finderCfg = config.finder;
      var state = { step: 1, goal: '', audience: '', deploy: '' };

      var stepPills = finderRoot.querySelectorAll('[data-finder-step-btn]');
      var panes = finderRoot.querySelectorAll('[data-finder-pane]');
      var resetBtn = finderRoot.querySelector('[data-finder-reset]');

      function showFinderStep(stepNum) {
        state.step = stepNum;
        panes.forEach(function (pane) {
          var pNum = Number(pane.getAttribute('data-finder-pane'));
          pane.classList.toggle('is-active', pNum === stepNum);
        });
        stepPills.forEach(function (pill) {
          var pNum = Number(pill.getAttribute('data-finder-step-btn'));
          var isDone =
            (pNum === 1 && Boolean(state.goal)) ||
            (pNum === 2 && Boolean(state.audience)) ||
            (pNum === 3 && Boolean(state.deploy));
          pill.classList.toggle('is-active', pNum === stepNum);
          pill.classList.toggle('is-done', isDone && pNum !== stepNum);
          var canClick = pNum === 1 || (pNum === 2 && Boolean(state.goal)) || (pNum === 3 && Boolean(state.audience));
          pill.disabled = !canClick;
        });
      }

      function renderFinderResult() {
        var rec = finderCfg.results && finderCfg.results[state.goal];
        if (!rec) return;

        var titleEl = finderRoot.querySelector('[data-result-title]');
        var descEl = finderRoot.querySelector('[data-result-desc]');
        var pNameEl = finderRoot.querySelector('[data-primary-name]');
        var pCodeEl = finderRoot.querySelector('[data-primary-code]');
        var pDescEl = finderRoot.querySelector('[data-primary-desc]');
        var sNameEl = finderRoot.querySelector('[data-secondary-name]');
        var sCodeEl = finderRoot.querySelector('[data-secondary-code]');
        var sDescEl = finderRoot.querySelector('[data-secondary-desc]');
        var noteEl = finderRoot.querySelector('[data-result-note]');
        var contactBtn = finderRoot.querySelector('[data-result-contact]');
        var demoBtn = finderRoot.querySelector('[data-result-demo]');

        if (titleEl) titleEl.textContent = rec.title;
        if (descEl) descEl.textContent = rec.summary;
        if (pNameEl) pNameEl.textContent = rec.primaryTitle;
        if (pCodeEl) pCodeEl.textContent = rec.primaryCode;
        if (pDescEl) pDescEl.textContent = rec.primaryDesc;
        if (sNameEl) sNameEl.textContent = rec.secondaryTitle;
        if (sCodeEl) sCodeEl.textContent = rec.secondaryCode;
        if (sDescEl) sDescEl.textContent = rec.secondaryDesc;

        var audienceNote = (finderCfg.audienceNotes && finderCfg.audienceNotes[state.audience]) || '';
        var deployNote = (finderCfg.deployNotes && finderCfg.deployNotes[state.deploy]) || '';
        if (noteEl) {
          noteEl.textContent = [audienceNote, deployNote].filter(Boolean).join(' ');
        }

        if (contactBtn) {
          var params = new URLSearchParams();
          if (rec.topicKey) params.set('topics', rec.topicKey);
          params.set('rec', rec.primaryCode + ' + ' + rec.secondaryCode);
          if (state.deploy === 'onprem') params.set('onprem', '1');
          contactBtn.setAttribute('href', finderCfg.contactUrl + '?' + params.toString());
        }

        if (demoBtn) {
          demoBtn.setAttribute('href', rec.demoUrl);
        }

        showFinderStep(4);
      }

      finderRoot.querySelectorAll('[data-finder-choice]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var field = btn.getAttribute('data-finder-field');
          var val = btn.getAttribute('data-finder-choice');
          if (!field || !val) return;
          state[field] = val;

          finderRoot.querySelectorAll('[data-finder-field="' + field + '"]').forEach(function (b) {
            b.classList.toggle('is-selected', b === btn);
          });

          if (field === 'goal') {
            showFinderStep(2);
          } else if (field === 'audience') {
            showFinderStep(3);
          } else if (field === 'deploy') {
            renderFinderResult();
          }
        });
      });

      stepPills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          var target = Number(pill.getAttribute('data-finder-step-btn'));
          if (target >= 1 && target <= 3) {
            showFinderStep(target);
          }
        });
      });

      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          state = { step: 1, goal: '', audience: '', deploy: '' };
          finderRoot.querySelectorAll('[data-finder-choice]').forEach(function (b) {
            b.classList.remove('is-selected');
          });
          showFinderStep(1);
        });
      }

      showFinderStep(1);
    }

    // 4. Screenshot Zoom Lightbox
    var lightbox = document.getElementById('emp-lightbox');
    var lightboxImg = document.getElementById('emp-lightbox-img');
    var lightboxTitle = document.getElementById('emp-lightbox-title');
    var lightboxClose = document.getElementById('emp-lightbox-close');

    function openLightbox(src, title) {
      if (!lightbox || !lightboxImg || !src) return;
      lightboxImg.setAttribute('src', src);
      lightboxImg.setAttribute('alt', title || '');
      if (lightboxTitle) lightboxTitle.textContent = title || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    var previewZoomBtn = document.getElementById('preview-zoom-btn');
    if (previewImg) {
      previewImg.addEventListener('click', function () {
        openLightbox(previewImg.getAttribute('src'), previewTitle ? previewTitle.textContent : previewImg.getAttribute('alt'));
      });
    }
    if (previewZoomBtn && previewImg) {
      previewZoomBtn.addEventListener('click', function () {
        openLightbox(previewImg.getAttribute('src'), previewTitle ? previewTitle.textContent : previewImg.getAttribute('alt'));
      });
    }
    document.querySelectorAll('.ed-flagship-thumb img').forEach(function (img) {
      img.addEventListener('click', function () {
        openLightbox(img.getAttribute('src'), img.getAttribute('alt'));
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });

    // 5. Cookie Consent Banner
    var consentKey = 'empasy_cookie_consent';
    var banner = document.getElementById('emp-cookie-banner');
    var btnAccept = document.getElementById('emp-cookie-accept');
    var btnEssential = document.getElementById('emp-cookie-essential');
    if (banner) {
      var saved = null;
      try {
        saved = localStorage.getItem(consentKey);
      } catch (err) {}
      if (!saved) {
        banner.style.display = 'block';
      }
      function applyConsent(status) {
        try {
          localStorage.setItem(consentKey, status);
        } catch (err) {}
        if (typeof window.gtag === 'function') {
          var granted = status === 'granted' ? 'granted' : 'denied';
          window.gtag('consent', 'update', {
            analytics_storage: granted,
            ad_storage: granted,
            ad_user_data: granted,
            ad_personalization: granted
          });
        }
        banner.style.display = 'none';
      }
      if (btnAccept) btnAccept.addEventListener('click', function () { applyConsent('granted'); });
      if (btnEssential) btnEssential.addEventListener('click', function () { applyConsent('denied'); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLandingInteractive);
  } else {
    initLandingInteractive();
  }
})();
