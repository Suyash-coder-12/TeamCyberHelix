# CyberHelix Design System & Accessibility (A11y)
**Author:** Pavan Londhe | **Category:** UI/UX & Design

---

## 🎨 Color Palette & Visual Identity

| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| `--bg-obsidian` | `#080b11` | Deep base canvas background |
| `--bg-card` | `rgba(17, 24, 39, 0.7)` | Frosted glass card surfaces |
| `--border-glass` | `rgba(255, 255, 255, 0.08)`| Subtle glass border outline |
| `--neon-cyan` | `#00f5d4` | Primary brand accent & active states |
| `--neon-violet` | `#7928ca` | Secondary brand glow & highlights |
| `--text-bright` | `#f8fafc` | Headings & high-emphasis text |
| `--text-muted` | `#94a3b8` | Body text & secondary labels |

---

## ♿ Accessibility (WCAG 2.1 Level AA)
- Maintain minimum **4.5:1** contrast ratio for regular body text.
- Ensure all interactive elements have visible `:focus-visible` outlines.
- All non-text content (icons, charts) must have descriptive `aria-label` or alternative text.
- Form inputs must be paired with explicit `<label>` tags.
