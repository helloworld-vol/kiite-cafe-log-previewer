import { setStorageValue } from "../storage";
import { InjectScriptClass } from "./injectScript";
import { SupportEvent, EventSupporter } from "../../types";

/**
 * @description 通信を監視するためのクラス
 */
export class FetchListenerClass implements EventSupporter {
  private injectScript = new InjectScriptClass();
  private id: string;
  private listenUrl: string;
  private onResponse: (dataList: any[]) => void;
  private observer = new MutationObserver(this.onChange.bind(this));

  constructor(
    id: string,
    listenUrl: string,
    onResponse: (dataList: any[]) => void
  ) {
    this.id = id;
    this.listenUrl = listenUrl;
    this.onResponse = onResponse;
  }

  /**
   * @description DOMの変更を受け取る
   */
  private onChange(records: MutationRecord[]) {
    records.forEach((record) => {
      if (!record.target.textContent) return;

      const target = record.target as HTMLElement;

      if (target && target.id === this.id) {
        this.onResponse(
          target.textContent
            .split("|")
            .filter((v) => !!v)
            .map((v) => JSON.parse(v))
        );

        target.textContent = "";
      }
    });
  }

  /**
   * @description 通信を監視するためのScriptタグを追加
   */
  private interceptData() {
    this.injectScript.inject(
      `
      (function() {
        var XHR = XMLHttpRequest.prototype;
        var send = XHR.send;
    
        XHR.send = function() {
          var onLoad = function() {
            console.log('::: KCLP ::: listening ...');
            
            if (this.responseURL.includes('${this.listenUrl}')) {
              var dom = document.getElementById('${this.id}');
      
              if (dom) {
                dom.innerText += this.response + '|';
              } else {
                XHR.send = send;
              }
            }
          }
    
          this.addEventListener('load', onLoad);
    
          return send.apply(this, arguments);
        };
      })();
    `,
      (doc) => {
        const dom = document.createElement("div");

        dom.id = this.id;
        dom.style.height = "0";
        dom.style.overflow = "hidden";

        doc.body.appendChild(dom);
        this.observer.observe(dom, { childList: true });
      }
    );
  }

  /**
   * @description 対応した関数を実行する
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
   * @description 通信の監視を開始する
   */
  async start() {
    await setStorageValue("isListening", true);

    console.info("::: KCLP ::: Start Listening");

    this.interceptData();
  }

  /**
   * @description 通信の監視を停止する
   */
  async stop() {
    await setStorageValue("isListening", false);

    this.observer.disconnect();

    this.injectScript.remove((doc) => {
      const dataDOM = doc.getElementById(this.id);

      if (dataDOM) {
        doc.removeChild(dataDOM);
      }

      console.info("::: KCLP ::: Stop Listening");
    });
  }
}
