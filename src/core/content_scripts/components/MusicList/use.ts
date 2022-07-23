import { useState, useEffect, useRef } from "react";

import { MusicHistory } from "../../../../schema/musicHistory";
import { getMusics, watchMusicData } from "../../../../utils/elements/music";

/**
 * Kiite Cafeで再生された曲一覧を表示するための情報などを提供するHooks
 */
export const useMusicList = () => {
  const [musics, setMusics] = useState<MusicHistory[]>([]);
  const ref = useRef({ isLoad: false });

  useEffect(() => {
    getMusics().then((musics) => {
      ref.current.isLoad = true;
      setMusics(musics);
    });

    return watchMusicData((list) => {
      setMusics(list);
    });
  }, []);

  return { musics, isEmpty: ref.current.isLoad && musics.length === 0 };
};
