import * as z from "zod";

/**
 * 再生された曲のデータ型
 */
export const MusicHistorySchema = z.object({
  played_label: z.string(),
  played_at: z.number(),
  creator_id: z.number(),
  creator_link: z.string(),
  creator_name: z.string(),
  creator_unique: z.string(),
  fav_count: z.number(),
  is_faved: z.boolean(),
  song_id: z.number(),
  song_link: z.string(),
  song_title: z.string(),
  song_unique: z.string(),
  thumbnail: z.string(),
  video_id: z.string(),
});

export type MusicHistory = z.infer<typeof MusicHistorySchema>;
