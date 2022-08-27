import { getLogon, setLogon } from "../mod.ts";
import { gql, loadQuery } from "./utils.ts";

export async function login(
  username: string,
  password: string,
  remember?: boolean,
  captcha?: { value: string; key: string; type: string },
) {
  if (getLogon()) return;

  const res = await gql<UserTypes.User>(
    await loadQuery("user/signinByUsername"),
    !captcha ? { username, password, rememberme: remember ?? false } : {
      username,
      password,
      rememberme: remember ?? false,
      captchaValue: captcha.value,
      captchaKey: captcha.key,
      captchaType: captcha.type,
    },
  );
  if (!res.success) return;

  setLogon(true);

  return;
}
