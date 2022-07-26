import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faDownload,
  faTrashAlt,
  faHeadphonesAlt,
  faBroadcastTower,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { useState, useEffect } from "react";

import { IconButton } from "../../../content_scripts/components/IconButton";
import { getStorageValue } from "../../../content_scripts/utils/storage";
import { SupportEvent } from "../../../schema/apis";

import styles from "./Popup.module.scss";

interface PopupProps {
  onClick: (type: SupportEvent, callback: (sucsess: boolean) => void) => void;
}

/**
 * page_actionで表示するポップアップ
 */
export const Popup: React.FC<PopupProps> = ({ onClick }) => {
  const closePopup = () => window.close(); // ポップアップを閉じる
  const [isListening, setListening] = useState<boolean>(false);

  useEffect(() => {
    getStorageValue("isListening", false).then((value) => {
      setListening(value.isListening);
    });
  }, []);

  return (
    <div className={styles.popupContainer}>
      <h1 className={styles.popupTitle}>機能一覧</h1>

      <div className={styles.iconContainer}>
        <div className={styles.containerItem}>
          <IconButton
            icon={faHeadphonesAlt}
            label="再生された曲を見る"
            onClick={() => onClick("show-musics", closePopup)}
          />
        </div>

        <div className={styles.containerItem}>
          <IconButton
            icon={faTrashAlt}
            label="ログを削除"
            onClick={() => onClick("clear-log", closePopup)}
          />
        </div>

        <div className={styles.containerItem}>
          {isListening ? (
            <IconButton
              icon={faBroadcastTower}
              label="データ収集を辞める"
              color="red"
              onClick={() =>
                onClick("stop-listening", (success) => setListening(!success))
              }
            />
          ) : (
            <IconButton
              icon={faBroadcastTower}
              label="データを収集する"
              onClick={() =>
                onClick("start-listening", (success) => setListening(success))
              }
            />
          )}
        </div>

        <div className={styles.containerItem}>
          <IconButton
            icon={faDownload}
            label="ログをCSVでダウンロード"
            onClick={() => onClick("create-csv", closePopup)}
          />
        </div>

        <div className={styles.containerItem}>
          <IconButton
            icon={faTwitter}
            label="バグや要望を報告"
            onClick={() => onClick("send-report", closePopup)}
          />
        </div>
      </div>
    </div>
  );
};
