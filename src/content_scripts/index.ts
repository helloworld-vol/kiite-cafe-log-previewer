import { browser } from "webextension-polyfill-ts";

import { getStorageValue } from "./utils/storage";

const manifest = browser.runtime.getManifest(); // manifest.jsonの内容を取得
const version = manifest.version; // バージョン番号 example: "1.0.0"

/**
 * 表示されているDOMを削除
 */
const clearDisplay = () => {
  const root = document.getElementById("kclp-root");

  if (root) {
    document.body.removeChild(root);
  }
};

try {
  browser.runtime.onMessage.addListener(async (request): Promise<boolean> => {
    if (!request || !request.type) return false;

    clearDisplay();

    return false;
  });

  // 既に監視済みなら監視を開始する
  getStorageValue("isListening", false).then((result) => {
    if (!result.isListening) return;
  });

  console.log(`::: KCLP version ${version} ::: セットアップが完了しました`);
} catch (e) {
  console.log(`::: KCLP version ${version} :::  セットアップに失敗しました。`);
  console.log(e);
}
