import { useState, useEffect, useRef } from "react";

import { getMusics, watchMusicData } from "../../utils/elements/music";
import { Music } from "../../types";

/**
 * Kiite Cafeで再生された曲一覧を表示するための情報などを提供するHooks
 */
export const useMusicList = () => {
  const [musics, setMusics] = useState<Music[]>([]);
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
