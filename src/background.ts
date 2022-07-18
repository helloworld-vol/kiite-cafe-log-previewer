/* eslint-disable no-undef */

import { browser } from "webextension-polyfill-ts";

/**
 * chrome専用 PopupをKiite Cafeだけで開けるようにする
 */
if (typeof chrome === "object" && !!chrome) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: "cafe.kiite.jp",
              schemes: ["https"],
              pathContains: "pc",
            },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
}

// 広告ブロックは実装方法が変わったので後で実装する

/**
 * ニコニコ動画の広告をブロックする
 */
// browser.webRequest.onBeforeRequest.addListener(
//   () => {
//     return { cancel: true };
//   },
//   {
//     urls: ["*://ads.nicovideo.jp/*"],
//   },
//   ["blocking"]
// );
