const downloadLink = {
  "version": "0.0.66",
  "releaseNote": "",
  "files": {
    "winX64": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/releases/eta/0.0.66/win/x64/SyncETA%20Setup%200.0.66.exe",
    "winArm64": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/releases/eta/0.0.66/win/x64/SyncETA%20Setup%200.0.66.exe",
    "macIntel": "",
    "macSilicon": ""
  }
};

const updateLink = (id, url) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.hidden = !url;
  if (!url) return;
  el.href = url;
  el.setAttribute('target', '_blank');
};

updateLink('winArm64', downloadLink.files.winArm64);
updateLink('winX64', downloadLink.files.winX64);
updateLink('macIntel', downloadLink.files.macIntel);
updateLink('macSilicon', downloadLink.files.macSilicon);
