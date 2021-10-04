import * as React from "react";

import { Switch } from "../Switch";
import { KCLPApp, GlobalStyles, KCLPBackground } from "./items";

import { SupportEvent } from "../../types";

interface AppProps {
  type: SupportEvent;
  onClose: () => void;
}

/**
 * @description 画面に表示するRoot Component
 */
export const App: React.FC<AppProps> = ({ type, onClose }) => {
  return (
    <>
      <GlobalStyles />

      <KCLPApp>
        <KCLPBackground>
          <Switch type={type} onClose={onClose} />
        </KCLPBackground>
      </KCLPApp>
    </>
  );
};
