import { css } from "styled-components";

const Transparent = css`
 background: rgba(0,0,0,0.2);
  backdrop-filter: blur(10px) saturate(1.3);  

  &::before {
    content: none;
    display: none;
  }

`;

export default Transparent