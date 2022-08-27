import { config } from "dotenv";
import { login, User } from "./mod.ts";

await config({ export: true, allowEmptyValues: true });
await login(Deno.env.get("USERNAME")!, Deno.env.get("PASSWORD")!, false);

const dukhwa = new User({ id: await User.getUserIdByUsername("dukhwa") ?? "" });

console.log(await dukhwa.toJSON());
