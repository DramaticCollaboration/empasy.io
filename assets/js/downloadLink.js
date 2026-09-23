const downloadLink = {
  "version": "0.0.41",
  "releaseNote": "https://doc.empasy.com/synceta/release-notes/",
  "files": {
    "winX64": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/releases/eta/0.0.41/win/x64/SyncETA%20Setup%200.0.41.exe",
    "winArm64": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/releases/eta/0.0.41/win/x64/SyncETA%20Setup%200.0.41.exe",
    "macIntel": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/releases/SyncETA-0.0.41.dmg",
    "macSilicon": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/releases/SyncETA-0.0.41-arm64.dmg"
  }
};

const updateLink = (id, url) => {
  const el = document.getElementById(id);
  if (el && url) {
    el.href = url;
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  }
};

const detectAndHighlightOS = () => {
  const userAgent = navigator.userAgent || '';
  const platform = navigator.platform || '';
  let detectedId = null;

  const isMac = /Mac/i.test(platform) || /Macintosh/i.test(userAgent);
  const isWindows = /Win/i.test(platform) || /Windows/i.test(userAgent);

  if (isMac) {
    // Apple Silicon detection heuristic (WebGL unmasked renderer or canvas)
    let isAppleSilicon = false;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (/Apple/i.test(renderer) && !/Intel/i.test(renderer)) {
            isAppleSilicon = true;
          }
        }
      }
    } catch {
      isAppleSilicon = true; // Modern Macs are predominantly Apple Silicon
    }
    detectedId = isAppleSilicon ? 'macSilicon' : 'macIntel';
  } else if (isWindows) {
    const isArm = /ARM/i.test(userAgent) || /ARM64/i.test(userAgent);
    detectedId = isArm ? 'winArm64' : 'winX64';
  }

  if (detectedId) {
    const targetEl = document.getElementById(detectedId);
    if (targetEl) {
      const card = targetEl.closest('.glow-card');
      if (card) {
        card.classList.add('recommended-os-card');
        const badge = document.createElement('div');
        badge.className = 'recommended-os-badge';
        const lang = document.documentElement.lang || 'ko';
        const label = lang.startsWith('en')
          ? 'Recommended for your device'
          : (lang.startsWith('ja') ? 'このデバイスに推奨' : '현재 기기 권장');
        badge.textContent = label;
        card.style.position = 'relative';
        card.style.border = '2px solid #0891b2';
        card.prepend(badge);
      }
    }
  }
};

updateLink('winArm64', downloadLink.files.winArm64);
updateLink('winX64', downloadLink.files.winX64);
updateLink('macIntel', downloadLink.files.macIntel);
updateLink('macSilicon', downloadLink.files.macSilicon);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', detectAndHighlightOS);
} else {
  detectAndHighlightOS();
}

