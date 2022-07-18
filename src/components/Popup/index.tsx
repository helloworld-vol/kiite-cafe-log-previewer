import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faDownload,
  faTrashAlt,
  faHeadphonesAlt,
  faBroadcastTower,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { useState, useEffect } from "react";

import { SupportEvent } from "../../types";
import { getStorageValue } from "../../utils/storage";
import { IconButton } from "../IconButton";

import {
  PopupContainer,
  IconContainer,
  ContainerItem,
  PopupTitle,
} from "./items";

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
    <PopupContainer>
      <PopupTitle>機能一覧</PopupTitle>

      <IconContainer>
        <ContainerItem>
          <IconButton
            icon={faHeadphonesAlt}
            label="再生された曲を見る"
            onClick={() => onClick("show-musics", closePopup)}
          />
        </ContainerItem>

        <ContainerItem>
          <IconButton
            icon={faTrashAlt}
            label="ログを削除"
            onClick={() => onClick("clear-log", closePopup)}
          />
        </ContainerItem>

        <ContainerItem>
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
        </ContainerItem>

        <ContainerItem>
          <IconButton
            icon={faDownload}
            label="ログをCSVでダウンロード"
            onClick={() => onClick("create-csv", closePopup)}
          />
        </ContainerItem>

        <ContainerItem>
          <IconButton
            icon={faTwitter}
            label="バグや要望を報告"
            onClick={() => onClick("send-report", closePopup)}
          />
        </ContainerItem>
      </IconContainer>
    </PopupContainer>
  );
};
