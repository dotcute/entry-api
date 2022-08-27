import { getLogon } from "../../mod.ts";
import { gql, loadQuery } from "../utils.ts";

class EntryService {
  public static async getUserIdByUsername(username: string) {
    console.log(getLogon());

    const res = await gql<UserTypes.UserInfo>(
      await loadQuery("./src/queries/user/getUserIdByUsername.gql"),
      { username },
    );
    if (!res.success) return;

    console.log(res);
  }
}

export default EntryService;
