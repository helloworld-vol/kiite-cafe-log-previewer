/* eslint-disable no-undef */

import { browser } from "webextension-polyfill-ts";

/**
 * @description chrome専用 PopupをKiite Cafeだけで開けるようにする
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
 * @descriptoin ニコニコ動画の広告をブロックする
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

class BackgroundPlayerClass {
  private currentUrl: null | string = null;

  init() {
    const oldScript = document.getElementById("script-for-background-play");

    if (oldScript) {
      document.body.removeChild(oldScript);
    }

    const script = document.createElement("script");

    script.src = "https://secure-dcdn.cdn.nimg.jp/extplayerv/embed/js/api.js";

    document.body.appendChild(script);
  }

  updateUrl(url: string) {
    this.init();

    if (this.currentUrl !== null) return;

    this.currentUrl = url;
    this.play();
  }

  play() {
    const videoId = this.currentUrl.match(/(sm\d+)/)[0] || null;

    if (!videoId) return;

    const backgroundIframe = document.getElementById("background_player");

    if (backgroundIframe) {
      document.body.removeChild(backgroundIframe);
    }

    console.log("バックグラウンド再生");
    console.log(videoId);

    const iframe = document.createElement("iframe");

    iframe.id = "background_player";
    iframe.allow = "autoplay";
    iframe.src = `https://embed.nicovideo.jp/watch/${videoId}?jsapi=1&playerId=5&autoplay=1&allowProgrammaticFullScreen=1`;

    document.body.appendChild(iframe);
  }
}

const BackgroundPlayer = new BackgroundPlayerClass();

/**
 * @description バックグラウンド再生
 */
browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = details.url;

    if (!url.includes("embed.nicovideo.jp/watch")) return {};

    BackgroundPlayer.updateUrl(url);
  },
  { urls: ["<all_urls>"] },
  []
);

window.addEventListener("message", (e) => {
  console.log(e);
});
