---
title: Linux Electron デバッグ Crash
description: 記憶はすぐに消えますが、ログは永遠です！🎯 私たちのチームの楽しくて自由な作業記録スペース
head:
  - - meta
    - name: keywords
      content: 勉強したことを書いてみましょう
  - - meta
    - property: og:title
      content: 作業ログの遊び場 - 自由な作業記録スペース 🎪
  - - meta
    - property: og:description
      content: ここはチームメンバーが自由に作業ログを記録して共有するスペースです。強制なしで必要な時に気軽に追加できる楽しい作業ログシステムを紹介します。
  - - meta
    - property: og:image
      content: https://empasy.io/docs/images/favicon.png
  - - meta
    - property: og:url
      content: https://doc.empasy.com/study/
sort: 400
---

# Linuxでデバッグ中にアプリが突然落ちる「ENOSPC: System limit for number of file watchers reached」エラー

解決 1) Linux inotify watcher 制限の増加 (推奨)

- 現在の値を確認:

```shell script
# Bash
  cat /proc/sys/fs/inotify/max_user_watches
  cat /proc/sys/fs/inotify/max_user_instances
```

- 一時的な増加 (即時適用):

```shell script
# Bash (sudo が必要)
  sudo sysctl fs.inotify.max_user_watches=524288
  sudo sysctl fs.inotify.max_user_instances=1024
```

- 永続的な設定 (再起動後も維持):

```shell script
# Bash (sudo が必要)
  echo 'fs.inotify.max_user_watches=524288' | sudo tee /etc/sysctl.d/99-inotify.conf
  echo 'fs.inotify.max_user_instances=1024' | sudo tee -a /etc/sysctl.d/99-inotify.conf
  sudo sysctl -p /etc/sysctl.d/99-inotify.conf
```

- その後、再度: `yarn dev:debug` を実行

解決 2) Watcherの代わりにポーリングを使用 (代替/即時応急処置)

- 1回だけテスト:

```shell script
CHOKIDAR_USEPOLLING=1 CHOKIDAR_INTERVAL=800 yarn dev:debug
```

- 頻繁に使用する場合は、Run/Debug構成の Environment variables に `CHOKIDAR_USEPOLLING=1`、`CHOKIDAR_INTERVAL=800` を追加
