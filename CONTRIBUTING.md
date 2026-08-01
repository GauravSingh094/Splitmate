# 🤝 Contributing Guidelines & Git Strategy

Thank you for contributing to **Splito**! To maintain enterprise quality and code stability, all contributions must follow this process.

---

## 🌿 Branch Naming Convention

- `feat/feature-name` — New feature additions
- `fix/bug-name` — Bug fixes
- `refactor/scope` — Refactoring without visual/behavioral changes
- `docs/doc-title` — Documentation updates

---

## 💬 Conventional Commits Policy

All commit messages are validated automatically by **Commitlint** and must follow the format:

```
<type>(<scope>): <short summary>
```

### Allowed Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation change
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Build or tooling updates

---

## 📋 Pull Request Submission Checklist

1. Run `pnpm type-check` (0 errors)
2. Run `pnpm lint` (0 errors/warnings)
3. Run `pnpm test` (All tests pass)
4. Submit PR using `.github/PULL_REQUEST_TEMPLATE.md`
