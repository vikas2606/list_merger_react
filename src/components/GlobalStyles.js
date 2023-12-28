// globalStyles.js
import { Global, css } from "@emotion/react";

const globalStyles = css`
  /* Your global styles go here */
  body {
    background-color: #f0f0f0;
    color: #333;
  }
`;

const GlobalStyles = () => <Global styles={globalStyles} />;

export default GlobalStyles;
