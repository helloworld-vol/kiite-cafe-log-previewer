import * as React from "react";
import { useState, useEffect } from "react";

import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faPlay,
  faDownload,
  faTrashAlt,
  faHeadphonesAlt,
  faBroadcastTower,
} from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "../IconButton";
import {
  PopupContainer,
  IconContainer,
  ContainerItem,
  PopupTitle,
} from "./items";

import { getStorageValue } from "../../utils/storage";

import { SupportEvent } from "../../types";

interface PopupProps {
  onClick: (type: SupportEvent, callback: (sucsess: boolean) => void) => void;
}

/**
 * @description page_actionで表示するポップアップ
 */
export const Popup: React.FC<PopupProps> = ({ onClick }) => {
  const closePopup = () => window.close(); // ポップアップを閉じる
  const [isListening, setListening] = useState<boolean>(false);
  const [isBackgroundPlay, setBackgroundPlay] = useState<boolean>(false);

  useEffect(() => {
    getStorageValue("isListening", false).then((value) => {
      setListening(value.isListening);
    });

    getStorageValue("isBackgroundPlay", false).then((value) => {
      setBackgroundPlay(value.isBackgroundPlay);
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

        <ContainerItem>
          {isBackgroundPlay ? (
            <IconButton
              icon={faPlay}
              color="dodgerblue"
              label="Background再生を停止"
              onClick={() =>
                onClick("background-play-stop", (success) =>
                  setBackgroundPlay(!success)
                )
              }
            />
          ) : (
            <IconButton
              icon={faPlay}
              label="Backgroundで再生"
              onClick={() =>
                onClick("background-play-start", (success) =>
                  setBackgroundPlay(success)
                )
              }
            />
          )}
        </ContainerItem>
      </IconContainer>
    </PopupContainer>
  );
};
