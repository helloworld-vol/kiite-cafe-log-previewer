import * as React from "react";

import { SupportEvent } from "../../types";
import { Switch } from "../Switch";

import { KCLPApp, GlobalStyles, KCLPBackground } from "./items";

interface AppProps {
  type: SupportEvent;
  onClose: () => void;
}

/**
 * 画面に表示するRoot Component
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
