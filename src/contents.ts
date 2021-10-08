import { browser } from "webextension-polyfill-ts";
import { createSupporter } from "./utils/util";
import { renderComponent } from "./utils/contents/renderComponent";
import { FetchListenerClass } from "./utils/contents/fetchListener";
import {
  createMusicCVSFile,
  MusicListeningFetchOption as MLFO,
} from "./utils/elements/music";
import { clearStorageValue, getStorageValue } from "./utils/storage";

import { EventSupporter, SupportEvent } from "./types";

const manifest = browser.runtime.getManifest(); // manifest.jsonの内容を取得
const version = manifest.version; // バージョン番号 example: "1.0.0"

/**
 * @description 表示されているDOMを削除
 */
const clearDisplay = () => {
  const root = document.getElementById("kclp-root");

  if (root) {
    document.body.removeChild(root);
  }
};

/**
 * @description Kiite Cafeの通信を監視するための設定を作成
 */
const supporters: EventSupporter[] = [
  // 再生された曲一覧を表示する
  createSupporter("show-musics", async () => {
    renderComponent("show-musics");
    return true;
  }),

  // ログを削除
  createSupporter("clear-log", async () => {
    const result = window.confirm(
      "本当にログを削除しますか？\n消したデータは戻せなくなります"
    );

    if (!result) return false;

    await clearStorageValue(); // LocalStorageの内容を削除

    clearDisplay();

    return true;
  }),

  // CSVファイルを出力
  createSupporter("create-csv", async () => {
    const file = await createMusicCVSFile();
    const url = (window.URL || window.webkitURL).createObjectURL(file);
    const link = document.createElement("a");

    link.download = file.name;
    link.href = url;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  }),

  // 製作者のTwitterプロフィール画面を別タブで表示する
  createSupporter("send-report", async () => {
    return !!window.open(
      "https://twitter.com/helloworld_vol",
      "_blank",
      "noopener"
    );
  }),

  new FetchListenerClass(MLFO.id, MLFO.url, MLFO.update),
];

try {
  browser.runtime.onMessage.addListener(
    async (request): Promise<boolean> => {
      if (!request || !request.type) return false;

      const type: SupportEvent = request.type;
      const results = await Promise.all(
        supporters.map((s) => s.try(type))
      ).catch((error) => {
        console.error(error);
        return [];
      });

      if (results.includes(true)) return true;

      clearDisplay();

      return false;
    }
  );

  // 既に監視済みなら監視を開始する
  getStorageValue("isListening", false).then((result) => {
    if (!result.isListening) return;

    supporters.forEach((v) => v.try("start-listening"));
  });

  console.log(`::: KCLP version ${version} ::: セットアップが完了しました`);
} catch (e) {
  console.log(`::: KCLP version ${version} :::  セットアップに失敗しました。`);
  console.log(e);
}
