# AGENTS.md

This document defines how AI agents and contributors should interact with this repository.
The goal is to maintain **code consistency, security, and alignment** with the project's objectives.

---

## 🎯 Project Purpose

This repository contains a **frontend project** built with **React + TypeScript + Vite**.
It is deployed via **GitHub Pages** (with a custom domain defined in `CNAME`) and serves as a **public website/portfolio**.

---

## 🛠️ Core Technologies

* **Languages:** TypeScript (54.1%), CSS (40.3%), HTML (2.8%), JavaScript (2.8%)
* **Frameworks/Tools:** React, Vite, SWC, Babel, Tailwind CSS, PostCSS
* **Linting/Quality:** ESLint with `strictTypeChecked` and `stylisticTypeChecked` rules
* **Configs:**

  * `vite.config.ts` → build
  * `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` → typing
  * `postcss.config.js`, `tailwind.config.js` → styling

---

## 🚀 Development Workflow

### Setup & Run

```bash
npm install      # install dependencies
npm run dev      # start dev server
npm run build    # create optimized build (output in dist/)
npm run preview  # preview production build
```

### CI/CD & Deployment

* Deployment is automated via **GitHub Actions** (`.github/workflows/`).
* The `dist/` folder is ignored (generated on build).
* The `CNAME` file ensures the custom domain configuration.

---

## ✅ Code Quality Guidelines

* Always respect the ESLint rules configured in this repo:

  * `tseslint.configs.strictTypeChecked`
  * `eslint-plugin-react-x` and `eslint-plugin-react-dom`
* Never break **strict type safety** in TypeScript.
* Follow **Tailwind CSS conventions** for styling.
* Write React components with explicit props typing.
* Keep code modular, clean, and reusable.

---

## 🔐 Security Considerations

* Follow the guidelines defined in `SECURITY.md`.
* Do not commit **tokens, credentials, or secrets**.
* Keep dependencies up to date and check for vulnerabilities.

---

## 🤖 Guidelines for AI Agents

### Allowed tasks

* Create new React components with TypeScript.
* Refactor code to improve readability and maintainability.
* Adjust or add styling using Tailwind CSS.
* Update documentation (README, comments).
* Improve build or lint configuration when justified.

### Restrictions

* **Do not enable React Compiler**, explicitly disabled in this template.
* **Do not modify or remove `CNAME`** (custom domain).
* **Do not touch `dist/`** (compiled code).
* Do not introduce external frameworks unless explicitly requested.

---

## 📝 Commit Convention

This repository follows the **Conventional Commits** specification.
Each commit must follow this format:

```
<type>(optional scope): <short description>
```

### Allowed Types

* **feat** → new feature
* **fix** → bug fix
* **docs** → documentation changes
* **style** → formatting only (no logic changes)
* **refactor** → code refactor (no behavior changes)
* **test** → add or update tests
* **chore** → maintenance tasks, configs, tooling
* **perf** → performance improvements
* **build** → build system or dependency changes
* **ci** → CI/CD workflow changes

### Scope

The **scope** (optional) indicates where the change happened:
Examples: `components`, `styles`, `config`, `docs`, `api`.

### Examples

```
feat(components): add project card component
fix(styles): correct header alignment on mobile
docs(readme): update build instructions
refactor(utils): simplify date formatter function
```

### Rules

1. Use **imperative mood** ("add", "fix", "remove").
2. Limit subject line to **72 characters**.
3. Add a body when more context is needed, using bullet points if helpful:

```
feat(components): add project card component

- created reusable <ProjectCard /> component
- applied Tailwind styles from design system
- integrated with project list data
```

4. Use English consistently for commit messages.

---

## 📈 Suggested Improvements

* Add automated **commit linting** (Git hook) to enforce this convention.
* Define automated testing workflows (unit/integration).
* Expand CI/CD to run linting and builds before deployment.

---
