import { createRoot } from "react-dom/client";
import { browser } from "webextension-polyfill-ts";

import { App } from "./components/App";

import "./styles/index.scss";

const manifest = browser.runtime.getManifest(); // manifest.jsonの内容を取得
const version = manifest.version; // バージョン番号 example: "1.0.0"

const container = document.createElement("div");
document.body.appendChild(container);

const root = createRoot(container);
root.render(<App />);

console.log(`::: KCLP version ${version} ::: セットアップが完了しました`);
