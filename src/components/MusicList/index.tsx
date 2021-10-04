import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faTimesCircle,
  faHeart as RegHeart,
} from "@fortawesome/free-regular-svg-icons";

import { useMusicList } from "./use";

import * as Items from "./items";

interface MusicListProps {
  onClose: () => void;
}

/**
 * @description KiiteCafeで再生された曲一覧を表示するコンポーネント
 */
export const MusicList: React.FC<MusicListProps> = ({ onClose }) => {
  const { musics, isEmpty } = useMusicList();

  return (
    <Items.MusicListBody>
      <Items.ListHeader className="list-header">
        <Items.ListTitle>
          再生された曲一覧 ( {musics.length}件 )
        </Items.ListTitle>

        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={faTimesCircle}
          width={24}
          onClick={onClose}
        />
      </Items.ListHeader>

      {isEmpty ? (
        <Items.NotFoundLabel>
          まだログがありません。
          <br />
          ポップアップから「データを収集する」を有効にしてください
        </Items.NotFoundLabel>
      ) : null}

      <Items.ListBody className="kclp-list-body">
        {musics.map((music) => (
          <Items.ListItem key={music.video_id}>
            <Items.Thumbnail
              src={music.thumbnail}
              alt={`${music.video_id} thumbnail`}
            />

            <Items.ListItemContainer>
              <Items.PlayedDate>
                Played on {music.played_label}
              </Items.PlayedDate>

              <Items.MusicTitle>{music.song_title}</Items.MusicTitle>

              <Items.AuthorName>By {music.creator_name}</Items.AuthorName>

              <Items.ListFooter>
                <Items.HeartIcon>
                  {music.is_faved ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      width={16}
                      color="#ff33aa"
                    />
                  ) : (
                    <FontAwesomeIcon icon={RegHeart} width={16} />
                  )}
                  <Items.IconLabel>{music.fav_count}</Items.IconLabel>
                </Items.HeartIcon>

                <Items.LinkIcon>
                  <FontAwesomeIcon
                    style={{ cursor: "pointer" }}
                    icon={faLink}
                    width={16}
                    onClick={() => {
                      if (music.video_id) {
                        window.open(
                          "https://www.nicovideo.jp/watch/" + music.video_id,
                          "newtab",
                          "noopener"
                        );
                      } else {
                        window.alert("リンクがありません。");
                      }
                    }}
                  />
                </Items.LinkIcon>
              </Items.ListFooter>
            </Items.ListItemContainer>
          </Items.ListItem>
        ))}

        <Items.ListMarginBottom />
      </Items.ListBody>
    </Items.MusicListBody>
  );
};
