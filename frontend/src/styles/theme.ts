export const theme = {
  colors: {
    background: '#f4f6f1',
    surface: '#ffffff',
    surfaceMuted: '#f8faf7',
    primary: '#1f5d48',
    primaryDark: '#173e32',
    primaryLight: '#dcebe3',
    accent: '#d99a3d',
    accentLight: '#f7ead4',
    text: '#1d2b25',
    textMuted: '#65736d',
    border: '#e2e7e1',
    danger: '#b5473f',
    dangerLight: '#fae8e6',
    info: '#3478a3',
    shadow: 'rgba(30, 55, 45, 0.09)',
  },
  radius: {
    sm: '8px',
    md: '14px',
    lg: '20px',
    pill: '999px',
  },
  breakpoints: {
    mobile: '720px',
    tablet: '1040px',
  },
}

export type AppTheme = typeof theme

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
