<p align="center">
  <img src="./assets/images/icon.png" width="180" alt="Sirat Al Quran Logo">
</p>

<h1 align="center">Sirat Al Quran Mobile</h1>

<p align="center">
  <strong>The Companion App for Your Spiritual Journey</strong>
</p>

<p align="center">
  Sirat Al Quran Mobile is a cross-platform mobile application built with <strong>Expo</strong> and <strong>React Native</strong>. It brings the personalized Quranic guidance of Sirat Al Quran directly to your pocket, allowing you to find comfort and direction in Quranic verses wherever you are.
</p>

---

## 📱 Mobile Features

### ✨ Personalized Guidance on the Go
Experience the core feature of Sirat Al Quran—situation-based verse discovery—optimized for mobile. Describe your feelings or situation and receive curated guidance instantly.

### 📖 Mobile-First Reading Experience
Read Arabic text and English translations in a clean, distraction-free interface. High-quality typography and dark mode support ensure a comfortable reading experience day or night.

### 📓 Offline-Ready Journaling
Record your reflections on specific ayats directly from your phone. Sync your spiritual journey across devices (when connected) and revisit your growth at any time.

### 🔔 Theme Exploration
Browse through various emotional and situational themes (Anxiety, Gratitude, Patience, etc.) with a smooth, native touch interface.

### 🌑 Modern UI & Dark Mode
Built with a sleek, modern aesthetic featuring a deep blueish-navy theme (`#0f172a`) and vibrant amber accents (`#fbbf24`). The UI is designed for high contrast and maximum readability.

---

## 🛠️ Tech Stack

- **Framework:** [Expo](https://expo.dev/) (React Native)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling:** React Native StyleSheet with custom theme constants
- **Authentication:** JWT with Secure Store integration
- **Icons:** Ionicons & Custom assets

---

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure API:**
   Ensure your API URL is correctly set in your services configuration to point to the Sirat Al Quran backend.
4. **Run the app:**
   ```bash
   npx expo start
   ```
   - Press `a` for Android
   - Press `i` for iOS
   - Scan the QR code with the Expo Go app

---

<p align="center">
  © 2026 Sirat Al Quran — صراط القرآن هو طريق النجاح
</p>

# Basic reliability repairs

Development builds now use the Expo development host (or Android emulator host) instead of always calling production. To override the API, set `EXPO_PUBLIC_APP_URL` to the full API base URL including `/api`; see `.env.example`. Physical devices need a reachable LAN/tunnel address. Release builds default to `https://siratalquran.com/api` and reject cleartext overrides. Restart Expo after changing environment variables.

Signup follows the existing server contract: register the account, then log in to obtain its session. Android configuration references the existing adaptive foreground image.

Run `npm test` with Node 22+ for API URL regression tests. Before release, also test signup/login/logout, a development device/emulator connection, and a release build against staging. These Node tests do not replace an Android/iOS build or device test.

