import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 白天主题 */
  :root.light {
    color-scheme: light;
    color: #213547;
    background-color: #ffffff;
  }

  /* 黑夜主题 */
  :root.dark {
    color-scheme: dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #1a1a1a;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #535bf2;
  }

  body {
    margin: 0;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.5;
  }

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    a:nth-of-type(2) .logo {
      animation: logo-spin infinite 20s linear;
    }
  }
`;
