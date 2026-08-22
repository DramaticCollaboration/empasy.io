---
title: Git Flow
description: A complete Git Flow guide for team collaboration. We explain step-by-step branch structure, commit message rules, and release and hotfix management methods easily.
head:
  - - meta
    - name: keywords
      content: git flow, git flow guide, git branching strategy, feature branch, develop branch, release branch, hotfix branch, git commit message, git collaboration, git workflow
  - - meta
    - property: og:title
      content: Scrumban
  - - meta
    - property: og:description
      content: A complete Git Flow guide for team collaboration. We explain step-by-step branch structure, commit message rules, and release and hotfix management methods easily.
  - - meta
    - property: og:image
      content: https://empasy.io/docs/images/favicon.png
  - - meta
    - property: og:url
      content: https://empasy.io/agile/activity.html
sort: 4000
---

#  Git Flow Guide

## 1. What is Git Flow?

- **Git branching strategy for collaboration**
- Feature development, bug fixes, and deployments can be managed structurally
- Advantages:
  - Minimizes confusion through role-based branches
  - Stable deployment process
  - Suitable for team-level collaboration

---

## 2. Types of Branches

Git Flow mainly uses 5 main branches.

1. **main (master)**

- Stable code deployed to production (live service)
- Always maintained in a deployable state

2. **develop**

- Integration branch for developing the next version
- Central branch where all features and bug fixes are merged

3. **feature/**

- Branch for developing new features
- Branched from `develop` → Merged back into `develop` after development is complete
- Naming examples:
  - `feature/login-api`
  - `feature/ui-redesign`

4. **release/**

- Branch for preparing for deployment
- Branched from `develop` → Bug fixes after QA/Testing → Merged into both `main` and `develop`
- Naming examples:
  - `release/1.2.0`

5. **hotfix/**

- For urgent bug fixes in production
- Branched from `main` → Merged into `main` and `develop` after fixing
- Naming examples:
  - `hotfix/1.2.1`

---

## 3. Git Flow Branch Flow

```
main -----------●------------------●------------------->
                ↑                  ↑
                │                  │
       release/1.2.0        hotfix/1.2.1
                ↑
develop ----●---●---●---●---●---●---●----------------->
             ↑   ↑
             │   │
feature/login   feature/payment
```

---

## 4. Git Flow Working Order

### (1) New Feature Development

```bash
git checkout develop
git checkout -b feature/feature-name
# After coding
git add .
git commit -m "feat: feature description"
git checkout develop
git merge --no-ff feature/feature-name
git branch -d feature/feature-name
```

### (2) Deployment Preparation

```bash
git checkout develop
git checkout -b release/1.2.0
# QA / Bug fixes
git commit -m "fix: release QA bug fixes"
git checkout main
git merge --no-ff release/1.2.0
git tag -a 1.2.0 -m "Release 1.2.0"
git checkout develop
git merge --no-ff release/1.2.0
git branch -d release/1.2.0
```

### (3) Urgent Bug Fix

```bash
git checkout main
git checkout -b hotfix/1.2.1
# Bug fixes
git commit -m "fix: urgent bug fix"
git checkout main
git merge --no-ff hotfix/1.2.1
git tag -a 1.2.1 -m "Hotfix 1.2.1"
git checkout develop
git merge --no-ff hotfix/1.2.1
git branch -d hotfix/1.2.1
```

---

## 5. Commit Message Convention (Recommended: Angular Style)

- `feat`: Add new feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (semicolons, formatting, etc.)
- `refactor`: Refactoring (no functional changes)
- `test`: Related to test code
- `chore`: Changes to build/tool settings

Examples:

```
feat(auth): implement login API
fix(ui): fix broken buttons on mobile screens
```

---

## 6. Git Flow Collaboration Checklist

✅ All features start from a `feature/` branch
✅ Do not commit directly to the `develop` branch, only merge
✅ Deployment must proceed through a `release/` branch
✅ Urgent fixes are handled directly via a `hotfix/` branch
✅ Use the `--no-ff` option when merging to maintain branch history
✅ Follow the commit message convention
