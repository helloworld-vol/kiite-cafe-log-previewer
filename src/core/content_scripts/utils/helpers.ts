/**
 * =======================================
 *    便利な関数をまとめたファイル
 * =======================================
 */

import { EventSupporter, SupportEvent } from "../../../schema/apis";

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
