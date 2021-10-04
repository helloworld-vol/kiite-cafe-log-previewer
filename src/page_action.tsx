import * as React from "react";
import { render } from "react-dom";
import { createGlobalStyle } from "styled-components";
import { browser } from "webextension-polyfill-ts";

import { Popup } from "./components/Popup";
import { ErrorBoundary } from "./components/ErrorBoundary";

import { SupportEvent } from "./types";

/**
 * @description Iconボタンを押したときの処理
 */
const onClick = async (
  type: SupportEvent,
  onClick: (success: boolean) => void
) => {
  const tabs = await browser.tabs
    .query({ active: true, currentWindow: true })
    .catch(() => null);

  const tab = tabs ? tabs[0] : null;

  if (tab && tab.id) {
    const res = await browser.tabs.sendMessage(tab.id, { type }).catch((e) => {
      console.error(e); // Error内容を表示
      return null;
    });

    if (res) {
      onClick(true);
    }
  }
};

/**
 * @description 全体に適用するCSSを定義
 */
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`;

/**
 * @description ポップアップを表示する
 */
render(
  <>
    <GlobalStyles />

    <ErrorBoundary>
      <Popup onClick={onClick} />
    </ErrorBoundary>
  </>,
  document.getElementById("root")
);
