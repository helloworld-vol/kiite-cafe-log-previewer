import styled, { createGlobalStyle } from "styled-components";

/**
 * @description styled componentsでCSSを定義
 */

export const KCLPApp = styled.div`
  top: 0;
  right: 0;
  position: fixed;
  z-index: 9999999;
`;

export const KCLPBackground = styled.div`
  width: 350px;
  height: 100vh;
  position: relative;
  background: rgba(0, 0, 0, 0.75);
`;

export const GlobalStyles = createGlobalStyle`
  .kclp-list-body::-webkit-scrollbar {
    width: 10px;
  }

  .kclp-list-body::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.75);
  }

  .kclp-list-body::-webkit-scrollbar-thumb {
    background-color: rgba(120, 120, 120, .5);
    border-radius: 10px;
    box-shadow:0 0 0 1px rgba(255, 255, 255, .3);
  }
`;
