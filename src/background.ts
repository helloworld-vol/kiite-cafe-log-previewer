/* eslint-disable no-undef */

import { browser } from "webextension-polyfill-ts";

/**
 * chrome専用 PopupをKiite Cafeだけで開けるようにする
 */
if (window.chrome) {
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

/**
 * ニコニコ動画の広告をブロックする
 */
browser.webRequest.onBeforeRequest.addListener(
  () => {
    return { cancel: true };
  },
  {
    urls: ["*://ads.nicovideo.jp/*"],
  },
  ["blocking"]
);
