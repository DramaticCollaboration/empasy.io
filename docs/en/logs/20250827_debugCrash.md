---
title: Linux Electron Debugging Crash
description: Memories fade quickly, but logs are forever! 🎯 Our team's fun and free work record space
head:
  - - meta
    - name: keywords
      content: Let's write down what we studied
  - - meta
    - property: og:title
      content: Work Log Playground - Free Work Record Space 🎪
  - - meta
    - property: og:description
      content: This is a space where team members freely record and share work logs. We introduce a fun work log system that you can conveniently add to whenever you need without any force.
  - - meta
    - property: og:image
      content: https://empasy.io/docs/images/favicon.png
  - - meta
    - property: og:url
      content: https://empasy.io/study/
sort: 400
---

# "ENOSPC: System limit for number of file watchers reached" error where the app suddenly dies during debugging in Linux

Solution 1) Increase Linux inotify watcher limit (Recommended)

- Check current value:

```shell script
# Bash
  cat /proc/sys/fs/inotify/max_user_watches
  cat /proc/sys/fs/inotify/max_user_instances
```

- Temporary increase (Applied immediately):

```shell script
# Bash (requires sudo)
  sudo sysctl fs.inotify.max_user_watches=524288
  sudo sysctl fs.inotify.max_user_instances=1024
```

- Permanent setting (Maintained even after reboot):

```shell script
# Bash (requires sudo)
  echo 'fs.inotify.max_user_watches=524288' | sudo tee /etc/sysctl.d/99-inotify.conf
  echo 'fs.inotify.max_user_instances=1024' | sudo tee -a /etc/sysctl.d/99-inotify.conf
  sudo sysctl -p /etc/sysctl.d/99-inotify.conf
```

- Afterwards, run again: `yarn dev:debug`

Solution 2) Use polling instead of Watcher (Alternative/Immediate first aid)

- Test just once:

```shell script
CHOKIDAR_USEPOLLING=1 CHOKIDAR_INTERVAL=800 yarn dev:debug
```

- If you plan to use it often, add `CHOKIDAR_USEPOLLING=1` and `CHOKIDAR_INTERVAL=800` to the Environment variables of your Run/Debug configuration
