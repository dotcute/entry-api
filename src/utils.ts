import { CookieJar } from "tough-cookie";
import { setHeader } from "header_utils";
import { dirname, fromFileUrl, join } from "path";

export const cookieJar = new CookieJar();

async function cookieFetch(
  input: string | Request | URL,
  init?: RequestInit | undefined,
): Promise<Response> {
  if (!input) return await fetch(input);

  const cookieStr = await cookieJar.getCookieString(input.toString());
  const altInit = init || {};
  if (!altInit.headers) altInit.headers = new Headers();

  setHeader(altInit.headers, "cookie", cookieStr);
  const res = await fetch(input, altInit);
  res.headers.forEach(function (value, key) {
    if (key.toLowerCase() === "set-cookie") {
      cookieJar.setCookie(value, input.toString());
    }
  });
  return res;
}

export async function getCSRFToken() {
  const body = await (await cookieFetch("https://playentry.org")).text();
  const token: string =
    (/<meta[^>]*?content=(["\'])?((?:.(?!\1|>))*.?)\1?/.exec(body) ?? [])[2] ??
      "";

  return token;
}

interface EntryApiRequestOptions {
  endpointUrl?: string;
}

interface GraphQLResponseSuccess<T> {
  success: true;
  status: number;
  data: T;
}

interface GraphQLResponseError {
  success: false;
  status: number;
}

type GraphQLResponse<T> = GraphQLResponseSuccess<T> | GraphQLResponseError;

export async function gql<T>(
  query: string,
  variables: Record<string, string | number | boolean>,
  options: EntryApiRequestOptions = {},
): Promise<GraphQLResponse<T>> {
  const csrfToken = await getCSRFToken();
  const res = await cookieFetch(
    options.endpointUrl ?? "https://playentry.org/graphql",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "CSRF-Token": csrfToken },
      body: JSON.stringify({ query, variables }),
    },
  );
  const data = await res.json();

  if (Object.keys(data).includes("errors")) {
    if (data.errors.length > 0 && data.errors[0] && data.errors[0].statusCode) {
      return { success: false, status: data.errors[0].statusCode };
    } else return { success: false, status: res.status };
  } else {
    return {
      success: true,
      status: res.status,
      data: Object.values(data.data)[0] as T,
    };
  }
}

export async function loadQuery(queryPath: string) {
  return await Deno.readTextFile(
    join(dirname(fromFileUrl(import.meta.url)), "queries", queryPath + ".gql"),
  );
}
