import * as React from "react";
import { createRoot } from "react-dom/client";
import { browser } from "webextension-polyfill-ts";

import { ErrorBoundary } from "../content_scripts/components/ErrorBoundary";
import { SupportEvent } from "../schema/apis";

import { Popup } from "./components/Popup";

import "./styles/index.scss";

/**
 * Iconボタンを押したときの処理
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

console.log("hoge v1");

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

/**
 * ポップアップを表示する
 */
root.render(
  <ErrorBoundary>
    <Popup onClick={onClick} />
  </ErrorBoundary>
);
