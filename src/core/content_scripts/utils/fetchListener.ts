import { browser } from "webextension-polyfill-ts";

import { SupportEvent, EventSupporter } from "../../../schema/apis";

import { InjectScriptClass } from "./injectScript";
import { setStorageValue } from "./storage";

/**
 * 通信を監視するためのクラス
 */
export class FetchListenerClass implements EventSupporter {
  private injectScript = new InjectScriptClass();
  private id: string;
  private onResponse: (dataList: any[]) => void;
  private observer = new MutationObserver(this.onChange.bind(this));

  constructor(
    id: string,
    listenUrl: string,
    onResponse: (dataList: any[]) => void
  ) {
    this.id = id;
    this.onResponse = onResponse;
  }

  /**
   * DOMの変更を受け取る
   */
  private onChange(records: MutationRecord[]) {
    records.forEach((record) => {
      if (!record.target.textContent) return;

      const target = record.target as HTMLElement;

      if (target && target.id === this.id) {
        this.onResponse(
          (target.textContent || "")
            .split("|")
            .filter((v) => !!v)
            .map((v) => JSON.parse(v))
        );

        target.textContent = "";
      }
    });
  }

  /**
   * 通信を監視するためのScriptタグを追加
   */
  private interceptData() {
    this.injectScript.inject(
      browser.runtime.getURL("inectScriptSrc.js"),
      () => {
        const dom = document.createElement("div");

        dom.id = this.id;
        dom.style.height = "0";
        dom.style.overflow = "hidden";

        document.body.appendChild(dom);
        this.observer.observe(dom, { childList: true });
      }
    );
  }

  /**
   * 対応した関数を実行する
   */
  async try(event: SupportEvent) {
    switch (event) {
      case "start-listening":
        await this.start();
        break;

      case "stop-listening":
        await this.stop();
        break;

      default:
        return false;
    }

    return true;
  }

  /**
   * 通信の監視を開始する
   */
  async start() {
    await setStorageValue("isListening", true);

    console.info("::: KCLP ::: Start Listening");

    this.interceptData();
  }

  /**
   * 通信の監視を停止する
   */
  async stop() {
    await setStorageValue("isListening", false);

    this.observer.disconnect();

    this.injectScript.remove(() => {
      const dataDOM = document.getElementById(this.id);

      if (dataDOM) {
        document.body.removeChild(dataDOM);
      }

      console.info("::: KCLP ::: Stop Listening");
    });
  }
}
