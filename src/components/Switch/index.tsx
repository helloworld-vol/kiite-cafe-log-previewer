import * as React from "react";

import { SupportEvent } from "../../types";
import { ErrorBoundary } from "../ErrorBoundary";
import { MusicList } from "../MusicList";

interface SwitchProps {
  type: SupportEvent;
  onClose: () => void;
}

/**
 * Propsによって表示内容を切り替えるコンポーネント
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
