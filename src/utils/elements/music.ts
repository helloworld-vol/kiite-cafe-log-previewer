import {
  getStorageValue,
  setStorageValue,
  watchStorageValue,
} from "../storage";
import { getNow, createCSVFile } from "../util";

import { ListeningFetchOption, Music } from "../../types";

/**
 * @description Musicデータに含まれるべき情報のkey一覧
 */
export const requiredMusicKeys: Array<keyof Music> = [
  "played_at",
  "played_label",
  "creator_name",
  "fav_count",
  "is_faved",
  "song_link",
  "song_title",
  "thumbnail",
  "video_id",
];

/**
 * @description Musicデータか判定する
 */
export const isMusic = (value: any): value is Music => {
  if (!value) return false;

  const keys = Object.keys(value).filter(
    (key) => !!requiredMusicKeys.find((v) => v === key)
  );

  return keys.length >= requiredMusicKeys.length;
};

/**
 * @description 再生された曲一覧データを返す
 */
export const getMusics = async (): Promise<Music[]> => {
  const data = await getStorageValue("musics", []);

  return data.musics;
};

/**
 * @description 再生された曲一覧データを保存する
 */
export const setMusics = async (musics: Music[]) => {
  return setStorageValue("musics", musics);
};

/**
 * @description LocalStorageに保存されている再生された曲一覧データを監視する
 */
export const watchMusicData = (
  onChanged: (musics: Music[]) => void
): (() => void) => {
  return watchStorageValue("musics", (newMusics) => {
    if (newMusics.length > 0) {
      onChanged(newMusics);
    }
  });
};

/**
 * @description 渡されたデータの重複を消して、再生された順に並び替える
 */
export const filterMusicList = (musics: Music[]): Music[] => {
  const list = musics
    .reduce((pre, item) => {
      const index = pre.findIndex((v) => v.video_id === item.video_id);

      if (index === -1) return pre.concat(item);

      if (pre[index].fav_count !== item.fav_count) {
        pre[index] = item;
      }

      return pre;
    }, [] as Music[])
    .sort((a, b) => (a.played_at > b.played_at ? -1 : 1));

  return list;
};

export const createMusicCVSFile = async () => {
  const musics = await getMusics();

  const formatData = musics.map<Array<{ label: string; value: string }>>(
    (v) => [
      { label: "ID", value: v.video_id },
      { label: "タイトル", value: v.song_title },
      { label: "再生された時間", value: v.played_label },
      { label: "リンク", value: v.song_link },
      { label: "サムネイルURL", value: v.thumbnail },
      { label: "製作者名", value: v.creator_name },
      { label: "製作者リンク", value: v.creator_link },
      { label: "いいね数", value: v.fav_count + "" },
      { label: "いいね", value: v.is_faved + "" },
    ]
  );

  return createCSVFile({
    labels: formatData[0].map((v) => v.label),
    items: formatData.map((v) => v.map((item) => item.value)),
  });
};

/**
 * @description fetchしてきたデータを受け取って、Storeに反映する
 */
export const updateMusic = async (dataList: any[]) => {
  const newMusics = dataList.flatMap<Music>((data) => {
    if (!data) return [];

    const now = getNow();
    let music: Music = Array.isArray(data.songs) ? data.songs[0] : {};

    music = { ...music, played_at: now.unix, played_label: now.format };

    return isMusic(music) ? [music] : [];
  });

  const cache = await getMusics();
  const musics = filterMusicList([...cache, ...newMusics]);

  setMusics(musics);
};

/**
 * @description Music関連のFetchを監視するときに必要な情報
 */
export const MusicListeningFetchOption: ListeningFetchOption = {
  id: "__KCLP_PLAY_MUSIC_DATA__",
  url: "cafe.kiite.jp/api/sns/songs",
  update: updateMusic,
};
