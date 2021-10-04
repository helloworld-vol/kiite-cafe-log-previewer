import { browser, Storage } from "webextension-polyfill-ts";
import { KCLPStorageType } from "../types";

type StorageKeys = keyof KCLPStorageType;

/**
 * @description LocalStorageに保存している値を返す
 */
export const getStorageValue = <K extends StorageKeys>(
  key: K,
  defaultValue: KCLPStorageType[K]
): Promise<{ [key in K]: KCLPStorageType[K] }> => {
  return browser.storage.local.get(key).then((v) => {
    if (v && v[key]) {
      return v as { [key in K]: KCLPStorageType[K] };
    }

    return { [key]: defaultValue } as { [key in K]: KCLPStorageType[K] };
  });
};

/**
 * @description 複数の値をLocalStorageから取得する
 */
export const getStorageValues = <K extends StorageKeys[]>(
  keys: K
): Promise<{ [key in K[number]]?: KCLPStorageType[K[number]] }> => {
  return browser.storage.local.get(keys).then((v) => {
    return v as { [key in K[number]]?: KCLPStorageType[K[number]] };
  });
};

/**
 * @description LocalStorageに値を保存
 */
export const setStorageValue = <K extends StorageKeys>(
  key: K,
  value: KCLPStorageType[K]
): Promise<boolean> => {
  return browser.storage.local.set({ [key]: value }).then(() => true);
};

/**
 * @description LocalStorageの値を監視する
 */
export const watchStorageValue = <K extends StorageKeys>(
  key: K,
  callback: (value: KCLPStorageType[K]) => void
): (() => void) => {
  const onChanged = (
    changes: { [key: string]: Storage.StorageChange },
    areaName: string
  ) => {
    if (areaName !== "local") return;
    if (!changes[key]) return;

    const change = changes[key];

    if (change.newValue) {
      callback(change.newValue as KCLPStorageType[K]);
    }
  };

  browser.storage.onChanged.addListener(onChanged);

  return () => browser.storage.onChanged.removeListener(onChanged);
};

/**
 * @description LocalStorageの値を削除
 */
export const clearStorageValue = async () => {
  const keys: Array<keyof KCLPStorageType> = ["musics"];

  return await browser.storage.local.remove(keys);
};
