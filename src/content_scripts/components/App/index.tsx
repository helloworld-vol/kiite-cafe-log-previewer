import { Switch } from "../Switch";

import styles from "./App.module.scss";

/**
 * 画面に表示するRoot Component
 */
export const App = () => {
  return (
    <div className={styles.popup}>
      <div className={styles.background}>
        <Switch type={""} onClose={() => void 0} />
      </div>
    </div>
  );
};
