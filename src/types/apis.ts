import { MusicHistory } from "./musicHistory";

/**
 * Storageに保存するデータ型
 */
export interface KCLPStorageType {
  musics: MusicHistory[];
  isListening: boolean;
}

/**
 * IconButtonに対応する文字列
 */
export type SupportEvent =
  | "show-musics"
  | "clear-log"
  | "start-listening"
  | "stop-listening"
  | "send-report"
  | "create-csv";

/**
 * 対応するイベントの処理をするinterface
 */
export interface EventSupporter {
  try(event: SupportEvent): Promise<boolean>;
}

/**
 * Fetchを監視するときに必要な情報
 */
export interface ListeningFetchOption {
  id: string;
  url: string;
  update: (dataList: any[]) => Promise<void>;
}
