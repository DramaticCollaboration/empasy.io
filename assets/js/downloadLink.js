const downloadLink = {
    "version": "0.0.76",
    "releaseNote": "",
    "files": {
        "winX64": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/SyncETA+Setup+0.0.17.exe",
        "winArm64": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/SyncETA+Setup+0.0.17.exe",
        "macIntel": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/SyncETA-0.0.14.dmg",
        "macSilicon": "https://synceta-release.s3.ap-northeast-2.amazonaws.com/SyncETA-0.0.14-arm64.dmg"
    }
}


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