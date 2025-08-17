import { Global, css } from '@emotion/react'

export function GlobalStyles() {
  return (
    <Global
      styles={(theme) => css`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700&display=swap');

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html {
          min-width: 320px;
          background: ${theme.colors.background};
          color: ${theme.colors.text};
          font-family: 'DM Sans', system-ui, sans-serif;
          font-synthesis: none;
          text-rendering: optimizeLegibility;
        }

        body {
          margin: 0;
          min-width: 320px;
          min-height: 100vh;
        }

        button,
        input,
        select {
          font: inherit;
        }

        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        #root {
          min-height: 100vh;
        }

        ::selection {
          background: ${theme.colors.primaryLight};
        }

        :focus-visible {
          outline: 3px solid rgba(31, 93, 72, 0.28);
          outline-offset: 2px;
        }
      `}
    />
  )
}
