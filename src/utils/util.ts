/**
 * =======================================
 *    便利な関数をまとめたファイル
 * =======================================
 */

import { EventSupporter, SupportEvent } from "../types";

/**
 * CSVのデータ型
 */
interface CSVData {
  labels: string[];
  items: string[][];
}

/**
 * 渡されたデータからCSVファイルを作成する
 */
export const createCSVFile = (data: CSVData): File => {
  const csvData = [data.labels, ...data.items]
    .map((arr) =>
      arr
        .map((str) => '"' + (str ? str.replace(/"/g, '""') : "") + '"')
        .join(",")
    )
    .join("\n");

  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([bom, csvData], { type: "text/csv" });

  return new File([blob], "kiite-cafe-play-musics.csv");
};

/**
 * 表示する日付の文字列を返す
 */
export const formatDate = (date: Date | string): string => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hour = date.getHours() + "";
  let minutes = date.getMinutes() + "";
  let seconds = date.getSeconds() + "";

  if (hour.length === 1) hour = "0" + hour;
  if (minutes.length === 1) minutes = "0" + minutes;
  if (seconds.length === 1) seconds = "0" + seconds;

  if (!year || !month || !day || !hour || !minutes) {
    return formatDate(new Date());
  }

  return `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`;
};

/**
 * 実行した時の時間を返す
 */
export const getNow = (): { format: string; unix: number } => {
  const now = new Date();

  return {
    format: formatDate(now),
    unix: now.getTime(),
  };
};

/**
 * 簡易的なSupporterを作成する
 */
export const createSupporter = (
  event: SupportEvent | "*",
  cb: () => Promise<boolean>
): EventSupporter => ({
  try: async (type): Promise<boolean> => {
    if (type === event || event === "*") {
      return cb().catch((error) => {
        console.error(error);
        return false;
      });
    }

    return false;
  },
});
