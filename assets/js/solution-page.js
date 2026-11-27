/**
 * Generic DOM-driven controller for Empasy product solution pages (KO / EN / JA).
 * Reads all localized labels and slide metadata from HTML data-* attributes.
 */
(function () {
  function initSolutionPage() {
    // 1. Interactive Screenshot Showcase Tabs
    var showcase = document.querySelector('[data-sol-showcase]');
    var imgEl = showcase ? showcase.querySelector('[data-sol-img]') : null;
    var titleEl = showcase ? showcase.querySelector('[data-sol-title]') : null;
    var routeEl = showcase ? showcase.querySelector('[data-sol-route]') : null;
    var demoLinkEl = showcase ? showcase.querySelector('[data-sol-demo-link]') : null;
    var captionEl = showcase ? showcase.querySelector('[data-sol-caption]') : null;
    var imgBtnEl = showcase ? showcase.querySelector('[data-sol-img-btn]') : null;
    var productName = showcase ? (showcase.getAttribute('data-sol-product') || '') : '';

    var lightbox = document.getElementById('sol-lightbox');
    var lbImg = document.getElementById('sol-lightbox-img');
    var lbTitle = document.getElementById('sol-lightbox-title');
    var lbClose = document.getElementById('sol-lightbox-close');

    function isAsciiRoute(text) {
      return /^[A-Za-z0-9._/:-]+$/.test(text || '');
    }

    function selectSlideTab(btn) {
      if (!showcase || !btn) return;
      var tabs = showcase.querySelectorAll('[data-sol-tab]');
      tabs.forEach(function (t) {
        var active = t === btn;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      var slideTitle = btn.getAttribute('data-slide-title') || '';
      var slideRoute = btn.getAttribute('data-slide-route') || '';
      var slideSummary = btn.getAttribute('data-slide-summary') || '';
      var slideImg = btn.getAttribute('data-slide-img') || '';
      var slideDemo = btn.getAttribute('data-slide-demo') || '';
      var slideExternal = btn.getAttribute('data-slide-external') === 'true';

      if (titleEl) titleEl.textContent = slideTitle;
      if (routeEl) {
        routeEl.textContent = slideRoute;
        routeEl.classList.toggle('is-mono', isAsciiRoute(slideRoute));
      }
      if (captionEl) captionEl.textContent = slideSummary;
      if (imgEl && slideImg) {
        imgEl.setAttribute('src', slideImg);
        imgEl.setAttribute('alt', productName ? (productName + ' - ' + slideTitle) : slideTitle);
      }
      if (imgBtnEl) {
        imgBtnEl.setAttribute('aria-label', (productName ? productName + ' ' : '') + slideTitle);
      }
      if (demoLinkEl) {
        if (slideDemo) {
          demoLinkEl.setAttribute('href', slideDemo);
          demoLinkEl.style.display = '';
          if (slideExternal) {
            demoLinkEl.setAttribute('target', '_blank');
            demoLinkEl.setAttribute('rel', 'noopener noreferrer');
          } else {
            demoLinkEl.removeAttribute('target');
            demoLinkEl.removeAttribute('rel');
          }
        } else {
          demoLinkEl.style.display = 'none';
        }
      }
    }

    if (showcase) {
      showcase.querySelectorAll('[data-sol-tab]').forEach(function (tab) {
        tab.addEventListener('click', function () {
          selectSlideTab(tab);
        });
      });
    }

    // 1-2. Ecosystem Context Map Drawer Toggle
    var ctxToggle = document.querySelector('[data-sol-ctx-toggle]');
    var ctxDrawer = document.querySelector('[data-sol-ctx-drawer]');
    if (ctxToggle && ctxDrawer) {
      ctxToggle.addEventListener('click', function () {
        var nextOpen = ctxDrawer.hasAttribute('hidden');
        if (nextOpen) {
          ctxDrawer.removeAttribute('hidden');
        } else {
          ctxDrawer.setAttribute('hidden', '');
        }
        ctxToggle.setAttribute('aria-expanded', nextOpen ? 'true' : 'false');
        var nextText = nextOpen
          ? ctxToggle.getAttribute('data-label-collapse')
          : ctxToggle.getAttribute('data-label-expand');
        if (nextText) ctxToggle.textContent = nextText;
      });
    }

    // 2. Lightbox Zoom
    function openLightbox() {
      if (!lightbox || !lbImg || !imgEl) return;
      var src = imgEl.getAttribute('src') || '';
      var title = titleEl ? (titleEl.textContent || '') : (imgEl.getAttribute('alt') || '');
      if (!src) return;
      lbImg.setAttribute('src', src);
      lbImg.setAttribute('alt', productName ? (productName + ' - ' + title) : title);
      if (lbTitle) lbTitle.textContent = title;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (showcase) {
      var zoomBtn = showcase.querySelector('[data-sol-zoom]');
      if (zoomBtn) zoomBtn.addEventListener('click', openLightbox);
      if (imgBtnEl) imgBtnEl.addEventListener('click', openLightbox);
    }
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
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

    // 3. One-Click Demo Credential Copy + Toast Feedback
    var toastEl = document.getElementById('sol-copy-toast');
    var toastTimer = null;
    var activeCopyBtn = null;
    var copiedTimer = null;

    function showToast(msg) {
      if (!toastEl || !msg) return;
      toastEl.textContent = msg;
      toastEl.classList.add('is-visible');
      if (toastTimer) window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(function () {
        toastEl.classList.remove('is-visible');
      }, 2400);
    }

    document.querySelectorAll('[data-copy-value]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-copy-value') || '';
        var label = btn.getAttribute('data-copy-label') || '';
        var copiedText = btn.getAttribute('data-copied-text') || '';
        var copyText = btn.getAttribute('data-copy-text') || '';
        var toastTpl = btn.getAttribute('data-toast-template') || '{label}: {value}';
        if (!val) return;

        var done = function () {
          if (activeCopyBtn && activeCopyBtn !== btn) {
            activeCopyBtn.classList.remove('is-copied');
            var prevAction = activeCopyBtn.querySelector('[data-copy-action]');
            if (prevAction) prevAction.textContent = activeCopyBtn.getAttribute('data-copy-text') || '';
          }
          activeCopyBtn = btn;
          btn.classList.add('is-copied');
          var actionEl = btn.querySelector('[data-copy-action]');
          if (actionEl && copiedText) actionEl.textContent = copiedText;
          if (copiedTimer) window.clearTimeout(copiedTimer);
          copiedTimer = window.setTimeout(function () {
            btn.classList.remove('is-copied');
            if (actionEl && copyText) actionEl.textContent = copyText;
          }, 2000);

          var message = toastTpl.replace('{label}', label).replace('{value}', val);
          showToast(message);
        };

        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          navigator.clipboard.writeText(val).then(done).catch(function () {});
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSolutionPage);
  } else {
    initSolutionPage();
  }
})();
