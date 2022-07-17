/**
 * =============================
 *    Elements
 * =============================
 */

/**
 * 再生された曲のデータ型
 */
export interface Music {
  played_label: string;
  played_at: number;
  creator_id: number;
  creator_link: string;
  creator_name: string;
  creator_unique: string;
  fav_count: number;
  is_faved: boolean;
  song_id: number;
  song_link: string;
  song_title: string;
  song_unique: string;
  thumbnail: string;
  video_id: string;
}

/**
 * =============================
 *    My API
 * =============================
 */

/**
 * Storageに保存するデータ型
 */
export interface KCLPStorageType {
  musics: Music[];
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

/**
 * =============================
 *    NicoNicoのAPIの型
 * =============================
 */

/**
 * Playerの状態
 */
type NicoPlayerStatus =
  | "unplayed"
  | "loading"
  | "playing"
  | "pausing"
  | "finished";

/**
 * シークバーの状態
 */
type NicoSeekStatus = "none" | "seeking" | "seekEnd";

/**
 * NicoPlayerを作成する関数
 */
export type NicoPlayerFactory = {
  create: (
    targetDom: Element,
    video_id: string, // "sm31477166"
    options: NicoPlayOptions
  ) => Promise<NicoPlayer>;
};

/**
 * NiconicoPlayerのオプション
 */
export interface NicoPlayOptions {
  width?: string;
  height?: string;
  noRelatedVideo: boolean;
  autoplay: boolean;
  mute: boolean;
  defaultNoComment: boolean;
  noLinkToNiconico: boolean;
  noController: boolean;
  noHeader: boolean;
  noTags: boolean;
  noShare: boolean;
  noVideoDetail: boolean;
  allowProgrammaticFullScreen: boolean;
  onError?: (error: any) => void;
  onSuccess?: (result: NicoPlayer) => void;
}

/**
 * よくわからん
 */
export interface NicoConnector {
  playerId: string;
  targetDomain: string;
  iframeElement: HTMLIFrameElement;
  connectorType: number;
  targetConnectorType: number;
  messageEventFunction: (value: any) => void;
}

/**
 * 動画の情報
 */
export interface VideoInfo {
  commentCount: number;
  description: string;
  lengthInSeconds: number;
  mylistCount: number;
  postedAt: Date;
  thumbnailUrl: string;
  title: string;
  videoId: string;
  viewCount: number;
  watchId: string;
}

/**
 * Niconicoのプレイヤーオブジェクト
 */
export interface NicoPlayer {
  EMBED_PLAYER_BASE_PATH: string;
  EMBED_PLAYER_URL: string;
  EMBED_PLAYER_DOMAIN: string;
  adjustProtocol: (value: any) => void;
  connector: NicoConnector;
  iframeElement: HTMLIFrameElement;
  initialSize: {
    width: string;
    height: string;
  };
  parentElement: Element;
  playOptions: NicoPlayOptions;

  playerId: string;
  url: string;
  watchId: string;

  addEventListener: (
    type: "playerStatusChange" | "playerMetadataChange",
    callback: (value: { playerStatus: NicoPlayerStatus }) => void
  ) => void;
  removeEventListener: (
    type: "playerStatusChange" | "playerMetadataChange",
    callback: () => void
  ) => void;

  createPlayer: (element: Element, n: any) => NicoPlayer; // NicoPlayerFactory.create関数と多分同じ
  currentTime: (time: number) => number; // シークバーを動かせる
  dispose: () => void; // Playerを破棄
  duration: () => number; // 動画時間を返す
  maximumBuffered: () => number; // ? 参考値 : 258066.575
  muted: (t: boolean) => NicoPlayer;
  once: (type: string, callback: () => void) => void; // 一度かけ実行するaddEventListenerかな?
  optionsToQuery: (value: NicoPlayOptions) => string; // optionsをクエリー文字列に変換？
  pause: () => void; // 動画を一時停止する
  play: () => void; // 動画を再生する
  playerStatus: () => NicoPlayerStatus; // Playerの状態を返す
  seekStatus: () => NicoSeekStatus; // シークバーの状態を返す
  videoInfo: () => VideoInfo;
  volume: (value: number /* 0 ~ 1 */) => NicoPlayer; // ボリュームを設定
  width: (value?: string | number) => NicoPlayer; // Playerの幅を取得＆設定
  height: (value?: string | number) => NicoPlayer; // Playerの高さを取得＆設定
}
