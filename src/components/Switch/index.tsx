import * as React from "react";

import { MusicList } from "../MusicList";
import { ErrorBoundary } from "../ErrorBoundary";

import { SupportEvent } from "../../types";

interface SwitchProps {
  type: SupportEvent;
  onClose: () => void;
}

/**
 * @description Propsによって表示内容を切り替えるコンポーネント
 */
export const Switch: React.FC<SwitchProps> = ({ type, onClose }) => {
  switch (type) {
    case "show-musics":
      return (
        <ErrorBoundary message="エラーが発生しました。「データ収集する」ボタンを押すと治るかもしれません。">
          <MusicList onClose={onClose} />
        </ErrorBoundary>
      );

    default:
      return null;
  }
};
