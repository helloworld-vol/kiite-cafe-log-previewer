import * as React from "react";

import { SupportEvent } from "../../types";
import { Switch } from "../Switch";

import styles from "./App.module.scss";

interface AppProps {
  type: SupportEvent;
  onClose: () => void;
}

/**
 * 画面に表示するRoot Component
 */
export const App: React.FC<AppProps> = ({ type, onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Switch type={type} onClose={onClose} />
      </div>
    </div>
  );
};
