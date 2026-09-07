const downloadLink = {
  "version": "0.0.28",
  "releaseNote": "",
  "files": {
    "winX64": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/releases/eta/0.0.28/win/x64/SyncETA%20Setup%200.0.28.exe",
    "winArm64": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/releases/eta/0.0.28/win/x64/SyncETA%20Setup%200.0.28.exe",
    "macIntel": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/releases/SyncETA-0.0.28.dmg",
    "macSilicon": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/releases/SyncETA-0.0.28-arm64.dmg"
  }
};

const updateLink = (id, url) => {
  const el = document.getElementById(id);

  if (el && url) {
    el.href = url;
    el.setAttribute('target', '_blank');
  }
};

updateLink('winArm64', downloadLink.files.winArm64);
updateLink('winX64', downloadLink.files.winX64);
updateLink('macIntel', downloadLink.files.macIntel);
updateLink('macSilicon', downloadLink.files.macSilicon);
