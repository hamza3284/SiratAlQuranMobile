
const palette = {
  // Deep blueish colors
  slate900: '#0f172a', // Main Background (Slate-950 - Deep Navy)
  slate800: '#1e293b', // Cards (Slate-800 - Lighter Navy)
  gold: '#E6C77B',     // Solar Golden from Logo
  white: '#f8fafc',    // Slate-50
  slate300: '#cbd5e1', // Slate-300
  slate400: '#94a3b8',
  slate950: '#020617', // Inputs (Slate-950+ - Very Dark Navy)
};

export const Colors = {
  light: {
    text: palette.white,
    textMuted: palette.slate300,
    background: palette.slate900,
    tint: palette.gold,
    icon: palette.slate400,
    tabIconDefault: palette.slate400,
    tabIconSelected: palette.gold,
    card: palette.slate800,
    border: 'rgba(230, 199, 123, 0.25)', // --border-soft
    primary: palette.gold,
    notification: palette.gold,
  },
  dark: {
    text: palette.white,
    textMuted: palette.slate300,
    background: palette.slate900,
    tint: palette.gold,
    icon: palette.slate400,
    tabIconDefault: palette.slate400,
    tabIconSelected: palette.gold,
    card: palette.slate800,
    border: 'rgba(230, 199, 123, 0.25)', // --border-soft
    primary: palette.gold,
    notification: palette.gold,
  },
};
