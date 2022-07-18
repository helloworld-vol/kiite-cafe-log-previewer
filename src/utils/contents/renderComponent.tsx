import * as React from "react";
import { render } from "react-dom";

import { App } from "../../components/App";
import { SupportEvent } from "../../types";

/**
 * 古いDOMを削除してからReact Componentnをレンダリングする
 */
export const renderComponent = (type: SupportEvent) => {
  try {
    const oldRoot = document.getElementById("kclp-root"); // 既に表示されているDOMを取得

    if (oldRoot) {
      document.body.removeChild(oldRoot); // DOMを削除
    }
  } catch {} // eslint-disable-line no-empty

  const root = document.createElement("div");
  const commentForm = document.getElementById("comment_form"); // Kiite Cafeのコメント入力欄

  if (commentForm) {
    commentForm.style.zIndex = "99999999999"; // 一番手前に表示させる
  }

  root.id = "kclp-root";

  document.body.appendChild(root); // KCPLを表示するためのDOMを追加

  /**
   * ✖ボタンが押された時の処理
   */
  const onClose = () => {
    const commentForm = document.getElementById("comment_form"); // kiite cafeのコメント入力欄

    if (commentForm) commentForm.style.zIndex = ""; // z-indexを元に戻す

    document.body.removeChild(root);
  };

  // <App /> を表示する
  render(<App type={type} onClose={onClose} />, root);
};
