
```md
# 🎮 RTOOLS 16

**The ultimate frontend toolkit for Counter-Strike 1.6 players.**  
Create configs, scripts, rate settings and optimize your performance — all from one clean, modern web interface.

---

## 🚀 Live Modules

| Tool              | Status  | Description |
|------------------|---------|-------------|
| 🔢 Rate Calculator | ✅ Active | Calculates `rate`, `cl_cmdrate`, `cl_updaterate`, `ex_interp` based on your internet speed. |
| ⚙️ Config Builder | ✅ Active | Fully customizable `userconfig.cfg` builder with live preview. |
| 🛒 AutoBuy Maker  | ✅ Active | Auto-buy script generator with bind support and clipboard export. |

---

## 🔧 Under Maintenance

These modules are temporarily offline and will be reactivated in upcoming releases:

- 🎨 Crosshair Generator  
- 📜 Server.cfg Generator  
- 🧠 HLDS Autoexec/Start Builder  
- 🧼 Config Fixer  
- 📈 FPS Boost Generator  
- 🎓 Training CFG Generator  
- 🧷 Jumpthrow Bind Maker  
- 📊 Net Graph Tool  
- 🧠 Regedit Editor + CMD Optimizer  
- 🧹 CMD Performance Cleaner

> 🛠 These sections will return soon with new UX, added clipboard support, dark mode compatibility, and expanded command/tooltips.

---

## 🧩 Tech Stack

- **Frontend:** HTML, TailwindCSS, JavaScript (Vanilla)
- **Framework:** None – pure frontend SPA with modular tools
- **Icons:** FontAwesome, Material Icons
- **Storage:** `localStorage` for tool saves (optional)
- **Clipboard:** Zero-dependency clipboard copy buttons

---

## 📁 Project Structure

```

/
├── index.html
├── /tools
│   ├── config-builder.html
│   ├── rate-calculator.html
│   ├── autobuy-maker.html
│   └── \[other-tools].html (disabled)
├── /assets
│   ├── icons/
│   ├── css/
│   └── js/
├── README.md
└── LICENSE

````

---

## 📌 Features (Live Tools)

### ✅ Rate Calculator
- Input: Download & Upload speed
- Output: Optimized `rate`, `cl_cmdrate`, `cl_updaterate`, `ex_interp`
- Tooltip explanations
- Clipboard export

### ✅ Config Builder
- Real-time config preview
- Toggle/slider for sensitivity, volume, fps_max, gamma, voice, etc.
- Clipboard export or download `.cfg`

### ✅ AutoBuy Maker
- Weapon picker by team (T/CT)
- Assign key (F1–F12, KP_0–KP_9)
- Output: `bind`-only script
- Clipboard copy/reset

---

## 🧪 How to Use

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/cs16-master-tools.git
   cd cs16-master-tools
````

2. Open `index.html` in your browser.
3. Use the live tools — no backend required.
4. Other modules will become available once maintenance ends.

---

## 📢 Upcoming Features

* Regedit/CMD FPS & Network optimizers
* Server.cfg & HLDS launch builders
* Training presets & pro config templates
* Shareable tool links
* Theme selector (light/dark/system)
* Mobile-first redesign

---

## 📄 License

MIT © 2025 — [Ripdite](https://github.com/ripdite77)

---

## ❤️ Contribute

PRs welcome! For issues or feature suggestions, use [Issues](https://github.com/ripdite777/rtools16/issues)

```
